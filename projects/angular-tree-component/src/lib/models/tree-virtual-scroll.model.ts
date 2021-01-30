import { Injectable } from '@angular/core';
import { observable, computed, action, autorun, reaction, IReactionDisposer } from 'mobx';
import { TreeModel } from './tree.model';
import { TREE_EVENTS } from '../constants/events';
import { ITreeEvent } from '../defs/api';
import { TreeNode } from './tree-node.model';

const Y_OFFSET = 500; // Extra pixels outside the viewport, in each direction, to render nodes in
const Y_EPSILON = 150; // Minimum pixel change required to recalculate the rendered nodes

@Injectable()
export class TreeVirtualScroll {
  private _dispose: IReactionDisposer[];

  @observable yBlocks = 0;
  @observable x = 0;
  @observable viewportHeight: number = null;
  viewport = null;

  @computed get y(): number {
    return this.yBlocks * Y_EPSILON;
  }

  @computed get totalHeight(): number {
    return this.treeModel.virtualRoot ? this.treeModel.virtualRoot.height : 0;
  }

  constructor(private treeModel: TreeModel) {
    treeModel.virtualScroll = this;
    this._dispose = [autorun(() => this.fixScroll())];
  }

  fireEvent(event: ITreeEvent): void {
    this.treeModel.fireEvent(event);
  }

  init(): void {
    const fn = this.recalcPositions.bind(this);

    fn();
    this._dispose = [
      ...this._dispose,
      reaction(() => this.treeModel.roots, fn),
      reaction(() => this.treeModel.expandedNodeIds, fn),
      reaction(() => this.treeModel.hiddenNodeIds, fn)
    ];
    this.treeModel.subscribe(TREE_EVENTS.loadNodeChildren, fn);
  }

  isEnabled(): boolean {
    return this.treeModel.options.useVirtualScroll;
  }

  @action private _setYBlocks(value: number): void {
    this.yBlocks = value;
  }

  @action recalcPositions(): void {
    this.treeModel.virtualRoot.height = this._getPositionAfter(this.treeModel.getVisibleRoots(), 0);
  }

  private _getPositionAfter(nodes: TreeNode[], startPos: number): number {
    let position: number = startPos;

    nodes.forEach((node: TreeNode) => {
      node.position = position;
      position = this._getPositionAfterNode(node, position);
    });
    return position;
  }

  private _getPositionAfterNode(node: TreeNode, startPos: number): number {
    let position: number = node.getSelfHeight() + startPos;

    if (node.children && node.isExpanded) { // TBD: consider loading component as well
      position = this._getPositionAfter(node.visibleChildren, position);
    }
    node.height = position - startPos;
    return position;
  }


  clear(): void {
    this._dispose.forEach((dispose: IReactionDisposer) => dispose());
  }

  @action setViewport(viewport: HTMLElement): void {
    Object.assign(this, {
      viewport,
      x: viewport.scrollLeft,
      yBlocks: Math.round(viewport.scrollTop / Y_EPSILON),
      viewportHeight: viewport.getBoundingClientRect ? viewport.getBoundingClientRect().height : 0
    });
  }

  @action scrollIntoView(node: TreeNode, force: boolean, scrollToMiddle = true): void {
    if (node.options.scrollContainer) {
      const scrollContainer: HTMLElement = node.options.scrollContainer;
      const scrollContainerHeight: number = scrollContainer.getBoundingClientRect().height;
      const scrollContainerTop: number = scrollContainer.getBoundingClientRect().top;
      const nodeTop: number = this.viewport.getBoundingClientRect().top + node.position - scrollContainerTop;

      if (force || // force scroll to node
        nodeTop < scrollContainer.scrollTop || // node is above scroll container
        nodeTop + node.getSelfHeight() > scrollContainer.scrollTop + scrollContainerHeight) { // node is below container
        scrollContainer.scrollTop = scrollToMiddle ?
          nodeTop - scrollContainerHeight / 2 : // scroll to middle
          nodeTop; // scroll to start
      }
    } else {
      if (force || // force scroll to node
        node.position < this.y || // node is above viewport
        node.position + node.getSelfHeight() > this.y + this.viewportHeight) { // node is below viewport
        if (this.viewport) {
          this.viewport.scrollTop = scrollToMiddle ?
            node.position - this.viewportHeight / 2 : // scroll to middle
            node.position; // scroll to start

          this._setYBlocks(Math.floor(this.viewport.scrollTop / Y_EPSILON));
        }
      }
    }
  }

  getViewportNodes(nodes: TreeNode[]): TreeNode[] {
    if (!nodes) return [];

    const visibleNodes: TreeNode[] = nodes.filter((node) => !node.isHidden);

    if (!this.isEnabled()) return visibleNodes;

    if (!this.viewportHeight || !visibleNodes.length) return [];

    // When loading children async this method is called before their height and position is calculated.
    // In that case firstIndex === 0 and lastIndex === visibleNodes.length - 1 (e.g. 1000),
    // which means that it loops through every visibleNodes item and push them into viewportNodes array.
    // We can prevent nodes from being pushed to the array and wait for the appropriate calculations to take place
    const lastVisibleNode: TreeNode = visibleNodes.slice(-1)[0]
    if (!lastVisibleNode.height && lastVisibleNode.position === 0) return [];

    // Search for first node in the viewport using binary search
    // Look for first node that starts after the beginning of the viewport (with buffer)
    // Or that ends after the beginning of the viewport
    const firstIndex: number = binarySearch(visibleNodes, (node: TreeNode) => {
      return (node.position + Y_OFFSET > this.y) ||
        (node.position + node.height > this.y);
    });

    // Search for last node in the viewport using binary search
    // Look for first node that starts after the end of the viewport (with buffer)
    const lastIndex: number = binarySearch(visibleNodes, (node: TreeNode) => {
      return node.position - Y_OFFSET > this.y + this.viewportHeight;
    }, firstIndex);

    const viewportNodes: TreeNode[] = [];

    for (let i: number = firstIndex; i <= lastIndex; i++) {
      viewportNodes.push(visibleNodes[i]);
    }

    return viewportNodes;
  }

  fixScroll(): void {
    const maxY: number = Math.max(0, this.totalHeight - this.viewportHeight);

    if (this.y < 0) this._setYBlocks(0);
    if (this.y > maxY) this._setYBlocks(maxY / Y_EPSILON);
  }
}

function binarySearch(nodes: TreeNode[], condition: (node: TreeNode) => boolean, firstIndex = 0): number {
  let index: number = firstIndex;
  let toIndex: number = nodes.length - 1;

  while (index !== toIndex) {
    let midIndex: number = Math.floor((index + toIndex) / 2);

    if (condition(nodes[midIndex])) {
      toIndex = midIndex;
    }
    else {
      if (index === midIndex) index = toIndex;
      else index = midIndex;
    }
  }
  return index;
}

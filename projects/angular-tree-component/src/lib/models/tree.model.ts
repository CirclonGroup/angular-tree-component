import { Injectable, OnDestroy } from '@angular/core';
import { observable, computed, action, autorun } from 'mobx';
import { Subscription } from 'rxjs';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';
import { TreeVirtualScroll } from './tree-virtual-scroll.model';
import { ITreeModel, IDType, IDTypeDictionary, ITreeEvent, ITreeNode, ITreeState, DragToSpot } from '../defs/api';
import { TREE_EVENTS } from '../constants/events';

import { first, last, compact, find, isString, isFunction } from 'lodash-es';

@Injectable()
export class TreeModel implements ITreeModel, OnDestroy {
  static focusedTree: TreeModel = null;

  options: TreeOptions = new TreeOptions();
  nodes: TreeNode[];
  eventNames: string[] = Object.keys(TREE_EVENTS);
  virtualScroll: TreeVirtualScroll;

  @observable roots: TreeNode[];
  @observable expandedNodeIds: IDTypeDictionary = {};
  @observable selectedLeafNodeIds: IDTypeDictionary = {};
  @observable activeNodeIds: IDTypeDictionary = {};
  @observable hiddenNodeIds: IDTypeDictionary = {};
  @observable focusedNodeId: IDType = null;
  @observable virtualRoot: TreeNode;

  private firstUpdate = true;
  private events: any;
  private subscriptions: Subscription[] = [];

  // events
  fireEvent(event: ITreeEvent): void {
    event.treeModel = this;
    this.events[event.eventName].emit(event);
    this.events.event.emit(event);
  }

  subscribe(eventName: string, fn) {
    const subscription = this.events[eventName].subscribe(fn);
    this.subscriptions.push(subscription);
  }


  // getters
  getFocusedNode(): TreeNode {
    return this.focusedNode;
  }


  getActiveNode(): TreeNode {
    return this.activeNodes[0];
  }

  getActiveNodes(): TreeNode[] {
    return this.activeNodes;
  }

  getVisibleRoots(): TreeNode[] {
    return this.virtualRoot.visibleChildren;
  }

  getFirstRoot(skipHidden = false): TreeNode {
    return first(skipHidden ? this.getVisibleRoots() : this.roots);
  }

  getLastRoot(skipHidden = false): TreeNode {
    return last(skipHidden ? this.getVisibleRoots() : this.roots);
  }

  get isFocused(): boolean {
    return TreeModel.focusedTree === this;
  }

  isNodeFocused(node: TreeNode): boolean {
    return this.focusedNode === node;
  }

  isEmptyTree(): boolean {
    return this.roots && this.roots.length === 0;
  }

  @computed get focusedNode(): TreeNode {
    return this.focusedNodeId ? this.getNodeById(this.focusedNodeId) : null;
  }

  @computed get expandedNodes(): TreeNode[] {
    const nodes: TreeNode[] = Object.keys(this.expandedNodeIds)
      .filter((id: IDType) => this.expandedNodeIds[id])
      .map((id: IDType) => this.getNodeById(id));

    return compact(nodes);
  }

  @computed get activeNodes(): TreeNode[] {
    const nodes: TreeNode[] = Object.keys(this.activeNodeIds)
      .filter((id: IDType) => this.activeNodeIds[id])
      .map((id: IDType) => this.getNodeById(id));

    return compact(nodes);
  }

  @computed get hiddenNodes(): TreeNode[] {
    const nodes: TreeNode[] = Object.keys(this.hiddenNodeIds)
      .filter((id: IDType) => this.hiddenNodeIds[id])
      .map((id: IDType) => this.getNodeById(id));

    return compact(nodes);
  }

  @computed get selectedLeafNodes(): TreeNode[] {
    const nodes: TreeNode[] = Object.keys(this.selectedLeafNodeIds)
      .filter((id: IDType) => this.selectedLeafNodeIds[id])
      .map((id: IDType) => this.getNodeById(id));

    return compact(nodes);
  }

  // locating nodes
  getNodeByPath(path: IDType[], startNode: TreeNode = null): TreeNode {
    if (!path) return null;

    startNode = startNode || this.virtualRoot;
    if (path.length === 0) return startNode;

    if (!startNode.children) return null;

    const childId: IDType = path.shift();
    const childNode: TreeNode = find(startNode.children, { id: childId });

    if (!childNode) return null;

    return this.getNodeByPath(path, childNode);
  }

  getNodeById(id: IDType): TreeNode {
    const idStr: string = id.toString();

    return this.getNodeBy((node: TreeNode) => node.id.toString() === idStr);
  }

  getNodeBy(predicate: (node: TreeNode) => boolean, startNode: TreeNode = null): TreeNode {
    startNode = startNode || this.virtualRoot;

    if (!startNode.children) return null;

    const found: TreeNode = find(startNode.children, predicate);

    if (found) { // found in children
      return found;
    } else { // look in children's children
      for (let child of startNode.children) {
        const foundInChildren: TreeNode = this.getNodeBy(predicate, child);
        if (foundInChildren) return foundInChildren;
      }
    }
  }

  isExpanded(node: TreeNode): boolean {
    return this.expandedNodeIds[node.id];
  }

  isHidden(node: TreeNode): boolean {
    return this.hiddenNodeIds[node.id];
  }

  isActive(node: TreeNode): boolean {
    return this.activeNodeIds[node.id];
  }

  isSelected(node: TreeNode): boolean {
    return this.selectedLeafNodeIds[node.id];
  }

  ngOnDestroy(): void {
    this.dispose();
    this.unsubscribeAll();
  }

  dispose(): void {
    // Dispose reactions of the replaced nodes
    if (this.virtualRoot) {
      this.virtualRoot.dispose();
    }
  }

  unsubscribeAll(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  // actions
  @action setData({ nodes, options = null, events = null }: { nodes: TreeNode[], options: TreeOptions, events: any }): void {
    if (options) {
      this.options = new TreeOptions(options);
    }
    if (events) {
      this.events = events;
    }
    if (nodes) {
      this.nodes = nodes;
    }

    this.update();
  }

  @action update(): void {
    // Rebuild tree:
    let virtualRootConfig = {
      id: this.options.rootId,
      virtual: true,
      [this.options.childrenField]: this.nodes
    };

    this.dispose();

    this.virtualRoot = new TreeNode(virtualRootConfig, null, this, 0);

    this.roots = this.virtualRoot.children;

    // Fire event:
    if (this.firstUpdate) {
      if (this.roots) {
        this.firstUpdate = false;
        this._calculateExpandedNodes();
      }
    } else {
      this.fireEvent({ eventName: TREE_EVENTS.updateData });
    }
  }


  @action setFocusedNode(node: TreeNode): void {
    this.focusedNodeId = node ? node.id : null;
  }

  @action setFocus(value: boolean): void {
    TreeModel.focusedTree = value ? this : null;
  }

  @action doForAll(fn: (node: TreeNode) => any): void {
    this.roots.forEach((root) => root.doForAll(fn));
  }

  @action focusNextNode(): void {
    const previousNode: TreeNode = this.getFocusedNode();
    const nextNode: TreeNode = previousNode ? previousNode.findNextNode(true, true) : this.getFirstRoot(true);
    if (nextNode) nextNode.focus();
  }

  @action focusPreviousNode(): void {
    const previousNode: TreeNode = this.getFocusedNode();
    const nextNode: TreeNode = previousNode ? previousNode.findPreviousNode(true) : this.getLastRoot(true);
    if (nextNode) nextNode.focus();
  }

  @action focusDrillDown(): void {
    const previousNode: TreeNode = this.getFocusedNode();
    if (previousNode && previousNode.isCollapsed && previousNode.hasChildren) {
      previousNode.toggleExpanded();
    }
    else {
      const nextNode: TreeNode = previousNode ? previousNode.getFirstChild(true) : this.getFirstRoot(true);
      if (nextNode) nextNode.focus();
    }
  }

  @action focusDrillUp(): void {
    const previousNode: TreeNode = this.getFocusedNode();
    if (!previousNode) return;
    if (previousNode.isExpanded) {
      previousNode.toggleExpanded();
    }
    else {
      const nextNode: TreeNode = previousNode.realParent;
      if (nextNode) nextNode.focus();
    }
  }

  @action setActiveNode(node: TreeNode, value: boolean, multi = false): void {
    if (multi) {
      this._setActiveNodeMulti(node, value);
    }
    else {
      this._setActiveNodeSingle(node, value);
    }

    if (value) {
      node.focus(this.options.scrollOnActivate);
      this.fireEvent({ eventName: TREE_EVENTS.activate, node });
      this.fireEvent({ eventName: TREE_EVENTS.nodeActivate, node }); // For IE11
    } else {
      this.fireEvent({ eventName: TREE_EVENTS.deactivate, node });
      this.fireEvent({ eventName: TREE_EVENTS.nodeDeactivate, node }); // For IE11
    }
  }

  @action setSelectedNode(node: TreeNode, value: boolean): void {
    this.selectedLeafNodeIds = Object.assign({}, this.selectedLeafNodeIds, { [node.id]: value });

    if (value) {
      node.focus();
      this.fireEvent({ eventName: TREE_EVENTS.select, node });
    } else {
      this.fireEvent({ eventName: TREE_EVENTS.deselect, node });
    }
  }

  @action setExpandedNode(node: TreeNode, value: boolean): void {
    this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, { [node.id]: value });
    this.fireEvent({ eventName: TREE_EVENTS.toggleExpanded, node, isExpanded: value });
  }

  @action expandAll(): void {
    this.roots.forEach((root: TreeNode) => root.expandAll());
  }

  @action collapseAll(): void {
    this.roots.forEach((root: TreeNode) => root.collapseAll());
  }

  @action setIsHidden(node: TreeNode, value: boolean): void {
    this.hiddenNodeIds = Object.assign({}, this.hiddenNodeIds, { [node.id]: value });
  }

  @action setHiddenNodeIds(nodeIds: string[]): void {
    this.hiddenNodeIds = nodeIds.reduce((hiddenNodeIds: IDTypeDictionary, id: string) => Object.assign(hiddenNodeIds, {
      [id]: true
    }), {});
  }

  performKeyAction(node: TreeNode, $event: KeyboardEvent): boolean {
    // tslint:disable-next-line:deprecation
    const keyAction = this.options.actionMapping.keys[$event.keyCode];
    if (keyAction) {
      $event.preventDefault();
      keyAction(this, node, $event);
      return true;
    } else {
      return false;
    }
  }

  @action filterNodes(filter: string | ((node: TreeNode) => boolean), autoShow = true): void {
    let filterFn: (node: TreeNode) => boolean;

    if (!filter) {
      return this.clearFilter();
    }

    // support function and string filter
    if (isString(filter)) {
      filterFn = (node) => node.displayField.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    }
    else if (isFunction(filter)) {
      filterFn = filter;
    }
    else {
      console.error('Don\'t know what to do with filter', filter);
      console.error('Should be either a string or function');
      return;
    }

    const ids: IDTypeDictionary = {};
    this.roots.forEach((node: TreeNode) => this._filterNode(ids, node, filterFn, autoShow));
    this.hiddenNodeIds = ids;
    this.fireEvent({ eventName: TREE_EVENTS.changeFilter });
  }

  @action clearFilter(): void {
    this.hiddenNodeIds = {};
    this.fireEvent({ eventName: TREE_EVENTS.changeFilter });
  }

  @action moveNode(node: TreeNode, to: DragToSpot): void {
    const fromIndex: number = node.getIndexInParent();
    const fromParent: TreeNode = node.parent;

    if (!this.canMoveNode(node, to, fromIndex)) return;

    const fromChildren: TreeNode[] = fromParent.getField('children');

    // If node doesn't have children - create children array
    if (!to.parent.getField('children')) {
      to.parent.setField('children', []);
    }
    const toChildren: TreeNode[] = to.parent.getField('children');

    const originalNode: TreeNode = fromChildren.splice(fromIndex, 1)[0];

    // Compensate for index if already removed from parent:
    const toIndex: number = (fromParent === to.parent && to.index > fromIndex) ? to.index - 1 : to.index;

    toChildren.splice(toIndex, 0, originalNode);

    fromParent.treeModel.update();
    if (to.parent.treeModel !== fromParent.treeModel) {
      to.parent.treeModel.update();
    }

    this.fireEvent({
      eventName: TREE_EVENTS.moveNode,
      node: originalNode,
      to: { parent: to.parent.data, index: toIndex },
      from: { parent: fromParent.data, index: fromIndex }
    });
  }

  @action copyNode(node: TreeNode, to: DragToSpot): void {
    const fromIndex: number = node.getIndexInParent();

    if (!this.canMoveNode(node, to, fromIndex)) return;

    // If node doesn't have children - create children array
    if (!to.parent.getField('children')) {
      to.parent.setField('children', []);
    }
    const toChildren: ITreeNode[] = to.parent.getField('children');

    const nodeCopy: TreeNode = this.options.getNodeClone(node);

    toChildren.splice(to.index, 0, nodeCopy);

    node.treeModel.update();
    if (to.parent.treeModel !== node.treeModel) {
      to.parent.treeModel.update();
    }

    this.fireEvent({ eventName: TREE_EVENTS.copyNode, node: nodeCopy, to: { parent: to.parent.data, index: to.index } });
  }

  getState(): ITreeState {
    return {
      expandedNodeIds: this.expandedNodeIds,
      selectedLeafNodeIds: this.selectedLeafNodeIds,
      activeNodeIds: this.activeNodeIds,
      hiddenNodeIds: this.hiddenNodeIds,
      focusedNodeId: this.focusedNodeId
    };
  }

  @action setState(state: ITreeState): void {
    if (!state) return;

    Object.assign(this, {
      expandedNodeIds: state.expandedNodeIds || {},
      selectedLeafNodeIds: state.selectedLeafNodeIds || {},
      activeNodeIds: state.activeNodeIds || {},
      hiddenNodeIds: state.hiddenNodeIds || {},
      focusedNodeId: state.focusedNodeId
    });
  }

  subscribeToState<R>(fn: (state: ITreeState) => R): void {
    autorun(() => fn(this.getState()));
  }

  canMoveNode(node: TreeNode, to: DragToSpot, fromIndex: number = undefined): boolean {
    const fromNodeIndex: number = fromIndex || node.getIndexInParent();

    // same node:
    if (node.parent === to.parent && fromIndex === to.index) {
      return false;
    }

    return !to.parent.isDescendantOf(node);
  }

  calculateExpandedNodes(): void {
    this._calculateExpandedNodes();
  }

  // private methods
  private _filterNode(ids: IDTypeDictionary, node: TreeNode, filterFn: (node: TreeNode) => boolean, autoShow: boolean): boolean {
    // if node passes function then it's visible
    let isVisible: boolean = filterFn(node);

    if (node.children) {
      // if one of node's children passes filter then this node is also visible
      node.children.forEach((child: TreeNode) => {
        if (this._filterNode(ids, child, filterFn, autoShow)) {
          isVisible = true;
        }
      });
    }

    // mark node as hidden
    if (!isVisible) {
      ids[node.id] = true;
    }
    // auto expand parents to make sure the filtered nodes are visible
    if (autoShow && isVisible) {
      node.ensureVisible();
    }
    return isVisible;
  }

  private _calculateExpandedNodes(startNode = null): void {
    startNode = startNode || this.virtualRoot;

    if (startNode.data[this.options.isExpandedField]) {
      this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, { [startNode.id]: true });
    }
    if (startNode.children) {
      startNode.children.forEach((child: TreeNode) => this._calculateExpandedNodes(child));
    }
  }

  private _setActiveNodeSingle(node: TreeNode, value: boolean): void {
    // Deactivate all other nodes:
    this.activeNodes
      .filter((activeNode: TreeNode) => activeNode !== node)
      .forEach((activeNode: TreeNode) => {
        this.fireEvent({ eventName: TREE_EVENTS.deactivate, node: activeNode });
        this.fireEvent({ eventName: TREE_EVENTS.nodeDeactivate, node: activeNode }); // For IE11
      });

    if (value) {
      this.activeNodeIds = { [node.id]: true };
    }
    else {
      this.activeNodeIds = {};
    }
  }

  private _setActiveNodeMulti(node: TreeNode, value: boolean): void {
    this.activeNodeIds = Object.assign({}, this.activeNodeIds, { [node.id]: value });
  }
}

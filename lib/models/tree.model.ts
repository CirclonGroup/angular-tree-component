import { Injectable, Component, Input, EventEmitter, TemplateRef, Renderer } from '@angular/core';
import { observable, computed, action } from 'mobx';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';
import { TreeVirtualScroll } from './tree-virtual-scroll.model';
import { ITreeModel } from '../defs/api';
import { TREE_EVENTS } from '../constants/events';

import { first, last, compact, find, includes, remove, indexOf, pullAt, isString, isFunction } from 'lodash';

@Injectable()
export class TreeModel implements ITreeModel {
  static focusedTree = null;

  options: TreeOptions = new TreeOptions();
  nodes: any[];
  @observable roots: TreeNode[];
  @observable expandedNodeIds: { [id: string]: boolean } = {};
  @observable activeNodeIds: { [id: string]: boolean } = {};
  @observable hiddenNodeIds: { [id: string]: boolean } = {};
  @observable focusedNodeId: string = null;
  @observable virtualRoot: TreeNode;
  firstUpdate = true;
  public virtualScroll: TreeVirtualScroll;

  eventNames = Object.keys(TREE_EVENTS);

  private _treeNodeContentComponent: any;
  private _loadingComponent: any;
  private events: any;

  constructor(public renderer: Renderer) {
  }

  @action setData({ nodes, options = null, events = null }: {nodes: any, options: any, events: any}) {
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

  @action update() {
    // Rebuild tree:
    let virtualRootConfig = {
      virtual: true,
      [this.options.childrenField]: this.nodes
    };

    this.virtualRoot = new TreeNode(virtualRootConfig, null, this, 0);

    this.roots = this.virtualRoot.children;

    // Fire event:
    if (this.firstUpdate) {
      if (this.roots) {
        this.fireEvent({ eventName: TREE_EVENTS.onInitialized });
        this.firstUpdate = false;
        this._calculateExpandedNodes();
      }
    } else {
      this.fireEvent({ eventName: TREE_EVENTS.onUpdateData });
    }
  }

  private _calculateExpandedNodes(startNode = null) {
    startNode = startNode || this.virtualRoot;

    if (startNode.data[this.options.isExpandedField]) {
      this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, {[startNode.id]: true});
    }
    if (startNode.children) {
      startNode.children.forEach((child) => this._calculateExpandedNodes(child));
    }
  }

  fireEvent(event) {
    event.treeModel = this;
    this.events[event.eventName].emit(event);
    this.events.onEvent.emit(event);
  }

  subscribe(eventName, fn) {
    this.events[eventName].subscribe(fn);
  }

  getFocusedNode(): TreeNode {
    return this.focusedNode;
  }

  @action setFocusedNode(node) {
    this.focusedNodeId = node ? node.id : null;
  }

  getActiveNode(): TreeNode {
    return this.activeNodes[0];
  }

  getActiveNodes(): TreeNode[] {
    return this.activeNodes;
  }

  getVisibleRoots() {
    return this.virtualRoot.visibleChildren;
  }

  getFirstRoot(skipHidden = false) {
    return first(skipHidden ? this.getVisibleRoots() : this.roots);
  }

  getLastRoot(skipHidden = false) {
    return last(skipHidden ? this.getVisibleRoots() : this.roots);
  }

  get isFocused() {
    return TreeModel.focusedTree === this;
  }

  isNodeFocused(node) {
    return this.focusedNode === node;
  }

  @action setFocus(value) {
    TreeModel.focusedTree = value ? this : null;
  }

  isEmptyTree(): boolean {
    return this.roots && this.roots.length === 0;
  }

  @computed get focusedNode() {
    return this.focusedNodeId ? this.getNodeById(this.focusedNodeId) : null;
  }

  @computed get expandedNodes() {
    const nodes = Object.keys(this.expandedNodeIds)
      .filter((id) => this.expandedNodeIds[id])
      .map((id) => this.getNodeById(id));

    return compact(nodes);
  }

  @computed get activeNodes() {
    const nodes = Object.keys(this.activeNodeIds)
      .filter((id) => this.activeNodeIds[id])
      .map((id) => this.getNodeById(id));

    return compact(nodes);
  }

  getNodeByPath(path: any[], startNode= null): TreeNode {
    if (!path) return null;

    startNode = startNode || this.virtualRoot;
    if (path.length === 0) return startNode;

    if (!startNode.children) return null;

    const childId = path.shift();
    const childNode = find(startNode.children, { id: childId });

    if (!childNode) return null;

    return this.getNodeByPath(path, childNode);
  }

  getNodeById(id) {
    const idStr = id.toString();

    return this.getNodeBy((node) => node.id.toString() === idStr);
  }

  getNodeBy(predicate, startNode = null) {
    startNode = startNode || this.virtualRoot;

    if (!startNode.children) return null;

    const found = find(startNode.children, predicate);

    if (found) { // found in children
      return found;
    } else { // look in children's children
      for (let child of startNode.children) {
        const foundInChildren = this.getNodeBy(predicate, child);
        if (foundInChildren) return foundInChildren;
      }
    }
  }

  @action doForAll(fn) {
    this.roots.forEach((root) => root.doForAll(fn));
  }

  @action focusNextNode() {
    let previousNode = this.getFocusedNode();
    let nextNode = previousNode ? previousNode.findNextNode(true, true) : this.getFirstRoot(true);
    if (nextNode) nextNode.focus();
  }

  @action focusPreviousNode() {
    let previousNode = this.getFocusedNode();
    let nextNode = previousNode ? previousNode.findPreviousNode(true) : this.getLastRoot(true);
    if (nextNode) nextNode.focus();
  }

  @action focusDrillDown() {
    let previousNode = this.getFocusedNode();
    if (previousNode && previousNode.isCollapsed && previousNode.hasChildren) {
      previousNode.toggleExpanded();
    }
    else {
      let nextNode = previousNode ? previousNode.getFirstChild(true) : this.getFirstRoot(true);
      if (nextNode) nextNode.focus();
    }
  }

  @action focusDrillUp() {
    let previousNode = this.getFocusedNode();
    if (!previousNode) return;
    if (previousNode.isExpanded) {
      previousNode.toggleExpanded();
    }
    else {
      let nextNode = previousNode.realParent;
      if (nextNode) nextNode.focus();
    }
  }

  isActive(node) {
    return this.activeNodeIds[node.id]?true:false;
  }

  @action setActiveNode(node, value, multi = false) {
    if (multi) {
      this._setActiveNodeMulti(node, value);
    }
    else {
      this._setActiveNodeSingle(node, value);
    }

    if (value) {
      node.focus();
      this.fireEvent({ eventName: TREE_EVENTS.onActivate, node });
    } else {
      this.fireEvent({ eventName: TREE_EVENTS.onDeactivate, node });
    }
  }

  _setActiveNodeSingle(node, value) {
    // Deactivate all other nodes:
    this.activeNodes
      .filter((activeNode) => activeNode !== node)
      .forEach((activeNode) => {
        this.fireEvent({ eventName: TREE_EVENTS.onDeactivate, node: activeNode });
      });

    if (value) {
      this.activeNodeIds = {[node.id]: true};
    }
    else {
      this.activeNodeIds = {};
    }
  }

  _setActiveNodeMulti(node, value) {
    this.activeNodeIds = Object.assign({}, this.activeNodeIds, {[node.id]: value});
  }

  isExpanded(node) {
    return this.expandedNodeIds[node.id];
  }

  @action setExpandedNode(node, value) {
    this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, {[node.id]: value});
    this.fireEvent({ eventName: TREE_EVENTS.onToggleExpanded, node, isExpanded: value });
  }

  @action expandAll() {
    this.roots.forEach((root) => root.expandAll());
  }

  @action collapseAll() {
    this.roots.forEach((root) => root.collapseAll());
  }

  isHidden(node) {
    return this.hiddenNodeIds[node.id];
  }

  @action setIsHidden(node, value) {
    this.hiddenNodeIds = Object.assign({}, this.hiddenNodeIds, {[node.id]: value});
  }

  performKeyAction(node, $event) {
    const action = this.options.actionMapping.keys[$event.keyCode];
    if (action) {
      $event.preventDefault();
      action(this, node, $event);
      return true;
    } else {
      return false;
    }
  }

  @action filterNodes(filter, autoShow = true) {
    let filterFn;

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

    const ids = {};
    this.roots.forEach((node) => this._filterNode(ids, node, filterFn, autoShow));
    this.hiddenNodeIds = ids;
    this.fireEvent({ eventName: TREE_EVENTS.onChangeFilter });
  }

  private _filterNode(ids, node, filterFn, autoShow) {
    // if node passes function then it's visible
    let isVisible = filterFn(node);

    if (node.children) {
      // if one of node's children passes filter then this node is also visible
      node.children.forEach((child) => {
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

  @action clearFilter() {
    this.hiddenNodeIds = {};
    this.fireEvent({ eventName: TREE_EVENTS.onChangeFilter });
  }

  private _canMoveNode(node, fromIndex, to) {
    // same node:
    if (node.parent === to.parent && fromIndex === to.index) {
      return false;
    }

    return !to.parent.isDescendantOf(node);
  }

  @action moveNode(node, to) {
    const fromIndex = node.getIndexInParent();
    const fromParent = node.parent;

    if (!this._canMoveNode(node, fromIndex , to)) return;

    const fromChildren = fromParent.getField('children');

    // If node doesn't have children - create children array
    if (!to.parent.getField('children')) {
      to.parent.setField('children', []);
    }
    const toChildren = to.parent.getField('children');

    const originalNode = fromChildren.splice(fromIndex, 1)[0];

    // Compensate for index if already removed from parent:
    let toIndex = (fromParent === to.parent && to.index > fromIndex) ? to.index - 1 : to.index;

    toChildren.splice(toIndex, 0, originalNode);

    fromParent.treeModel.update();
    if (to.parent.treeModel !== fromParent.treeModel) {
      to.parent.treeModel.update();
    }

    this.fireEvent({ eventName: TREE_EVENTS.onMoveNode, node: originalNode, to: { parent: to.parent.data, index: toIndex } });
  }
}

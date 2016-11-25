import { Injectable, Component, Input, EventEmitter, TemplateRef } from '@angular/core';
import { ITreeNodeTemplate } from '../components/tree-node-content.component';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';
import { ITreeModel } from '../defs/api';
import { TREE_EVENTS } from '../constants/events';

import { deprecated } from '../deprecated';

import * as _ from 'lodash';

@Injectable()
export class TreeModel implements ITreeModel {
  static _dragNode: { node: TreeNode, index: number } = null;

  roots: TreeNode[];
  options: TreeOptions = new TreeOptions();
  nodes: any[];
  expandedNodeIds: { [id:string]: boolean } = {};
  expandedNodes: TreeNode[];
  activeNodeIds: { [id:string]: boolean } = {};
  activeNodes: TreeNode[];
  _focusedNode: TreeNode = null;
  focusedNodeId: string = null;
  _dropLocation:{ component:any, node: TreeNode, index: number } = null;
  static focusedTree = null;
  private events: any;
  virtualRoot: TreeNode;
  firstUpdate = true;

  eventNames = Object.keys(TREE_EVENTS);

  setData({ nodes, options = null, events = null }:{nodes:any,options:any,events:any}) {
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

  update() {
    // Rebuild tree:
    let virtualRootConfig = {
      virtual: true,
      [this.options.childrenField]: this.nodes
    };

    this.virtualRoot = this.getTreeNode(virtualRootConfig, null);

    this.roots = this.virtualRoot.children;

    this._initTreeNodeContentComponent();
    this._initLoadingComponent();

    this._loadState();

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

  _calculateExpandedNodes(startNode = null) {
    startNode = startNode || this.virtualRoot;

    if (startNode.data[this.options.isExpandedField]) {
      this.expandedNodeIds[startNode.id] = true;
    }
    if (startNode.children) {
      startNode.children.forEach((child) => this._calculateExpandedNodes(child));
    }
  }

  fireEvent(event) {
    this.events[event.eventName].emit(event);
    this.events.onEvent.emit(event);
  }

  get focusedNode() { deprecated('focusedNode attribute', 'getFocusedNode'); return this.getFocusedNode(); }
  set focusedNode(value) { deprecated('focusedNode = ', 'setFocusedNode'); this.setFocusedNode(value) };

  getFocusedNode():TreeNode {
    return this._focusedNode;
  }

  setFocusedNode(node) {
    this._focusedNode = node;
    this.focusedNodeId = node ? node.id : null;
  }

  getActiveNode():TreeNode {
    return this.activeNodes[0];
  }

  getActiveNodes():TreeNode[] {
    return this.activeNodes;
  }

  getTreeNode(node:any, parent:TreeNode):TreeNode {
    return new TreeNode(node, parent, this);
  }

  getVisibleRoots() {
    return this.virtualRoot.getVisibleChildren();
  }

  getFirstRoot(skipHidden = false) {
    return _.first(skipHidden ? this.getVisibleRoots() : this.roots);
  }

  getLastRoot(skipHidden = false) {
    return _.last(skipHidden ? this.getVisibleRoots() : this.roots);
  }

  get isFocused() {
    return TreeModel.focusedTree === this;
  }

  isNodeFocused(node) {
    return this._focusedNode === node;
  }

  setFocus(value) {
    TreeModel.focusedTree = value ? this : null;
  }


  private _treeNodeContentComponent:any;
  get treeNodeContentComponent() { return this._treeNodeContentComponent };

  private _loadingComponent:any;
  get loadingComponent() { return this._loadingComponent };

  // if treeNodeTemplate is a component - use it,
  // otherwise - it's a template, so wrap it with an AdHoc component
  _initTreeNodeContentComponent() {
    this._treeNodeContentComponent = this.options.treeNodeTemplate;
    if (typeof this._treeNodeContentComponent === 'string') {
      this._treeNodeContentComponent = this._createAdHocComponent(this._treeNodeContentComponent);
    }
  }

  // same for loading component
  _initLoadingComponent() {
    this._loadingComponent = this.options.loadingComponent;
    if (typeof this._loadingComponent === 'string') {
      this._loadingComponent = this._createAdHocComponent(this._loadingComponent);
    }
  }

  _loadState() {
    if (this.focusedNodeId) {
      this._focusedNode = this.getNodeById(this.focusedNodeId);
    }

    this.expandedNodes = Object.keys(this.expandedNodeIds)
      .filter((id) => this.expandedNodeIds[id])
      .map((id) => this.getNodeById(id))
    this.expandedNodes = _.compact(this.expandedNodes);

    this.activeNodes = Object.keys(this.activeNodeIds)
      .filter((id) => this.expandedNodeIds[id])
      .map((id) => this.getNodeById(id))
    this.activeNodes = _.compact(this.activeNodes);
  }

  getNodeByPath(path, startNode=null):TreeNode {
    if (!path) return null;

    startNode = startNode || this.virtualRoot;
    if (path.length === 0) return startNode;

    if (!startNode.children) return null;

    const childId = path.shift();
    const childNode = _.find(startNode.children, { [this.options.idField]: childId });

    if (!childNode) return null;

    return this.getNodeByPath(path, childNode)
  }

  getNodeById(id) {
    return this.getNodeBy({ id });
  }

  getNodeBy(predicate, startNode = null) {
    startNode = startNode || this.virtualRoot;

    if (!startNode.children) return null;

    const found = _.find(startNode.children, predicate);

    if (found) { // found in children
      return found;
    } else { // look in children's children
      for (let child of startNode.children) {
        const found = this.getNodeBy(predicate, child);
        if (found) return found;
      }
    }
  }

  _createAdHocComponent(templateStr): any {
    @Component({
        selector: 'TreeNodeTemplate',
        template: templateStr
    })
    class AdHocTreeNodeTemplateComponent {
        @Input() node: TreeNode;
    }
    return AdHocTreeNodeTemplateComponent;
  }

  focusNextNode() {
    let previousNode = this.getFocusedNode();
    let nextNode = previousNode ? previousNode.findNextNode(true, true) : this.getFirstRoot(true);
    nextNode && nextNode.focus();
  }

  focusPreviousNode() {
    let previousNode = this.getFocusedNode();
    let nextNode = previousNode ? previousNode.findPreviousNode(true) : this.getLastRoot(true);
    nextNode && nextNode.focus();
  }

  focusDrillDown() {
    let previousNode = this.getFocusedNode();
    if (previousNode && previousNode.isCollapsed && previousNode.hasChildren) {
      previousNode.toggleExpanded();
    }
    else {
      let nextNode = previousNode ? previousNode.getFirstChild(true) : this.getFirstRoot(true);
      nextNode && nextNode.focus();
    }
  }

  focusDrillUp() {
    let previousNode = this.getFocusedNode();
    if (!previousNode) return;
    if (previousNode.isExpanded) {
      previousNode.toggleExpanded();
    }
    else {
      let nextNode = previousNode.realParent;
      nextNode && nextNode.focus();
    }
  }

  isActive(node) {
    return this.activeNodeIds[node.id];
  }

  setActiveNode(node, value, multi = false) {
    if (value) {
      node.focus();
      this.fireEvent({ eventName: TREE_EVENTS.onActivate, node });
    } else {
      this.fireEvent({ eventName: TREE_EVENTS.onDeactivate, node });
    }

    if (multi) {
      this._setActiveNodeMulti(node, value);
    }
    else {
      this._setActiveNodeSingle(node, value);
    }
  }

  _setActiveNodeSingle(node, value) {
    // Deactivate all other nodes:
    this.activeNodes
      .filter((activeNode) => activeNode != node)
      .forEach((activeNode) => {
        this.fireEvent({ eventName: TREE_EVENTS.onDeactivate, node: activeNode });
      });

    this.activeNodeIds = {};
    this.activeNodes = [];
    if (value) {
      this.activeNodes.push(node);
      this.activeNodeIds[node.id] = true;
    }
  }

  _setActiveNodeMulti(node, value) {
    this.activeNodeIds[node.id] = value;
    if (value) {
      if (!_.includes(this.activeNodes, node)) {
        this.activeNodes.push(node);
      }
    } else {
      if (_.includes(this.activeNodes, node)) {
        _.remove(this.activeNodes, node);
      }
    }
  }

  isExpanded(node) {
    return this.expandedNodeIds[node.id];
  }

  setExpandedNode(node, value) {
    const index = _.indexOf(this.expandedNodes, node);

    if (value && !index) this.expandedNodes.push(node);
    else if (index) _.pullAt(this.expandedNodes, index);

    this.expandedNodeIds[node.id] = value;
  }

  performKeyAction(node, $event) {
    const action = this.options.actionMapping.keys[$event.keyCode]
    if (action) {
      $event.preventDefault();
      action(this, node, $event);
      return true;
    } else {
      return false;
    }
  }

  filterNodes(filter, autoShow = false) {
    let filterFn;

    if (!filter) {
      return this.clearFilter();
    }

    if (_.isString(filter)) {
      filterFn = (node) => node.displayField.toLowerCase().indexOf(filter.toLowerCase()) != -1
    }
    else if (_.isFunction(filter)) {
       filterFn = filter;
    }
    else {
      console.error('Don\'t know what to do with filter', filter);
      console.error('Should be either a string or function', filter);
    }
    this.roots.forEach((node) => node.filter(filterFn, autoShow));
  }

  clearFilter() {
    this.roots.forEach((node) => node.clearFilter());
  }

  canMoveNode({ from, to }) {
    // Check that drop is allowed on this tree
    if (to.node.treeModel.options.options.allowDrop == false)
      return false;
    // same node:
    if (from.node === to.node && from.index === to.index) {
      return false;
    }

    const fromChildren = from.node.children;
    const fromNode = fromChildren[from.index];

    return !to.node.isDescendantOf(fromNode);
  }

  moveNode({ from, to }) {
    if (!this.canMoveNode({from, to})) return;

    const fromChildren = from.node.getField('children');

    // If node doesn't have children - create children array
    if (!to.node.getField('children')) {
      to.node.setField('children', []);
    }

    let node = null;

    // If the source & dest are the same tree then move the node
    if (from.node.treeModel == to.node.treeModel) {
      const toChildren = to.node.getField('children');

      node = fromChildren.splice(from.index, 1)[0];

      // Compensate for index if already removed from parent:
      let toIndex = (from.node === to.node && to.index > from.index) ? to.index - 1 : to.index;

      toChildren.splice(toIndex, 0, node);

      this.update();
    }

    // build "from" node data
    let fromNode = { index : from.index, node : from.node.children[from.index] };

    // pass additional source node to event
    this.fireEvent({ eventName: TREE_EVENTS.onMoveNode, node : node, to : to , from : fromNode });
  }

  setDragNode(dragNode:{ node: TreeNode, index:number }) {
    TreeModel._dragNode = dragNode;
  }

  getDragNode():{ node: TreeNode, index:number } {
    return TreeModel._dragNode || { node:null, index: null };
  }

  isDragging() {
    return this.getDragNode().node;
  }

  setDropLocation(dropLocation: { component: any, node: TreeNode, index: number }) {
    this._dropLocation = dropLocation;
  }

  getDropLocation(): { component: any, node: TreeNode, index: number } {
    return this._dropLocation || {component: null, node: null, index: null};
  }

  isDraggingOver(component) {
    return this.getDropLocation().component === component;
  }

  cancelDrag() {
    this.setDropLocation(null);
    this.setDragNode(null);
  }
}

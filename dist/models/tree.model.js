var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
import { Injectable } from '@angular/core';
import { observable, computed, action, autorun } from 'mobx';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';
import { TREE_EVENTS } from '../constants/events';
import first from 'lodash/first';
import last from 'lodash/last';
import compact from 'lodash/compact';
import find from 'lodash/find';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
var TreeModel = /** @class */ (function() {
  function TreeModel() {
    this.options = new TreeOptions();
    this.eventNames = Object.keys(TREE_EVENTS);
    this.expandedNodeIds = {};
    this.selectedLeafNodeIds = {};
    this.activeNodeIds = {};
    this.hiddenNodeIds = {};
    this.focusedNodeId = null;
    this.firstUpdate = true;
    this.subscriptions = [];
  }
  TreeModel_1 = TreeModel;
  // events
  TreeModel.prototype.fireEvent = function(event) {
    event.treeModel = this;
    this.events[event.eventName].emit(event);
    this.events.event.emit(event);
  };
  TreeModel.prototype.subscribe = function(eventName, fn) {
    var subscription = this.events[eventName].subscribe(fn);
    this.subscriptions.push(subscription);
  };
  // getters
  TreeModel.prototype.getFocusedNode = function() {
    return this.focusedNode;
  };
  TreeModel.prototype.getActiveNode = function() {
    return this.activeNodes[0];
  };
  TreeModel.prototype.getActiveNodes = function() {
    return this.activeNodes;
  };
  TreeModel.prototype.getVisibleRoots = function() {
    return this.virtualRoot.visibleChildren;
  };
  TreeModel.prototype.getFirstRoot = function(skipHidden) {
    if (skipHidden === void 0) {
      skipHidden = false;
    }
    return first(skipHidden ? this.getVisibleRoots() : this.roots);
  };
  TreeModel.prototype.getLastRoot = function(skipHidden) {
    if (skipHidden === void 0) {
      skipHidden = false;
    }
    return last(skipHidden ? this.getVisibleRoots() : this.roots);
  };
  Object.defineProperty(TreeModel.prototype, 'isFocused', {
    get: function() {
      return TreeModel_1.focusedTree === this;
    },
    enumerable: true,
    configurable: true
  });
  TreeModel.prototype.isNodeFocused = function(node) {
    return this.focusedNode === node;
  };
  TreeModel.prototype.isEmptyTree = function() {
    return this.roots && this.roots.length === 0;
  };
  Object.defineProperty(TreeModel.prototype, 'focusedNode', {
    get: function() {
      return this.focusedNodeId ? this.getNodeById(this.focusedNodeId) : null;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeModel.prototype, 'expandedNodes', {
    get: function() {
      var _this = this;
      var nodes = Object.keys(this.expandedNodeIds)
        .filter(function(id) {
          return _this.expandedNodeIds[id];
        })
        .map(function(id) {
          return _this.getNodeById(id);
        });
      return compact(nodes);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeModel.prototype, 'activeNodes', {
    get: function() {
      var _this = this;
      var nodes = Object.keys(this.activeNodeIds)
        .filter(function(id) {
          return _this.activeNodeIds[id];
        })
        .map(function(id) {
          return _this.getNodeById(id);
        });
      return compact(nodes);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeModel.prototype, 'hiddenNodes', {
    get: function() {
      var _this = this;
      var nodes = Object.keys(this.hiddenNodeIds)
        .filter(function(id) {
          return _this.hiddenNodeIds[id];
        })
        .map(function(id) {
          return _this.getNodeById(id);
        });
      return compact(nodes);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeModel.prototype, 'selectedLeafNodes', {
    get: function() {
      var _this = this;
      var nodes = Object.keys(this.selectedLeafNodeIds)
        .filter(function(id) {
          return _this.selectedLeafNodeIds[id];
        })
        .map(function(id) {
          return _this.getNodeById(id);
        });
      return compact(nodes);
    },
    enumerable: true,
    configurable: true
  });
  // locating nodes
  TreeModel.prototype.getNodeByPath = function(path, startNode) {
    if (startNode === void 0) {
      startNode = null;
    }
    if (!path) return null;
    startNode = startNode || this.virtualRoot;
    if (path.length === 0) return startNode;
    if (!startNode.children) return null;
    var childId = path.shift();
    var childNode = find(startNode.children, { id: childId });
    if (!childNode) return null;
    return this.getNodeByPath(path, childNode);
  };
  TreeModel.prototype.getNodeById = function(id) {
    var idStr = id.toString();
    return this.getNodeBy(function(node) {
      return node.id.toString() === idStr;
    });
  };
  TreeModel.prototype.getNodeBy = function(predicate, startNode) {
    if (startNode === void 0) {
      startNode = null;
    }
    startNode = startNode || this.virtualRoot;
    if (!startNode.children) return null;
    var found = find(startNode.children, predicate);
    if (found) {
      // found in children
      return found;
    } else {
      // look in children's children
      for (var _i = 0, _a = startNode.children; _i < _a.length; _i++) {
        var child = _a[_i];
        var foundInChildren = this.getNodeBy(predicate, child);
        if (foundInChildren) return foundInChildren;
      }
    }
  };
  TreeModel.prototype.isExpanded = function(node) {
    return this.expandedNodeIds[node.id];
  };
  TreeModel.prototype.isHidden = function(node) {
    return this.hiddenNodeIds[node.id];
  };
  TreeModel.prototype.isActive = function(node) {
    return this.activeNodeIds[node.id];
  };
  TreeModel.prototype.isSelected = function(node) {
    return this.selectedLeafNodeIds[node.id];
  };
  TreeModel.prototype.ngOnDestroy = function() {
    this.dispose();
    this.unsubscribeAll();
  };
  TreeModel.prototype.dispose = function() {
    // Dispose reactions of the replaced nodes
    if (this.virtualRoot) {
      this.virtualRoot.dispose();
    }
  };
  TreeModel.prototype.unsubscribeAll = function() {
    this.subscriptions.forEach(function(subscription) {
      return subscription.unsubscribe();
    });
    this.subscriptions = [];
  };
  // actions
  TreeModel.prototype.setData = function(_a) {
    var nodes = _a.nodes,
      _b = _a.options,
      options = _b === void 0 ? null : _b,
      _c = _a.events,
      events = _c === void 0 ? null : _c;
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
  };
  TreeModel.prototype.update = function() {
    var _a;
    // Rebuild tree:
    var virtualRootConfig =
      ((_a = {
        id: this.options.rootId,
        virtual: true
      }),
      (_a[this.options.childrenField] = this.nodes),
      _a);
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
  };
  TreeModel.prototype.setFocusedNode = function(node) {
    this.focusedNodeId = node ? node.id : null;
  };
  TreeModel.prototype.setFocus = function(value) {
    TreeModel_1.focusedTree = value ? this : null;
  };
  TreeModel.prototype.doForAll = function(fn) {
    this.roots.forEach(function(root) {
      return root.doForAll(fn);
    });
  };
  TreeModel.prototype.focusNextNode = function() {
    var previousNode = this.getFocusedNode();
    var nextNode = previousNode
      ? previousNode.findNextNode(true, true)
      : this.getFirstRoot(true);
    if (nextNode) nextNode.focus();
  };
  TreeModel.prototype.focusPreviousNode = function() {
    var previousNode = this.getFocusedNode();
    var nextNode = previousNode
      ? previousNode.findPreviousNode(true)
      : this.getLastRoot(true);
    if (nextNode) nextNode.focus();
  };
  TreeModel.prototype.focusDrillDown = function() {
    var previousNode = this.getFocusedNode();
    if (previousNode && previousNode.isCollapsed && previousNode.hasChildren) {
      previousNode.toggleExpanded();
    } else {
      var nextNode = previousNode
        ? previousNode.getFirstChild(true)
        : this.getFirstRoot(true);
      if (nextNode) nextNode.focus();
    }
  };
  TreeModel.prototype.focusDrillUp = function() {
    var previousNode = this.getFocusedNode();
    if (!previousNode) return;
    if (previousNode.isExpanded) {
      previousNode.toggleExpanded();
    } else {
      var nextNode = previousNode.realParent;
      if (nextNode) nextNode.focus();
    }
  };
  TreeModel.prototype.setActiveNode = function(node, value, multi) {
    if (multi === void 0) {
      multi = false;
    }
    if (multi) {
      this._setActiveNodeMulti(node, value);
    } else {
      this._setActiveNodeSingle(node, value);
    }
    if (value) {
      node.focus(this.options.scrollOnActivate);
      this.fireEvent({ eventName: TREE_EVENTS.activate, node: node });
      this.fireEvent({ eventName: TREE_EVENTS.nodeActivate, node: node }); // For IE11
    } else {
      this.fireEvent({ eventName: TREE_EVENTS.deactivate, node: node });
      this.fireEvent({ eventName: TREE_EVENTS.nodeDeactivate, node: node }); // For IE11
    }
  };
  TreeModel.prototype.setSelectedNode = function(node, value) {
    var _a;
    this.selectedLeafNodeIds = Object.assign(
      {},
      this.selectedLeafNodeIds,
      ((_a = {}), (_a[node.id] = value), _a)
    );
    if (value) {
      node.focus();
      this.fireEvent({ eventName: TREE_EVENTS.select, node: node });
    } else {
      this.fireEvent({ eventName: TREE_EVENTS.deselect, node: node });
    }
  };
  TreeModel.prototype.setExpandedNode = function(node, value) {
    var _a;
    this.expandedNodeIds = Object.assign(
      {},
      this.expandedNodeIds,
      ((_a = {}), (_a[node.id] = value), _a)
    );
    this.fireEvent({
      eventName: TREE_EVENTS.toggleExpanded,
      node: node,
      isExpanded: value
    });
  };
  TreeModel.prototype.expandAll = function() {
    this.roots.forEach(function(root) {
      return root.expandAll();
    });
  };
  TreeModel.prototype.collapseAll = function() {
    this.roots.forEach(function(root) {
      return root.collapseAll();
    });
  };
  TreeModel.prototype.setIsHidden = function(node, value) {
    var _a;
    this.hiddenNodeIds = Object.assign(
      {},
      this.hiddenNodeIds,
      ((_a = {}), (_a[node.id] = value), _a)
    );
  };
  TreeModel.prototype.setHiddenNodeIds = function(nodeIds) {
    this.hiddenNodeIds = nodeIds.reduce(function(hiddenNodeIds, id) {
      var _a;
      return Object.assign(hiddenNodeIds, ((_a = {}), (_a[id] = true), _a));
    }, {});
  };
  TreeModel.prototype.performKeyAction = function(node, $event) {
    var action = this.options.actionMapping.keys[$event.keyCode];
    if (action) {
      $event.preventDefault();
      action(this, node, $event);
      return true;
    } else {
      return false;
    }
  };
  TreeModel.prototype.filterNodes = function(filter, autoShow) {
    var _this = this;
    if (autoShow === void 0) {
      autoShow = true;
    }
    var filterFn;
    if (!filter) {
      return this.clearFilter();
    }
    // support function and string filter
    if (isString(filter)) {
      filterFn = function(node) {
        return (
          node.displayField.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        );
      };
    } else if (isFunction(filter)) {
      filterFn = filter;
    } else {
      console.error("Don't know what to do with filter", filter);
      console.error('Should be either a string or function');
      return;
    }
    var ids = {};
    this.roots.forEach(function(node) {
      return _this._filterNode(ids, node, filterFn, autoShow);
    });
    this.hiddenNodeIds = ids;
    this.fireEvent({ eventName: TREE_EVENTS.changeFilter });
  };
  TreeModel.prototype.clearFilter = function() {
    this.hiddenNodeIds = {};
    this.fireEvent({ eventName: TREE_EVENTS.changeFilter });
  };
  TreeModel.prototype.moveNode = function(node, to) {
    var fromIndex = node.getIndexInParent();
    var fromParent = node.parent;
    if (!this.canMoveNode(node, to, fromIndex)) return;
    var fromChildren = fromParent.getField('children');
    // If node doesn't have children - create children array
    if (!to.parent.getField('children')) {
      to.parent.setField('children', []);
    }
    var toChildren = to.parent.getField('children');
    var originalNode = fromChildren.splice(fromIndex, 1)[0];
    // Compensate for index if already removed from parent:
    var toIndex =
      fromParent === to.parent && to.index > fromIndex
        ? to.index - 1
        : to.index;
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
  };
  TreeModel.prototype.copyNode = function(node, to) {
    var fromIndex = node.getIndexInParent();
    if (!this.canMoveNode(node, to, fromIndex)) return;
    // If node doesn't have children - create children array
    if (!to.parent.getField('children')) {
      to.parent.setField('children', []);
    }
    var toChildren = to.parent.getField('children');
    var nodeCopy = this.options.getNodeClone(node);
    toChildren.splice(to.index, 0, nodeCopy);
    node.treeModel.update();
    if (to.parent.treeModel !== node.treeModel) {
      to.parent.treeModel.update();
    }
    this.fireEvent({
      eventName: TREE_EVENTS.copyNode,
      node: nodeCopy,
      to: { parent: to.parent.data, index: to.index }
    });
  };
  TreeModel.prototype.getState = function() {
    return {
      expandedNodeIds: this.expandedNodeIds,
      selectedLeafNodeIds: this.selectedLeafNodeIds,
      activeNodeIds: this.activeNodeIds,
      hiddenNodeIds: this.hiddenNodeIds,
      focusedNodeId: this.focusedNodeId
    };
  };
  TreeModel.prototype.setState = function(state) {
    if (!state) return;
    Object.assign(this, {
      expandedNodeIds: state.expandedNodeIds || {},
      selectedLeafNodeIds: state.selectedLeafNodeIds || {},
      activeNodeIds: state.activeNodeIds || {},
      hiddenNodeIds: state.hiddenNodeIds || {},
      focusedNodeId: state.focusedNodeId
    });
  };
  TreeModel.prototype.subscribeToState = function(fn) {
    var _this = this;
    autorun(function() {
      return fn(_this.getState());
    });
  };
  TreeModel.prototype.canMoveNode = function(node, to, fromIndex) {
    if (fromIndex === void 0) {
      fromIndex = undefined;
    }
    var fromNodeIndex = fromIndex || node.getIndexInParent();
    // same node:
    if (node.parent === to.parent && fromIndex === to.index) {
      return false;
    }
    return !to.parent.isDescendantOf(node);
  };
  TreeModel.prototype.calculateExpandedNodes = function() {
    this._calculateExpandedNodes();
  };
  // private methods
  TreeModel.prototype._filterNode = function(ids, node, filterFn, autoShow) {
    var _this = this;
    // if node passes function then it's visible
    var isVisible = filterFn(node);
    if (node.children) {
      // if one of node's children passes filter then this node is also visible
      node.children.forEach(function(child) {
        if (_this._filterNode(ids, child, filterFn, autoShow)) {
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
  };
  TreeModel.prototype._calculateExpandedNodes = function(startNode) {
    var _a;
    var _this = this;
    if (startNode === void 0) {
      startNode = null;
    }
    startNode = startNode || this.virtualRoot;
    if (startNode.data[this.options.isExpandedField]) {
      this.expandedNodeIds = Object.assign(
        {},
        this.expandedNodeIds,
        ((_a = {}), (_a[startNode.id] = true), _a)
      );
    }
    if (startNode.children) {
      startNode.children.forEach(function(child) {
        return _this._calculateExpandedNodes(child);
      });
    }
  };
  TreeModel.prototype._setActiveNodeSingle = function(node, value) {
    var _a;
    var _this = this;
    // Deactivate all other nodes:
    this.activeNodes
      .filter(function(activeNode) {
        return activeNode !== node;
      })
      .forEach(function(activeNode) {
        _this.fireEvent({
          eventName: TREE_EVENTS.deactivate,
          node: activeNode
        });
        _this.fireEvent({
          eventName: TREE_EVENTS.nodeDeactivate,
          node: activeNode
        }); // For IE11
      });
    if (value) {
      this.activeNodeIds = ((_a = {}), (_a[node.id] = true), _a);
    } else {
      this.activeNodeIds = {};
    }
  };
  TreeModel.prototype._setActiveNodeMulti = function(node, value) {
    var _a;
    this.activeNodeIds = Object.assign(
      {},
      this.activeNodeIds,
      ((_a = {}), (_a[node.id] = value), _a)
    );
  };
  var TreeModel_1;
  TreeModel.focusedTree = null;
  __decorate(
    [observable, __metadata('design:type', Array)],
    TreeModel.prototype,
    'roots',
    void 0
  );
  __decorate(
    [observable, __metadata('design:type', Object)],
    TreeModel.prototype,
    'expandedNodeIds',
    void 0
  );
  __decorate(
    [observable, __metadata('design:type', Object)],
    TreeModel.prototype,
    'selectedLeafNodeIds',
    void 0
  );
  __decorate(
    [observable, __metadata('design:type', Object)],
    TreeModel.prototype,
    'activeNodeIds',
    void 0
  );
  __decorate(
    [observable, __metadata('design:type', Object)],
    TreeModel.prototype,
    'hiddenNodeIds',
    void 0
  );
  __decorate(
    [observable, __metadata('design:type', Object)],
    TreeModel.prototype,
    'focusedNodeId',
    void 0
  );
  __decorate(
    [observable, __metadata('design:type', TreeNode)],
    TreeModel.prototype,
    'virtualRoot',
    void 0
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeModel.prototype,
    'focusedNode',
    null
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeModel.prototype,
    'expandedNodes',
    null
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeModel.prototype,
    'activeNodes',
    null
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeModel.prototype,
    'hiddenNodes',
    null
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeModel.prototype,
    'selectedLeafNodes',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'setData',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'update',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'setFocusedNode',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'setFocus',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'doForAll',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'focusNextNode',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'focusPreviousNode',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'focusDrillDown',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'focusDrillUp',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object, Object, Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'setActiveNode',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object, Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'setSelectedNode',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object, Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'setExpandedNode',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'expandAll',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'collapseAll',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object, Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'setIsHidden',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'setHiddenNodeIds',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object, Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'filterNodes',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'clearFilter',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object, Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'moveNode',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object, Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'copyNode',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeModel.prototype,
    'setState',
    null
  );
  TreeModel = TreeModel_1 = __decorate([Injectable()], TreeModel);
  return TreeModel;
})();
export { TreeModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvdHJlZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUEyQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWxELE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQztBQUNqQyxPQUFPLElBQUksTUFBTSxhQUFhLENBQUM7QUFDL0IsT0FBTyxPQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxJQUFJLE1BQU0sYUFBYSxDQUFDO0FBQy9CLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sVUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBRzNDO0lBREE7UUFJRSxZQUFPLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFFekMsZUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFJMUIsb0JBQWUsR0FBcUIsRUFBRSxDQUFDO1FBQ3ZDLHdCQUFtQixHQUFxQixFQUFFLENBQUM7UUFDM0Msa0JBQWEsR0FBcUIsRUFBRSxDQUFDO1FBQ3JDLGtCQUFhLEdBQXFCLEVBQUUsQ0FBQztRQUNyQyxrQkFBYSxHQUFXLElBQUksQ0FBQztRQUdqQyxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVuQixrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFtZjdDLENBQUM7a0JBcmdCWSxTQUFTO0lBb0JwQixTQUFTO0lBQ1QsNkJB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QUFULFFBQVE7OztrREFNUjtJQUVTO1FBQVQsUUFBUTs7O2dEQU1SO0lBRVM7UUFBVCxRQUFROzs7Z0RBTVI7SUFFUztRQUFULFFBQVE7OztzREFNUjtJQTRFTztRQUFQLE1BQU07Ozs7NENBWU47SUFFTztRQUFQLE1BQU07Ozs7MkNBdUJOO0lBR087UUFBUCxNQUFNOzs7O21EQUVOO0lBRU87UUFBUCxNQUFNOzs7OzZDQUVOO0lBRU87UUFBUCxNQUFNOzs7OzZDQUVOO0lBRU87UUFBUCxNQUFNOzs7O2tEQUlOO0lBRU87UUFBUCxNQUFNOzs7O3NEQUlOO0lBRU87UUFBUCxNQUFNOzs7O21EQVNOO0lBRU87UUFBUCxNQUFNOzs7O2lEQVVOO0lBRU87UUFBUCxNQUFNOzs7O2tEQWdCTjtJQUVPO1FBQVAsTUFBTTs7OztvREFTTjtJQUVPO1FBQVAsTUFBTTs7OztvREFHTjtJQUVPO1FBQVAsTUFBTTs7Ozs4Q0FFTjtJQUVPO1FBQVAsTUFBTTs7OztnREFFTjtJQUVPO1FBQVAsTUFBTTs7OztnREFFTjtJQUVPO1FBQVAsTUFBTTs7OztxREFJTjtJQWFPO1FBQVAsTUFBTTs7OztnREF3Qk47SUFFTztRQUFQLE1BQU07Ozs7Z0RBR047SUFFTztRQUFQLE1BQU07Ozs7NkNBZ0NOO0lBRU87UUFBUCxNQUFNOzs7OzZDQXFCTjtJQVlPO1FBQVAsTUFBTTs7Ozs2Q0FVTjtJQXZiVSxTQUFTO1FBRHJCLFVBQVUsRUFBRTtPQUNBLFNBQVMsQ0FxZ0JyQjtJQUFELGdCQUFDO0NBQUEsQUFyZ0JELElBcWdCQztTQXJnQlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBvYnNlcnZhYmxlLCBjb21wdXRlZCwgYWN0aW9uLCBhdXRvcnVuIH0gZnJvbSAnbW9ieCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU9wdGlvbnMgfSBmcm9tICcuL3RyZWUtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlVmlydHVhbFNjcm9sbCB9IGZyb20gJy4vdHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbCc7XG5pbXBvcnQgeyBJVHJlZU1vZGVsLCBJRFR5cGUsIElEVHlwZURpY3Rpb25hcnkgfSBmcm9tICcuLi9kZWZzL2FwaSc7XG5pbXBvcnQgeyBUUkVFX0VWRU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xuXG5pbXBvcnQgZmlyc3QgZnJvbSAnbG9kYXNoL2ZpcnN0JztcbmltcG9ydCBsYXN0IGZyb20gJ2xvZGFzaC9sYXN0JztcbmltcG9ydCBjb21wYWN0IGZyb20gJ2xvZGFzaC9jb21wYWN0JztcbmltcG9ydCBmaW5kIGZyb20gJ2xvZGFzaC9maW5kJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICdsb2Rhc2gvaXNTdHJpbmcnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnbG9kYXNoL2lzRnVuY3Rpb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJlZU1vZGVsIGltcGxlbWVudHMgSVRyZWVNb2RlbCwgT25EZXN0cm95IHtcbiAgc3RhdGljIGZvY3VzZWRUcmVlID0gbnVsbDtcblxuICBvcHRpb25zOiBUcmVlT3B0aW9ucyA9IG5ldyBUcmVlT3B0aW9ucygpO1xuICBub2RlczogYW55W107XG4gIGV2ZW50TmFtZXMgPSBPYmplY3Qua2V5cyhUUkVFX0VWRU5UUyk7XG4gIHZpcnR1YWxTY3JvbGw6IFRyZWVWaXJ0dWFsU2Nyb2xsO1xuXG4gIEBvYnNlcnZhYmxlIHJvb3RzOiBUcmVlTm9kZVtdO1xuICBAb2JzZXJ2YWJsZSBleHBhbmRlZE5vZGVJZHM6IElEVHlwZURpY3Rpb25hcnkgPSB7fTtcbiAgQG9ic2VydmFibGUgc2VsZWN0ZWRMZWFmTm9kZUlkczogSURUeXBlRGljdGlvbmFyeSA9IHt9O1xuICBAb2JzZXJ2YWJsZSBhY3RpdmVOb2RlSWRzOiBJRFR5cGVEaWN0aW9uYXJ5ID0ge307XG4gIEBvYnNlcnZhYmxlIGhpZGRlbk5vZGVJZHM6IElEVHlwZURpY3Rpb25hcnkgPSB7fTtcbiAgQG9ic2VydmFibGUgZm9jdXNlZE5vZGVJZDogSURUeXBlID0gbnVsbDtcbiAgQG9ic2VydmFibGUgdmlydHVhbFJvb3Q6IFRyZWVOb2RlO1xuXG4gIHByaXZhdGUgZmlyc3RVcGRhdGUgPSB0cnVlO1xuICBwcml2YXRlIGV2ZW50czogYW55O1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgLy8gZXZlbnRzXG4gIGZpcmVFdmVudChldmVudCkge1xuICAgIGV2ZW50LnRyZWVNb2RlbCA9IHRoaXM7XG4gICAgdGhpcy5ldmVudHNbZXZlbnQuZXZlbnROYW1lXS5lbWl0KGV2ZW50KTtcbiAgICB0aGlzLmV2ZW50cy5ldmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHN1YnNjcmliZShldmVudE5hbWUsIGZuKSB7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5zdWJzY3JpYmUoZm4pO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gIH1cblxuXG4gIC8vIGdldHRlcnNcbiAgZ2V0Rm9jdXNlZE5vZGUoKTogVHJlZU5vZGUge1xuICAgIHJldHVybiB0aGlzLmZvY3VzZWROb2RlO1xuICB9XG5cblxuICBnZXRBY3RpdmVOb2RlKCk6IFRyZWVOb2RlIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVOb2Rlc1swXTtcbiAgfVxuXG4gIGdldEFjdGl2ZU5vZGVzKCk6IFRyZWVOb2RlW10ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZU5vZGVzO1xuICB9XG5cbiAgZ2V0VmlzaWJsZVJvb3RzKCkge1xuICAgIHJldHVybiB0aGlzLnZpcnR1YWxSb290LnZpc2libGVDaGlsZHJlbjtcbiAgfVxuXG4gIGdldEZpcnN0Um9vdChza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICByZXR1cm4gZmlyc3Qoc2tpcEhpZGRlbiA/IHRoaXMuZ2V0VmlzaWJsZVJvb3RzKCkgOiB0aGlzLnJvb3RzKTtcbiAgfVxuXG4gIGdldExhc3RSb290KHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIHJldHVybiBsYXN0KHNraXBIaWRkZW4gPyB0aGlzLmdldFZpc2libGVSb290cygpIDogdGhpcy5yb290cyk7XG4gIH1cblxuICBnZXQgaXNGb2N1c2VkKCkge1xuICAgIHJldHVybiBUcmVlTW9kZWwuZm9jdXNlZFRyZWUgPT09IHRoaXM7XG4gIH1cblxuICBpc05vZGVGb2N1c2VkKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5mb2N1c2VkTm9kZSA9PT0gbm9kZTtcbiAgfVxuXG4gIGlzRW1wdHlUcmVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJvb3RzICYmIHRoaXMucm9vdHMubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgQGNvbXB1dGVkIGdldCBmb2N1c2VkTm9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5mb2N1c2VkTm9kZUlkID8gdGhpcy5nZXROb2RlQnlJZCh0aGlzLmZvY3VzZWROb2RlSWQpIDogbnVsbDtcbiAgfVxuXG4gIEBjb21wdXRlZCBnZXQgZXhwYW5kZWROb2RlcygpIHtcbiAgICBjb25zdCBub2RlcyA9IE9iamVjdC5rZXlzKHRoaXMuZXhwYW5kZWROb2RlSWRzKVxuICAgICAgLmZpbHRlcigoaWQpID0+IHRoaXMuZXhwYW5kZWROb2RlSWRzW2lkXSlcbiAgICAgIC5tYXAoKGlkKSA9PiB0aGlzLmdldE5vZGVCeUlkKGlkKSk7XG5cbiAgICByZXR1cm4gY29tcGFjdChub2Rlcyk7XG4gIH1cblxuICBAY29tcHV0ZWQgZ2V0IGFjdGl2ZU5vZGVzKCkge1xuICAgIGNvbnN0IG5vZGVzID0gT2JqZWN0LmtleXModGhpcy5hY3RpdmVOb2RlSWRzKVxuICAgICAgLmZpbHRlcigoaWQpID0+IHRoaXMuYWN0aXZlTm9kZUlkc1tpZF0pXG4gICAgICAubWFwKChpZCkgPT4gdGhpcy5nZXROb2RlQnlJZChpZCkpO1xuXG4gICAgcmV0dXJuIGNvbXBhY3Qobm9kZXMpO1xuICB9XG5cbiAgQGNvbXB1dGVkIGdldCBoaWRkZW5Ob2RlcygpIHtcbiAgICBjb25zdCBub2RlcyA9IE9iamVjdC5rZXlzKHRoaXMuaGlkZGVuTm9kZUlkcylcbiAgICAgICAgLmZpbHRlcigoaWQpID0+IHRoaXMuaGlkZGVuTm9kZUlkc1tpZF0pXG4gICAgICAgIC5tYXAoKGlkKSA9PiB0aGlzLmdldE5vZGVCeUlkKGlkKSk7XG5cbiAgICByZXR1cm4gY29tcGFjdChub2Rlcyk7XG4gIH1cblxuICBAY29tcHV0ZWQgZ2V0IHNlbGVjdGVkTGVhZk5vZGVzKCkge1xuICAgIGNvbnN0IG5vZGVzID0gT2JqZWN0LmtleXModGhpcy5zZWxlY3RlZExlYWZOb2RlSWRzKVxuICAgICAgICAuZmlsdGVyKChpZCkgPT4gdGhpcy5zZWxlY3RlZExlYWZOb2RlSWRzW2lkXSlcbiAgICAgICAgLm1hcCgoaWQpID0+IHRoaXMuZ2V0Tm9kZUJ5SWQoaWQpKTtcblxuICAgIHJldHVybiBjb21wYWN0KG5vZGVzKTtcbiAgfVxuXG4gIC8vIGxvY2F0aW5nIG5vZGVzXG4gIGdldE5vZGVCeVBhdGgocGF0aDogYW55W10sIHN0YXJ0Tm9kZT0gbnVsbCk6IFRyZWVOb2RlIHtcbiAgICBpZiAoIXBhdGgpIHJldHVybiBudWxsO1xuXG4gICAgc3RhcnROb2RlID0gc3RhcnROb2RlIHx8IHRoaXMudmlydHVhbFJvb3Q7XG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSByZXR1cm4gc3RhcnROb2RlO1xuXG4gICAgaWYgKCFzdGFydE5vZGUuY2hpbGRyZW4pIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgY2hpbGRJZCA9IHBhdGguc2hpZnQoKTtcbiAgICBjb25zdCBjaGlsZE5vZGUgPSBmaW5kKHN0YXJ0Tm9kZS5jaGlsZHJlbiwgeyBpZDogY2hpbGRJZCB9KTtcblxuICAgIGlmICghY2hpbGROb2RlKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiB0aGlzLmdldE5vZGVCeVBhdGgocGF0aCwgY2hpbGROb2RlKTtcbiAgfVxuXG4gIGdldE5vZGVCeUlkKGlkKSB7XG4gICAgY29uc3QgaWRTdHIgPSBpZC50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUJ5KChub2RlKSA9PiBub2RlLmlkLnRvU3RyaW5nKCkgPT09IGlkU3RyKTtcbiAgfVxuXG4gIGdldE5vZGVCeShwcmVkaWNhdGUsIHN0YXJ0Tm9kZSA9IG51bGwpIHtcbiAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUgfHwgdGhpcy52aXJ0dWFsUm9vdDtcblxuICAgIGlmICghc3RhcnROb2RlLmNoaWxkcmVuKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IGZvdW5kID0gZmluZChzdGFydE5vZGUuY2hpbGRyZW4sIHByZWRpY2F0ZSk7XG5cbiAgICBpZiAoZm91bmQpIHsgLy8gZm91bmQgaW4gY2hpbGRyZW5cbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9IGVsc2UgeyAvLyBsb29rIGluIGNoaWxkcmVuJ3MgY2hpbGRyZW5cbiAgICAgIGZvciAobGV0IGNoaWxkIG9mIHN0YXJ0Tm9kZS5jaGlsZHJlbikge1xuICAgICAgICBjb25zdCBmb3VuZEluQ2hpbGRyZW4gPSB0aGlzLmdldE5vZGVCeShwcmVkaWNhdGUsIGNoaWxkKTtcbiAgICAgICAgaWYgKGZvdW5kSW5DaGlsZHJlbikgcmV0dXJuIGZvdW5kSW5DaGlsZHJlbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc0V4cGFuZGVkKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmRlZE5vZGVJZHNbbm9kZS5pZF07XG4gIH1cblxuICBpc0hpZGRlbihub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaGlkZGVuTm9kZUlkc1tub2RlLmlkXTtcbiAgfVxuXG4gIGlzQWN0aXZlKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVOb2RlSWRzW25vZGUuaWRdO1xuICB9XG5cbiAgaXNTZWxlY3RlZChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRMZWFmTm9kZUlkc1tub2RlLmlkXTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgIHRoaXMudW5zdWJzY3JpYmVBbGwoKTtcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgLy8gRGlzcG9zZSByZWFjdGlvbnMgb2YgdGhlIHJlcGxhY2VkIG5vZGVzXG4gICAgaWYgKHRoaXMudmlydHVhbFJvb3QpIHtcbiAgICAgIHRoaXMudmlydHVhbFJvb3QuZGlzcG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHVuc3Vic2NyaWJlQWxsKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YnNjcmlwdGlvbiA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gIH1cblxuICAvLyBhY3Rpb25zXG4gIEBhY3Rpb24gc2V0RGF0YSh7IG5vZGVzLCBvcHRpb25zID0gbnVsbCwgZXZlbnRzID0gbnVsbCB9OiB7bm9kZXM6IGFueSwgb3B0aW9uczogYW55LCBldmVudHM6IGFueX0pIHtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgdGhpcy5vcHRpb25zID0gbmV3IFRyZWVPcHRpb25zKG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzKSB7XG4gICAgICB0aGlzLmV2ZW50cyA9IGV2ZW50cztcbiAgICB9XG4gICAgaWYgKG5vZGVzKSB7XG4gICAgICB0aGlzLm5vZGVzID0gbm9kZXM7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIEBhY3Rpb24gdXBkYXRlKCkge1xuICAgIC8vIFJlYnVpbGQgdHJlZTpcbiAgICBsZXQgdmlydHVhbFJvb3RDb25maWcgPSB7XG4gICAgICBpZDogdGhpcy5vcHRpb25zLnJvb3RJZCxcbiAgICAgIHZpcnR1YWw6IHRydWUsXG4gICAgICBbdGhpcy5vcHRpb25zLmNoaWxkcmVuRmllbGRdOiB0aGlzLm5vZGVzXG4gICAgfTtcblxuICAgIHRoaXMuZGlzcG9zZSgpO1xuXG4gICAgdGhpcy52aXJ0dWFsUm9vdCA9IG5ldyBUcmVlTm9kZSh2aXJ0dWFsUm9vdENvbmZpZywgbnVsbCwgdGhpcywgMCk7XG5cbiAgICB0aGlzLnJvb3RzID0gdGhpcy52aXJ0dWFsUm9vdC5jaGlsZHJlbjtcblxuICAgIC8vIEZpcmUgZXZlbnQ6XG4gICAgaWYgKHRoaXMuZmlyc3RVcGRhdGUpIHtcbiAgICAgIGlmICh0aGlzLnJvb3RzKSB7XG4gICAgICAgIHRoaXMuZmlyc3RVcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlRXhwYW5kZWROb2RlcygpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMudXBkYXRlRGF0YSB9KTtcbiAgICB9XG4gIH1cblxuXG4gIEBhY3Rpb24gc2V0Rm9jdXNlZE5vZGUobm9kZSkge1xuICAgIHRoaXMuZm9jdXNlZE5vZGVJZCA9IG5vZGUgPyBub2RlLmlkIDogbnVsbDtcbiAgfVxuXG4gIEBhY3Rpb24gc2V0Rm9jdXModmFsdWUpIHtcbiAgICBUcmVlTW9kZWwuZm9jdXNlZFRyZWUgPSB2YWx1ZSA/IHRoaXMgOiBudWxsO1xuICB9XG5cbiAgQGFjdGlvbiBkb0ZvckFsbChmbikge1xuICAgIHRoaXMucm9vdHMuZm9yRWFjaCgocm9vdCkgPT4gcm9vdC5kb0ZvckFsbChmbikpO1xuICB9XG5cbiAgQGFjdGlvbiBmb2N1c05leHROb2RlKCkge1xuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLmdldEZvY3VzZWROb2RlKCk7XG4gICAgbGV0IG5leHROb2RlID0gcHJldmlvdXNOb2RlID8gcHJldmlvdXNOb2RlLmZpbmROZXh0Tm9kZSh0cnVlLCB0cnVlKSA6IHRoaXMuZ2V0Rmlyc3RSb290KHRydWUpO1xuICAgIGlmIChuZXh0Tm9kZSkgbmV4dE5vZGUuZm9jdXMoKTtcbiAgfVxuXG4gIEBhY3Rpb24gZm9jdXNQcmV2aW91c05vZGUoKSB7XG4gICAgbGV0IHByZXZpb3VzTm9kZSA9IHRoaXMuZ2V0Rm9jdXNlZE5vZGUoKTtcbiAgICBsZXQgbmV4dE5vZGUgPSBwcmV2aW91c05vZGUgPyBwcmV2aW91c05vZGUuZmluZFByZXZpb3VzTm9kZSh0cnVlKSA6IHRoaXMuZ2V0TGFzdFJvb3QodHJ1ZSk7XG4gICAgaWYgKG5leHROb2RlKSBuZXh0Tm9kZS5mb2N1cygpO1xuICB9XG5cbiAgQGFjdGlvbiBmb2N1c0RyaWxsRG93bigpIHtcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gdGhpcy5nZXRGb2N1c2VkTm9kZSgpO1xuICAgIGlmIChwcmV2aW91c05vZGUgJiYgcHJldmlvdXNOb2RlLmlzQ29sbGFwc2VkICYmIHByZXZpb3VzTm9kZS5oYXNDaGlsZHJlbikge1xuICAgICAgcHJldmlvdXNOb2RlLnRvZ2dsZUV4cGFuZGVkKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGV0IG5leHROb2RlID0gcHJldmlvdXNOb2RlID8gcHJldmlvdXNOb2RlLmdldEZpcnN0Q2hpbGQodHJ1ZSkgOiB0aGlzLmdldEZpcnN0Um9vdCh0cnVlKTtcbiAgICAgIGlmIChuZXh0Tm9kZSkgbmV4dE5vZGUuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBAYWN0aW9uIGZvY3VzRHJpbGxVcCgpIHtcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gdGhpcy5nZXRGb2N1c2VkTm9kZSgpO1xuICAgIGlmICghcHJldmlvdXNOb2RlKSByZXR1cm47XG4gICAgaWYgKHByZXZpb3VzTm9kZS5pc0V4cGFuZGVkKSB7XG4gICAgICBwcmV2aW91c05vZGUudG9nZ2xlRXhwYW5kZWQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsZXQgbmV4dE5vZGUgPSBwcmV2aW91c05vZGUucmVhbFBhcmVudDtcbiAgICAgIGlmIChuZXh0Tm9kZSkgbmV4dE5vZGUuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBAYWN0aW9uIHNldEFjdGl2ZU5vZGUobm9kZSwgdmFsdWUsIG11bHRpID0gZmFsc2UpIHtcbiAgICBpZiAobXVsdGkpIHtcbiAgICAgIHRoaXMuX3NldEFjdGl2ZU5vZGVNdWx0aShub2RlLCB2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5fc2V0QWN0aXZlTm9kZVNpbmdsZShub2RlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBub2RlLmZvY3VzKHRoaXMub3B0aW9ucy5zY3JvbGxPbkFjdGl2YXRlKTtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5hY3RpdmF0ZSwgbm9kZSB9KTtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5ub2RlQWN0aXZhdGUsIG5vZGUgfSk7IC8vIEZvciBJRTExXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5kZWFjdGl2YXRlLCBub2RlIH0pO1xuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm5vZGVEZWFjdGl2YXRlLCBub2RlIH0pOyAvLyBGb3IgSUUxMVxuICAgIH1cbiAgfVxuXG4gIEBhY3Rpb24gc2V0U2VsZWN0ZWROb2RlKG5vZGUsIHZhbHVlKSB7XG4gICAgdGhpcy5zZWxlY3RlZExlYWZOb2RlSWRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zZWxlY3RlZExlYWZOb2RlSWRzLCB7W25vZGUuaWRdOiB2YWx1ZX0pO1xuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBub2RlLmZvY3VzKCk7XG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMuc2VsZWN0LCBub2RlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMuZGVzZWxlY3QsIG5vZGUgfSk7XG4gICAgfVxuICB9XG5cbiAgQGFjdGlvbiBzZXRFeHBhbmRlZE5vZGUobm9kZSwgdmFsdWUpIHtcbiAgICB0aGlzLmV4cGFuZGVkTm9kZUlkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZXhwYW5kZWROb2RlSWRzLCB7W25vZGUuaWRdOiB2YWx1ZX0pO1xuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy50b2dnbGVFeHBhbmRlZCwgbm9kZSwgaXNFeHBhbmRlZDogdmFsdWUgfSk7XG4gIH1cblxuICBAYWN0aW9uIGV4cGFuZEFsbCgpIHtcbiAgICB0aGlzLnJvb3RzLmZvckVhY2goKHJvb3QpID0+IHJvb3QuZXhwYW5kQWxsKCkpO1xuICB9XG5cbiAgQGFjdGlvbiBjb2xsYXBzZUFsbCgpIHtcbiAgICB0aGlzLnJvb3RzLmZvckVhY2goKHJvb3QpID0+IHJvb3QuY29sbGFwc2VBbGwoKSk7XG4gIH1cblxuICBAYWN0aW9uIHNldElzSGlkZGVuKG5vZGUsIHZhbHVlKSB7XG4gICAgdGhpcy5oaWRkZW5Ob2RlSWRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5oaWRkZW5Ob2RlSWRzLCB7W25vZGUuaWRdOiB2YWx1ZX0pO1xuICB9XG5cbiAgQGFjdGlvbiBzZXRIaWRkZW5Ob2RlSWRzKG5vZGVJZHMpIHtcbiAgICB0aGlzLmhpZGRlbk5vZGVJZHMgPSBub2RlSWRzLnJlZHVjZSgoaGlkZGVuTm9kZUlkcywgaWQpID0+IE9iamVjdC5hc3NpZ24oaGlkZGVuTm9kZUlkcywge1xuICAgICAgW2lkXTogdHJ1ZVxuICAgIH0pLCB7fSk7XG4gIH1cblxuICBwZXJmb3JtS2V5QWN0aW9uKG5vZGUsICRldmVudCkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMub3B0aW9ucy5hY3Rpb25NYXBwaW5nLmtleXNbJGV2ZW50LmtleUNvZGVdO1xuICAgIGlmIChhY3Rpb24pIHtcbiAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgYWN0aW9uKHRoaXMsIG5vZGUsICRldmVudCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIEBhY3Rpb24gZmlsdGVyTm9kZXMoZmlsdGVyLCBhdXRvU2hvdyA9IHRydWUpIHtcbiAgICBsZXQgZmlsdGVyRm47XG5cbiAgICBpZiAoIWZpbHRlcikge1xuICAgICAgcmV0dXJuIHRoaXMuY2xlYXJGaWx0ZXIoKTtcbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0IGZ1bmN0aW9uIGFuZCBzdHJpbmcgZmlsdGVyXG4gICAgaWYgKGlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICAgIGZpbHRlckZuID0gKG5vZGUpID0+IG5vZGUuZGlzcGxheUZpZWxkLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIudG9Mb3dlckNhc2UoKSkgIT09IC0xO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0Z1bmN0aW9uKGZpbHRlcikpIHtcbiAgICAgICBmaWx0ZXJGbiA9IGZpbHRlcjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdEb25cXCd0IGtub3cgd2hhdCB0byBkbyB3aXRoIGZpbHRlcicsIGZpbHRlcik7XG4gICAgICBjb25zb2xlLmVycm9yKCdTaG91bGQgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGZ1bmN0aW9uJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaWRzID0ge307XG4gICAgdGhpcy5yb290cy5mb3JFYWNoKChub2RlKSA9PiB0aGlzLl9maWx0ZXJOb2RlKGlkcywgbm9kZSwgZmlsdGVyRm4sIGF1dG9TaG93KSk7XG4gICAgdGhpcy5oaWRkZW5Ob2RlSWRzID0gaWRzO1xuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5jaGFuZ2VGaWx0ZXIgfSk7XG4gIH1cblxuICBAYWN0aW9uIGNsZWFyRmlsdGVyKCkge1xuICAgIHRoaXMuaGlkZGVuTm9kZUlkcyA9IHt9O1xuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5jaGFuZ2VGaWx0ZXIgfSk7XG4gIH1cblxuICBAYWN0aW9uIG1vdmVOb2RlKG5vZGUsIHRvKSB7XG4gICAgY29uc3QgZnJvbUluZGV4ID0gbm9kZS5nZXRJbmRleEluUGFyZW50KCk7XG4gICAgY29uc3QgZnJvbVBhcmVudCA9IG5vZGUucGFyZW50O1xuXG4gICAgaWYgKCF0aGlzLmNhbk1vdmVOb2RlKG5vZGUsIHRvLCBmcm9tSW5kZXgpKSByZXR1cm47XG5cbiAgICBjb25zdCBmcm9tQ2hpbGRyZW4gPSBmcm9tUGFyZW50LmdldEZpZWxkKCdjaGlsZHJlbicpO1xuXG4gICAgLy8gSWYgbm9kZSBkb2Vzbid0IGhhdmUgY2hpbGRyZW4gLSBjcmVhdGUgY2hpbGRyZW4gYXJyYXlcbiAgICBpZiAoIXRvLnBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKSkge1xuICAgICAgdG8ucGFyZW50LnNldEZpZWxkKCdjaGlsZHJlbicsIFtdKTtcbiAgICB9XG4gICAgY29uc3QgdG9DaGlsZHJlbiA9IHRvLnBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKTtcblxuICAgIGNvbnN0IG9yaWdpbmFsTm9kZSA9IGZyb21DaGlsZHJlbi5zcGxpY2UoZnJvbUluZGV4LCAxKVswXTtcblxuICAgIC8vIENvbXBlbnNhdGUgZm9yIGluZGV4IGlmIGFscmVhZHkgcmVtb3ZlZCBmcm9tIHBhcmVudDpcbiAgICBsZXQgdG9JbmRleCA9IChmcm9tUGFyZW50ID09PSB0by5wYXJlbnQgJiYgdG8uaW5kZXggPiBmcm9tSW5kZXgpID8gdG8uaW5kZXggLSAxIDogdG8uaW5kZXg7XG5cbiAgICB0b0NoaWxkcmVuLnNwbGljZSh0b0luZGV4LCAwLCBvcmlnaW5hbE5vZGUpO1xuXG4gICAgZnJvbVBhcmVudC50cmVlTW9kZWwudXBkYXRlKCk7XG4gICAgaWYgKHRvLnBhcmVudC50cmVlTW9kZWwgIT09IGZyb21QYXJlbnQudHJlZU1vZGVsKSB7XG4gICAgICB0by5wYXJlbnQudHJlZU1vZGVsLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHRoaXMuZmlyZUV2ZW50KHtcbiAgICAgIGV2ZW50TmFtZTogVFJFRV9FVkVOVFMubW92ZU5vZGUsXG4gICAgICBub2RlOiBvcmlnaW5hbE5vZGUsXG4gICAgICB0bzogeyBwYXJlbnQ6IHRvLnBhcmVudC5kYXRhLCBpbmRleDogdG9JbmRleCB9LFxuICAgICAgZnJvbTogeyBwYXJlbnQ6IGZyb21QYXJlbnQuZGF0YSwgaW5kZXg6IGZyb21JbmRleH1cbiAgICB9KTtcbiAgfVxuXG4gIEBhY3Rpb24gY29weU5vZGUobm9kZSwgdG8pIHtcbiAgICBjb25zdCBmcm9tSW5kZXggPSBub2RlLmdldEluZGV4SW5QYXJlbnQoKTtcblxuICAgIGlmICghdGhpcy5jYW5Nb3ZlTm9kZShub2RlLCB0bywgZnJvbUluZGV4KSkgcmV0dXJuO1xuXG4gICAgLy8gSWYgbm9kZSBkb2Vzbid0IGhhdmUgY2hpbGRyZW4gLSBjcmVhdGUgY2hpbGRyZW4gYXJyYXlcbiAgICBpZiAoIXRvLnBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKSkge1xuICAgICAgdG8ucGFyZW50LnNldEZpZWxkKCdjaGlsZHJlbicsIFtdKTtcbiAgICB9XG4gICAgY29uc3QgdG9DaGlsZHJlbiA9IHRvLnBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKTtcblxuICAgIGNvbnN0IG5vZGVDb3B5ID0gdGhpcy5vcHRpb25zLmdldE5vZGVDbG9uZShub2RlKTtcblxuICAgIHRvQ2hpbGRyZW4uc3BsaWNlKHRvLmluZGV4LCAwLCBub2RlQ29weSk7XG5cbiAgICBub2RlLnRyZWVNb2RlbC51cGRhdGUoKTtcbiAgICBpZiAodG8ucGFyZW50LnRyZWVNb2RlbCAhPT0gbm9kZS50cmVlTW9kZWwpIHtcbiAgICAgIHRvLnBhcmVudC50cmVlTW9kZWwudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmNvcHlOb2RlLCBub2RlOiBub2RlQ29weSwgdG86IHsgcGFyZW50OiB0by5wYXJlbnQuZGF0YSwgaW5kZXg6IHRvLmluZGV4IH0gfSk7XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXhwYW5kZWROb2RlSWRzOiB0aGlzLmV4cGFuZGVkTm9kZUlkcyxcbiAgICAgIHNlbGVjdGVkTGVhZk5vZGVJZHM6IHRoaXMuc2VsZWN0ZWRMZWFmTm9kZUlkcyxcbiAgICAgIGFjdGl2ZU5vZGVJZHM6IHRoaXMuYWN0aXZlTm9kZUlkcyxcbiAgICAgIGhpZGRlbk5vZGVJZHM6IHRoaXMuaGlkZGVuTm9kZUlkcyxcbiAgICAgIGZvY3VzZWROb2RlSWQ6IHRoaXMuZm9jdXNlZE5vZGVJZFxuICAgIH07XG4gIH1cblxuICBAYWN0aW9uIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKCFzdGF0ZSkgcmV0dXJuO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgICBleHBhbmRlZE5vZGVJZHM6IHN0YXRlLmV4cGFuZGVkTm9kZUlkcyB8fCB7fSxcbiAgICAgIHNlbGVjdGVkTGVhZk5vZGVJZHM6IHN0YXRlLnNlbGVjdGVkTGVhZk5vZGVJZHMgfHwge30sXG4gICAgICBhY3RpdmVOb2RlSWRzOiBzdGF0ZS5hY3RpdmVOb2RlSWRzIHx8IHt9LFxuICAgICAgaGlkZGVuTm9kZUlkczogc3RhdGUuaGlkZGVuTm9kZUlkcyB8fCB7fSxcbiAgICAgIGZvY3VzZWROb2RlSWQ6IHN0YXRlLmZvY3VzZWROb2RlSWRcbiAgICB9KTtcbiAgfVxuXG4gIHN1YnNjcmliZVRvU3RhdGUoZm4pIHtcbiAgICBhdXRvcnVuKCgpID0+IGZuKHRoaXMuZ2V0U3RhdGUoKSkpO1xuICB9XG5cbiAgY2FuTW92ZU5vZGUobm9kZSwgdG8sIGZyb21JbmRleCA9IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGZyb21Ob2RlSW5kZXggPSBmcm9tSW5kZXggfHwgbm9kZS5nZXRJbmRleEluUGFyZW50KCk7XG5cbiAgICAvLyBzYW1lIG5vZGU6XG4gICAgaWYgKG5vZGUucGFyZW50ID09PSB0by5wYXJlbnQgJiYgZnJvbUluZGV4ID09PSB0by5pbmRleCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhdG8ucGFyZW50LmlzRGVzY2VuZGFudE9mKG5vZGUpO1xuICB9XG5cbiAgY2FsY3VsYXRlRXhwYW5kZWROb2RlcygpIHtcbiAgICAgIHRoaXMuX2NhbGN1bGF0ZUV4cGFuZGVkTm9kZXMoKTtcbiAgfVxuXG4gIC8vIHByaXZhdGUgbWV0aG9kc1xuICBwcml2YXRlIF9maWx0ZXJOb2RlKGlkcywgbm9kZSwgZmlsdGVyRm4sIGF1dG9TaG93KSB7XG4gICAgLy8gaWYgbm9kZSBwYXNzZXMgZnVuY3Rpb24gdGhlbiBpdCdzIHZpc2libGVcbiAgICBsZXQgaXNWaXNpYmxlID0gZmlsdGVyRm4obm9kZSk7XG5cbiAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgLy8gaWYgb25lIG9mIG5vZGUncyBjaGlsZHJlbiBwYXNzZXMgZmlsdGVyIHRoZW4gdGhpcyBub2RlIGlzIGFsc28gdmlzaWJsZVxuICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fZmlsdGVyTm9kZShpZHMsIGNoaWxkLCBmaWx0ZXJGbiwgYXV0b1Nob3cpKSB7XG4gICAgICAgICAgaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gbWFyayBub2RlIGFzIGhpZGRlblxuICAgIGlmICghaXNWaXNpYmxlKSB7XG4gICAgICBpZHNbbm9kZS5pZF0gPSB0cnVlO1xuICAgIH1cbiAgICAvLyBhdXRvIGV4cGFuZCBwYXJlbnRzIHRvIG1ha2Ugc3VyZSB0aGUgZmlsdGVyZWQgbm9kZXMgYXJlIHZpc2libGVcbiAgICBpZiAoYXV0b1Nob3cgJiYgaXNWaXNpYmxlKSB7XG4gICAgICBub2RlLmVuc3VyZVZpc2libGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIGlzVmlzaWJsZTtcbiAgfVxuXG4gIHByaXZhdGUgX2NhbGN1bGF0ZUV4cGFuZGVkTm9kZXMoc3RhcnROb2RlID0gbnVsbCkge1xuICAgIHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZSB8fCB0aGlzLnZpcnR1YWxSb290O1xuXG4gICAgaWYgKHN0YXJ0Tm9kZS5kYXRhW3RoaXMub3B0aW9ucy5pc0V4cGFuZGVkRmllbGRdKSB7XG4gICAgICB0aGlzLmV4cGFuZGVkTm9kZUlkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZXhwYW5kZWROb2RlSWRzLCB7W3N0YXJ0Tm9kZS5pZF06IHRydWV9KTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0Tm9kZS5jaGlsZHJlbikge1xuICAgICAgc3RhcnROb2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB0aGlzLl9jYWxjdWxhdGVFeHBhbmRlZE5vZGVzKGNoaWxkKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0QWN0aXZlTm9kZVNpbmdsZShub2RlLCB2YWx1ZSkge1xuICAgIC8vIERlYWN0aXZhdGUgYWxsIG90aGVyIG5vZGVzOlxuICAgIHRoaXMuYWN0aXZlTm9kZXNcbiAgICAgIC5maWx0ZXIoKGFjdGl2ZU5vZGUpID0+IGFjdGl2ZU5vZGUgIT09IG5vZGUpXG4gICAgICAuZm9yRWFjaCgoYWN0aXZlTm9kZSkgPT4ge1xuICAgICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMuZGVhY3RpdmF0ZSwgbm9kZTogYWN0aXZlTm9kZSB9KTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm5vZGVEZWFjdGl2YXRlLCBub2RlOiBhY3RpdmVOb2RlIH0pOyAvLyBGb3IgSUUxMVxuICAgICAgfSk7XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuYWN0aXZlTm9kZUlkcyA9IHtbbm9kZS5pZF06IHRydWV9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlTm9kZUlkcyA9IHt9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldEFjdGl2ZU5vZGVNdWx0aShub2RlLCB2YWx1ZSkge1xuICAgIHRoaXMuYWN0aXZlTm9kZUlkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYWN0aXZlTm9kZUlkcywge1tub2RlLmlkXTogdmFsdWV9KTtcbiAgfVxuXG59XG4iXX0=

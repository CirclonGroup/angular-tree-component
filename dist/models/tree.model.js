"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var tree_node_model_1 = require("./tree-node.model");
var tree_options_model_1 = require("./tree-options.model");
var events_1 = require("../constants/events");
var deprecated_1 = require("../deprecated");
var lodash_1 = require("lodash");
var TreeModel = TreeModel_1 = (function () {
    function TreeModel() {
        this.options = new tree_options_model_1.TreeOptions();
        this.expandedNodeIds = {};
        this.activeNodeIds = {};
        this._focusedNode = null;
        this.focusedNodeId = null;
        this.firstUpdate = true;
        this.eventNames = Object.keys(events_1.TREE_EVENTS);
    }
    TreeModel.prototype.setData = function (_a) {
        var nodes = _a.nodes, _b = _a.options, options = _b === void 0 ? null : _b, _c = _a.events, events = _c === void 0 ? null : _c;
        if (options) {
            this.options = new tree_options_model_1.TreeOptions(options);
        }
        if (events) {
            this.events = events;
        }
        if (nodes) {
            this.nodes = nodes;
        }
        this.update();
    };
    TreeModel.prototype.update = function () {
        // Rebuild tree:
        var virtualRootConfig = (_a = {
                virtual: true
            },
            _a[this.options.childrenField] = this.nodes,
            _a);
        this.virtualRoot = this.getTreeNode(virtualRootConfig, null);
        this.roots = this.virtualRoot.children;
        this._initTreeNodeContentComponent();
        this._initLoadingComponent();
        this._loadState();
        // Fire event:
        if (this.firstUpdate) {
            if (this.roots) {
                this.fireEvent({ eventName: events_1.TREE_EVENTS.onInitialized });
                this.firstUpdate = false;
                this._calculateExpandedNodes();
            }
        }
        else {
            this.fireEvent({ eventName: events_1.TREE_EVENTS.onUpdateData });
        }
        var _a;
    };
    TreeModel.prototype._calculateExpandedNodes = function (startNode) {
        var _this = this;
        if (startNode === void 0) { startNode = null; }
        startNode = startNode || this.virtualRoot;
        if (startNode.data[this.options.isExpandedField]) {
            this.expandedNodeIds[startNode.id] = true;
        }
        if (startNode.children) {
            startNode.children.forEach(function (child) { return _this._calculateExpandedNodes(child); });
        }
    };
    TreeModel.prototype.fireEvent = function (event) {
        this.events[event.eventName].emit(event);
        this.events.onEvent.emit(event);
    };
    Object.defineProperty(TreeModel.prototype, "focusedNode", {
        get: function () { deprecated_1.deprecated('focusedNode attribute', 'getFocusedNode'); return this.getFocusedNode(); },
        set: function (value) { deprecated_1.deprecated('focusedNode = ', 'setFocusedNode'); this.setFocusedNode(value); },
        enumerable: true,
        configurable: true
    });
    ;
    TreeModel.prototype.getFocusedNode = function () {
        return this._focusedNode;
    };
    TreeModel.prototype.setFocusedNode = function (node) {
        this._focusedNode = node;
        this.focusedNodeId = node ? node.id : null;
    };
    TreeModel.prototype.getActiveNode = function () {
        return this.activeNodes[0];
    };
    TreeModel.prototype.getActiveNodes = function () {
        return this.activeNodes;
    };
    TreeModel.prototype.getTreeNode = function (node, parent) {
        return new tree_node_model_1.TreeNode(node, parent, this);
    };
    TreeModel.prototype.getVisibleRoots = function () {
        return this.virtualRoot.getVisibleChildren();
    };
    TreeModel.prototype.getFirstRoot = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return lodash_1.first(skipHidden ? this.getVisibleRoots() : this.roots);
    };
    TreeModel.prototype.getLastRoot = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return lodash_1.last(skipHidden ? this.getVisibleRoots() : this.roots);
    };
    Object.defineProperty(TreeModel.prototype, "isFocused", {
        get: function () {
            return TreeModel_1.focusedTree === this;
        },
        enumerable: true,
        configurable: true
    });
    TreeModel.prototype.isNodeFocused = function (node) {
        return this._focusedNode === node;
    };
    TreeModel.prototype.setFocus = function (value) {
        TreeModel_1.focusedTree = value ? this : null;
    };
    TreeModel.prototype.isEmptyTree = function () {
        return this.roots && this.roots.length === 0;
    };
    Object.defineProperty(TreeModel.prototype, "treeNodeContentComponent", {
        get: function () { return this._treeNodeContentComponent; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeModel.prototype, "loadingComponent", {
        get: function () { return this._loadingComponent; },
        enumerable: true,
        configurable: true
    });
    ;
    // if treeNodeTemplate is a component - use it,
    // otherwise - it's a template, so wrap it with an AdHoc component
    TreeModel.prototype._initTreeNodeContentComponent = function () {
        this._treeNodeContentComponent = this.options.treeNodeTemplate;
        if (typeof this._treeNodeContentComponent === 'string') {
            this._treeNodeContentComponent = this._createAdHocComponent(this._treeNodeContentComponent);
        }
    };
    // same for loading component
    TreeModel.prototype._initLoadingComponent = function () {
        this._loadingComponent = this.options.loadingComponent;
        if (typeof this._loadingComponent === 'string') {
            this._loadingComponent = this._createAdHocComponent(this._loadingComponent);
        }
    };
    TreeModel.prototype._loadState = function () {
        var _this = this;
        if (this.focusedNodeId) {
            this._focusedNode = this.getNodeById(this.focusedNodeId);
        }
        this.expandedNodes = Object.keys(this.expandedNodeIds)
            .filter(function (id) { return _this.expandedNodeIds[id]; })
            .map(function (id) { return _this.getNodeById(id); });
        this.expandedNodes = lodash_1.compact(this.expandedNodes);
        this.activeNodes = Object.keys(this.activeNodeIds)
            .filter(function (id) { return _this.expandedNodeIds[id]; })
            .map(function (id) { return _this.getNodeById(id); });
        this.activeNodes = lodash_1.compact(this.activeNodes);
    };
    TreeModel.prototype.getNodeByPath = function (path, startNode) {
        if (startNode === void 0) { startNode = null; }
        if (!path)
            return null;
        startNode = startNode || this.virtualRoot;
        if (path.length === 0)
            return startNode;
        if (!startNode.children)
            return null;
        var childId = path.shift();
        var childNode = lodash_1.find(startNode.children, (_a = {}, _a[this.options.idField] = childId, _a));
        if (!childNode)
            return null;
        return this.getNodeByPath(path, childNode);
        var _a;
    };
    TreeModel.prototype.getNodeById = function (id) {
        return this.getNodeBy({ id: id });
    };
    TreeModel.prototype.getNodeBy = function (predicate, startNode) {
        if (startNode === void 0) { startNode = null; }
        startNode = startNode || this.virtualRoot;
        if (!startNode.children)
            return null;
        var found = lodash_1.find(startNode.children, predicate);
        if (found) {
            return found;
        }
        else {
            for (var _i = 0, _a = startNode.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var found_1 = this.getNodeBy(predicate, child);
                if (found_1)
                    return found_1;
            }
        }
    };
    TreeModel.prototype._createAdHocComponent = function (templateStr) {
        var AdHocTreeNodeTemplateComponent = (function () {
            function AdHocTreeNodeTemplateComponent() {
            }
            return AdHocTreeNodeTemplateComponent;
        }());
        __decorate([
            core_1.Input(),
            __metadata("design:type", tree_node_model_1.TreeNode)
        ], AdHocTreeNodeTemplateComponent.prototype, "node", void 0);
        AdHocTreeNodeTemplateComponent = __decorate([
            core_1.Component({
                selector: 'TreeNodeTemplate',
                template: templateStr
            })
        ], AdHocTreeNodeTemplateComponent);
        return AdHocTreeNodeTemplateComponent;
    };
    TreeModel.prototype.focusNextNode = function () {
        var previousNode = this.getFocusedNode();
        var nextNode = previousNode ? previousNode.findNextNode(true, true) : this.getFirstRoot(true);
        nextNode && nextNode.focus();
    };
    TreeModel.prototype.focusPreviousNode = function () {
        var previousNode = this.getFocusedNode();
        var nextNode = previousNode ? previousNode.findPreviousNode(true) : this.getLastRoot(true);
        nextNode && nextNode.focus();
    };
    TreeModel.prototype.focusDrillDown = function () {
        var previousNode = this.getFocusedNode();
        if (previousNode && previousNode.isCollapsed && previousNode.hasChildren) {
            previousNode.toggleExpanded();
        }
        else {
            var nextNode = previousNode ? previousNode.getFirstChild(true) : this.getFirstRoot(true);
            nextNode && nextNode.focus();
        }
    };
    TreeModel.prototype.focusDrillUp = function () {
        var previousNode = this.getFocusedNode();
        if (!previousNode)
            return;
        if (previousNode.isExpanded) {
            previousNode.toggleExpanded();
        }
        else {
            var nextNode = previousNode.realParent;
            nextNode && nextNode.focus();
        }
    };
    TreeModel.prototype.isActive = function (node) {
        return this.activeNodeIds[node.id];
    };
    TreeModel.prototype.setActiveNode = function (node, value, multi) {
        if (multi === void 0) { multi = false; }
        if (value) {
            node.focus();
            this.fireEvent({ eventName: events_1.TREE_EVENTS.onActivate, node: node });
        }
        else {
            this.fireEvent({ eventName: events_1.TREE_EVENTS.onDeactivate, node: node });
        }
        if (multi) {
            this._setActiveNodeMulti(node, value);
        }
        else {
            this._setActiveNodeSingle(node, value);
        }
    };
    TreeModel.prototype._setActiveNodeSingle = function (node, value) {
        var _this = this;
        // Deactivate all other nodes:
        this.activeNodes
            .filter(function (activeNode) { return activeNode != node; })
            .forEach(function (activeNode) {
            _this.fireEvent({ eventName: events_1.TREE_EVENTS.onDeactivate, node: activeNode });
        });
        this.activeNodeIds = {};
        this.activeNodes = [];
        if (value) {
            this.activeNodes.push(node);
            this.activeNodeIds[node.id] = true;
        }
    };
    TreeModel.prototype._setActiveNodeMulti = function (node, value) {
        this.activeNodeIds[node.id] = value;
        if (value) {
            if (!lodash_1.includes(this.activeNodes, node)) {
                this.activeNodes.push(node);
            }
        }
        else {
            if (lodash_1.includes(this.activeNodes, node)) {
                lodash_1.remove(this.activeNodes, node);
            }
        }
    };
    TreeModel.prototype.isExpanded = function (node) {
        return this.expandedNodeIds[node.id];
    };
    TreeModel.prototype.setExpandedNode = function (node, value) {
        var index = lodash_1.indexOf(this.expandedNodes, node);
        if (value && !index)
            this.expandedNodes.push(node);
        else if (index)
            lodash_1.pullAt(this.expandedNodes, index);
        this.expandedNodeIds[node.id] = value;
    };
    TreeModel.prototype.performKeyAction = function (node, $event) {
        var action = this.options.actionMapping.keys[$event.keyCode];
        if (action) {
            $event.preventDefault();
            action(this, node, $event);
            return true;
        }
        else {
            return false;
        }
    };
    TreeModel.prototype.filterNodes = function (filter, autoShow) {
        if (autoShow === void 0) { autoShow = false; }
        var filterFn;
        if (!filter) {
            return this.clearFilter();
        }
        if (lodash_1.isString(filter)) {
            filterFn = function (node) { return node.displayField.toLowerCase().indexOf(filter.toLowerCase()) != -1; };
        }
        else if (lodash_1.isFunction(filter)) {
            filterFn = filter;
        }
        else {
            console.error('Don\'t know what to do with filter', filter);
            console.error('Should be either a string or function', filter);
        }
        this.roots.forEach(function (node) { return node.filter(filterFn, autoShow); });
    };
    TreeModel.prototype.clearFilter = function () {
        this.roots.forEach(function (node) { return node.clearFilter(); });
    };
    TreeModel.prototype._canMoveNode = function (node, fromIndex, to) {
        // same node:
        if (node.parent === to.parent && fromIndex === to.index) {
            return false;
        }
        return !to.parent.isDescendantOf(node);
    };
    TreeModel.prototype.moveNode = function (node, to) {
        var fromIndex = node.getIndexInParent();
        var fromParent = node.parent;
        if (!this._canMoveNode(node, fromIndex, to))
            return;
        var fromChildren = fromParent.getField('children');
        // If node doesn't have children - create children array
        if (!to.parent.getField('children')) {
            to.parent.setField('children', []);
        }
        var toChildren = to.parent.getField('children');
        var originalNode = fromChildren.splice(fromIndex, 1)[0];
        // Compensate for index if already removed from parent:
        var toIndex = (fromParent === to.parent && to.index > fromIndex) ? to.index - 1 : to.index;
        toChildren.splice(toIndex, 0, originalNode);
        fromParent.treeModel.update();
        if (to.parent.treeModel !== fromParent.treeModel) {
            to.parent.treeModel.update();
        }
        this.fireEvent({ eventName: events_1.TREE_EVENTS.onMoveNode, node: originalNode, to: { parent: to.parent.data, index: toIndex } });
    };
    return TreeModel;
}());
TreeModel.focusedTree = null;
TreeModel = TreeModel_1 = __decorate([
    core_1.Injectable()
], TreeModel);
exports.TreeModel = TreeModel;
var TreeModel_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvdHJlZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQXdGO0FBQ3hGLHFEQUE2QztBQUM3QywyREFBbUQ7QUFFbkQsOENBQWtEO0FBRWxELDRDQUEyQztBQUUzQyxpQ0FBNkc7QUFHN0csSUFBYSxTQUFTO0lBRHRCO1FBR0UsWUFBTyxHQUFnQixJQUFJLGdDQUFXLEVBQUUsQ0FBQztRQUV6QyxvQkFBZSxHQUE2QixFQUFFLENBQUM7UUFFL0Msa0JBQWEsR0FBNkIsRUFBRSxDQUFDO1FBRTdDLGlCQUFZLEdBQWEsSUFBSSxDQUFDO1FBQzlCLGtCQUFhLEdBQVcsSUFBSSxDQUFDO1FBSTdCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRW5CLGVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFXLENBQUMsQ0FBQztJQWdYeEMsQ0FBQztJQTlXQywyQkFBTyxHQUFQLFVBQVEsRUFBMkU7WUFBekUsZ0JBQUssRUFBRSxlQUFjLEVBQWQsbUNBQWMsRUFBRSxjQUFhLEVBQWIsa0NBQWE7UUFDNUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxnQ0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDO1FBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwwQkFBTSxHQUFOO1FBQ0UsZ0JBQWdCO1FBQ2hCLElBQUksaUJBQWlCO2dCQUNuQixPQUFPLEVBQUUsSUFBSTs7WUFDYixHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFHLElBQUksQ0FBQyxLQUFLO2VBQ3pDLENBQUM7UUFFRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFN0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUV2QyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFbEIsY0FBYztRQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsb0JBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDekIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDakMsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsb0JBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQzFELENBQUM7O0lBQ0gsQ0FBQztJQUVELDJDQUF1QixHQUF2QixVQUF3QixTQUFnQjtRQUF4QyxpQkFTQztRQVR1QiwwQkFBQSxFQUFBLGdCQUFnQjtRQUN0QyxTQUFTLEdBQUcsU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFMUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDNUMsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7UUFDN0UsQ0FBQztJQUNILENBQUM7SUFFRCw2QkFBUyxHQUFULFVBQVUsS0FBSztRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELHNCQUFJLGtDQUFXO2FBQWYsY0FBb0IsdUJBQVUsQ0FBQyx1QkFBdUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDMUcsVUFBZ0IsS0FBSyxJQUFJLHVCQUFVLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFDOzs7T0FESztJQUNMLENBQUM7SUFFdEcsa0NBQWMsR0FBZDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRCxrQ0FBYyxHQUFkLFVBQWUsSUFBSTtRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztJQUM3QyxDQUFDO0lBRUQsaUNBQWEsR0FBYjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxrQ0FBYyxHQUFkO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVELCtCQUFXLEdBQVgsVUFBWSxJQUFRLEVBQUUsTUFBZTtRQUNuQyxNQUFNLENBQUMsSUFBSSwwQkFBUSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELG1DQUFlLEdBQWY7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxnQ0FBWSxHQUFaLFVBQWEsVUFBa0I7UUFBbEIsMkJBQUEsRUFBQSxrQkFBa0I7UUFDN0IsTUFBTSxDQUFDLGNBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsK0JBQVcsR0FBWCxVQUFZLFVBQWtCO1FBQWxCLDJCQUFBLEVBQUEsa0JBQWtCO1FBQzVCLE1BQU0sQ0FBQyxhQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELHNCQUFJLGdDQUFTO2FBQWI7WUFDRSxNQUFNLENBQUMsV0FBUyxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFFRCxpQ0FBYSxHQUFiLFVBQWMsSUFBSTtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUVELDRCQUFRLEdBQVIsVUFBUyxLQUFLO1FBQ1osV0FBUyxDQUFDLFdBQVcsR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztJQUM5QyxDQUFDO0lBRUQsK0JBQVcsR0FBWDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBR0Qsc0JBQUksK0NBQXdCO2FBQTVCLGNBQWlDLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUEsQ0FBQyxDQUFDOzs7T0FBQTtJQUFBLENBQUM7SUFHekUsc0JBQUksdUNBQWdCO2FBQXBCLGNBQXlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUEsQ0FBQyxDQUFDOzs7T0FBQTtJQUFBLENBQUM7SUFFekQsK0NBQStDO0lBQy9DLGtFQUFrRTtJQUNsRSxpREFBNkIsR0FBN0I7UUFDRSxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyx5QkFBeUIsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDOUYsQ0FBQztJQUNILENBQUM7SUFFRCw2QkFBNkI7SUFDN0IseUNBQXFCLEdBQXJCO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlFLENBQUM7SUFDSCxDQUFDO0lBRUQsOEJBQVUsR0FBVjtRQUFBLGlCQWNDO1FBYkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDbkQsTUFBTSxDQUFDLFVBQUMsRUFBRSxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQzthQUN4QyxHQUFHLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQUE7UUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzthQUMvQyxNQUFNLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxFQUF4QixDQUF3QixDQUFDO2FBQ3hDLEdBQUcsQ0FBQyxVQUFDLEVBQUUsSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQTtRQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLGdCQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxpQ0FBYSxHQUFiLFVBQWMsSUFBSSxFQUFFLFNBQWM7UUFBZCwwQkFBQSxFQUFBLGdCQUFjO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUV2QixTQUFTLEdBQUcsU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBRXhDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFckMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLElBQU0sU0FBUyxHQUFHLGFBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxZQUFJLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUcsT0FBTyxNQUFHLENBQUM7UUFFaEYsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBRTVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQTs7SUFDNUMsQ0FBQztJQUVELCtCQUFXLEdBQVgsVUFBWSxFQUFFO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLElBQUEsRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELDZCQUFTLEdBQVQsVUFBVSxTQUFTLEVBQUUsU0FBZ0I7UUFBaEIsMEJBQUEsRUFBQSxnQkFBZ0I7UUFDbkMsU0FBUyxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRTFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFckMsSUFBTSxLQUFLLEdBQUcsYUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixHQUFHLENBQUMsQ0FBYyxVQUFrQixFQUFsQixLQUFBLFNBQVMsQ0FBQyxRQUFRLEVBQWxCLGNBQWtCLEVBQWxCLElBQWtCO2dCQUEvQixJQUFJLEtBQUssU0FBQTtnQkFDWixJQUFNLE9BQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDL0MsRUFBRSxDQUFDLENBQUMsT0FBSyxDQUFDO29CQUFDLE1BQU0sQ0FBQyxPQUFLLENBQUM7YUFDekI7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELHlDQUFxQixHQUFyQixVQUFzQixXQUFXO1FBSy9CLElBQU0sOEJBQThCO1lBQXBDO1lBRUEsQ0FBQztZQUFELHFDQUFDO1FBQUQsQ0FBQyxBQUZELElBRUM7UUFEWTtZQUFSLFlBQUssRUFBRTtzQ0FBTywwQkFBUTtvRUFBQztRQUR0Qiw4QkFBOEI7WUFKbkMsZ0JBQVMsQ0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUUsV0FBVzthQUN4QixDQUFDO1dBQ0ksOEJBQThCLENBRW5DO1FBQ0QsTUFBTSxDQUFDLDhCQUE4QixDQUFDO0lBQ3hDLENBQUM7SUFFRCxpQ0FBYSxHQUFiO1FBQ0UsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLElBQUksUUFBUSxHQUFHLFlBQVksR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlGLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELHFDQUFpQixHQUFqQjtRQUNFLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxJQUFJLFFBQVEsR0FBRyxZQUFZLEdBQUcsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0YsUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsa0NBQWMsR0FBZDtRQUNFLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLFdBQVcsSUFBSSxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN6RSxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDaEMsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxRQUFRLEdBQUcsWUFBWSxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RixRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9CLENBQUM7SUFDSCxDQUFDO0lBRUQsZ0NBQVksR0FBWjtRQUNFLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM1QixZQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDaEMsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUN2QyxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9CLENBQUM7SUFDSCxDQUFDO0lBRUQsNEJBQVEsR0FBUixVQUFTLElBQUk7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELGlDQUFhLEdBQWIsVUFBYyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQWE7UUFBYixzQkFBQSxFQUFBLGFBQWE7UUFDdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsb0JBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsb0JBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDSCxDQUFDO0lBRUQsd0NBQW9CLEdBQXBCLFVBQXFCLElBQUksRUFBRSxLQUFLO1FBQWhDLGlCQWNDO1FBYkMsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxXQUFXO2FBQ2IsTUFBTSxDQUFDLFVBQUMsVUFBVSxJQUFLLE9BQUEsVUFBVSxJQUFJLElBQUksRUFBbEIsQ0FBa0IsQ0FBQzthQUMxQyxPQUFPLENBQUMsVUFBQyxVQUFVO1lBQ2xCLEtBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsb0JBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0lBRUQsdUNBQW1CLEdBQW5CLFVBQW9CLElBQUksRUFBRSxLQUFLO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNwQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsRUFBRSxDQUFDLENBQUMsQ0FBQyxpQkFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixDQUFDO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sRUFBRSxDQUFDLENBQUMsaUJBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsZUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsOEJBQVUsR0FBVixVQUFXLElBQUk7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELG1DQUFlLEdBQWYsVUFBZ0IsSUFBSSxFQUFFLEtBQUs7UUFDekIsSUFBTSxLQUFLLEdBQUcsZ0JBQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWhELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQztZQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFBQyxlQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDeEMsQ0FBQztJQUVELG9DQUFnQixHQUFoQixVQUFpQixJQUFJLEVBQUUsTUFBTTtRQUMzQixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzlELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDeEIsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQUVELCtCQUFXLEdBQVgsVUFBWSxNQUFNLEVBQUUsUUFBZ0I7UUFBaEIseUJBQUEsRUFBQSxnQkFBZ0I7UUFDbEMsSUFBSSxRQUFRLENBQUM7UUFFYixFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxpQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixRQUFRLEdBQUcsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBbkUsQ0FBbUUsQ0FBQTtRQUMxRixDQUFDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLG1CQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDckIsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM1RCxPQUFPLENBQUMsS0FBSyxDQUFDLHVDQUF1QyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELCtCQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTyxnQ0FBWSxHQUFwQixVQUFxQixJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUU7UUFDdEMsYUFBYTtRQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLE1BQU0sSUFBSSxTQUFTLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7UUFFRCxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsNEJBQVEsR0FBUixVQUFTLElBQUksRUFBRSxFQUFFO1FBQ2YsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDMUMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUUvQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRyxFQUFFLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUVyRCxJQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXJELHdEQUF3RDtRQUN4RCxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUNELElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWxELElBQU0sWUFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFELHVEQUF1RDtRQUN2RCxJQUFJLE9BQU8sR0FBRyxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUUzRixVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFNUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsS0FBSyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqRCxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQixDQUFDO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxvQkFBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVILENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUEvWEQsSUErWEM7QUFyWFEscUJBQVcsR0FBRyxJQUFJLENBQUM7QUFWZixTQUFTO0lBRHJCLGlCQUFVLEVBQUU7R0FDQSxTQUFTLENBK1hyQjtBQS9YWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIENvbXBvbmVudCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU9wdGlvbnMgfSBmcm9tICcuL3RyZWUtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQgeyBJVHJlZU1vZGVsIH0gZnJvbSAnLi4vZGVmcy9hcGknO1xuaW1wb3J0IHsgVFJFRV9FVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcblxuaW1wb3J0IHsgZGVwcmVjYXRlZCB9IGZyb20gJy4uL2RlcHJlY2F0ZWQnO1xuXG5pbXBvcnQgeyBmaXJzdCwgbGFzdCwgY29tcGFjdCwgZmluZCwgaW5jbHVkZXMsIHJlbW92ZSwgaW5kZXhPZiwgcHVsbEF0LCBpc1N0cmluZywgaXNGdW5jdGlvbiB9IGZyb20gJ2xvZGFzaCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmVlTW9kZWwgaW1wbGVtZW50cyBJVHJlZU1vZGVsIHtcbiAgcm9vdHM6IFRyZWVOb2RlW107XG4gIG9wdGlvbnM6IFRyZWVPcHRpb25zID0gbmV3IFRyZWVPcHRpb25zKCk7XG4gIG5vZGVzOiBhbnlbXTtcbiAgZXhwYW5kZWROb2RlSWRzOiB7IFtpZDpzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcbiAgZXhwYW5kZWROb2RlczogVHJlZU5vZGVbXTtcbiAgYWN0aXZlTm9kZUlkczogeyBbaWQ6c3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG4gIGFjdGl2ZU5vZGVzOiBUcmVlTm9kZVtdO1xuICBfZm9jdXNlZE5vZGU6IFRyZWVOb2RlID0gbnVsbDtcbiAgZm9jdXNlZE5vZGVJZDogc3RyaW5nID0gbnVsbDtcbiAgc3RhdGljIGZvY3VzZWRUcmVlID0gbnVsbDtcbiAgcHJpdmF0ZSBldmVudHM6IGFueTtcbiAgdmlydHVhbFJvb3Q6IFRyZWVOb2RlO1xuICBmaXJzdFVwZGF0ZSA9IHRydWU7XG5cbiAgZXZlbnROYW1lcyA9IE9iamVjdC5rZXlzKFRSRUVfRVZFTlRTKTtcblxuICBzZXREYXRhKHsgbm9kZXMsIG9wdGlvbnMgPSBudWxsLCBldmVudHMgPSBudWxsIH06e25vZGVzOmFueSxvcHRpb25zOmFueSxldmVudHM6YW55fSkge1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBuZXcgVHJlZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChldmVudHMpIHtcbiAgICAgIHRoaXMuZXZlbnRzID0gZXZlbnRzO1xuICAgIH1cbiAgICBpZiAobm9kZXMpIHtcbiAgICAgIHRoaXMubm9kZXMgPSBub2RlcztcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIC8vIFJlYnVpbGQgdHJlZTpcbiAgICBsZXQgdmlydHVhbFJvb3RDb25maWcgPSB7XG4gICAgICB2aXJ0dWFsOiB0cnVlLFxuICAgICAgW3RoaXMub3B0aW9ucy5jaGlsZHJlbkZpZWxkXTogdGhpcy5ub2Rlc1xuICAgIH07XG5cbiAgICB0aGlzLnZpcnR1YWxSb290ID0gdGhpcy5nZXRUcmVlTm9kZSh2aXJ0dWFsUm9vdENvbmZpZywgbnVsbCk7XG5cbiAgICB0aGlzLnJvb3RzID0gdGhpcy52aXJ0dWFsUm9vdC5jaGlsZHJlbjtcblxuICAgIHRoaXMuX2luaXRUcmVlTm9kZUNvbnRlbnRDb21wb25lbnQoKTtcbiAgICB0aGlzLl9pbml0TG9hZGluZ0NvbXBvbmVudCgpO1xuXG4gICAgdGhpcy5fbG9hZFN0YXRlKCk7XG5cbiAgICAvLyBGaXJlIGV2ZW50OlxuICAgIGlmICh0aGlzLmZpcnN0VXBkYXRlKSB7XG4gICAgICBpZiAodGhpcy5yb290cykge1xuICAgICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25Jbml0aWFsaXplZCB9KTtcbiAgICAgICAgdGhpcy5maXJzdFVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jYWxjdWxhdGVFeHBhbmRlZE5vZGVzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vblVwZGF0ZURhdGEgfSk7XG4gICAgfVxuICB9XG5cbiAgX2NhbGN1bGF0ZUV4cGFuZGVkTm9kZXMoc3RhcnROb2RlID0gbnVsbCkge1xuICAgIHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZSB8fCB0aGlzLnZpcnR1YWxSb290O1xuXG4gICAgaWYgKHN0YXJ0Tm9kZS5kYXRhW3RoaXMub3B0aW9ucy5pc0V4cGFuZGVkRmllbGRdKSB7XG4gICAgICB0aGlzLmV4cGFuZGVkTm9kZUlkc1tzdGFydE5vZGUuaWRdID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0Tm9kZS5jaGlsZHJlbikge1xuICAgICAgc3RhcnROb2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB0aGlzLl9jYWxjdWxhdGVFeHBhbmRlZE5vZGVzKGNoaWxkKSk7XG4gICAgfVxuICB9XG5cbiAgZmlyZUV2ZW50KGV2ZW50KSB7XG4gICAgdGhpcy5ldmVudHNbZXZlbnQuZXZlbnROYW1lXS5lbWl0KGV2ZW50KTtcbiAgICB0aGlzLmV2ZW50cy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgZ2V0IGZvY3VzZWROb2RlKCkgeyBkZXByZWNhdGVkKCdmb2N1c2VkTm9kZSBhdHRyaWJ1dGUnLCAnZ2V0Rm9jdXNlZE5vZGUnKTsgcmV0dXJuIHRoaXMuZ2V0Rm9jdXNlZE5vZGUoKTsgfVxuICBzZXQgZm9jdXNlZE5vZGUodmFsdWUpIHsgZGVwcmVjYXRlZCgnZm9jdXNlZE5vZGUgPSAnLCAnc2V0Rm9jdXNlZE5vZGUnKTsgdGhpcy5zZXRGb2N1c2VkTm9kZSh2YWx1ZSkgfTtcblxuICBnZXRGb2N1c2VkTm9kZSgpOlRyZWVOb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fZm9jdXNlZE5vZGU7XG4gIH1cblxuICBzZXRGb2N1c2VkTm9kZShub2RlKSB7XG4gICAgdGhpcy5fZm9jdXNlZE5vZGUgPSBub2RlO1xuICAgIHRoaXMuZm9jdXNlZE5vZGVJZCA9IG5vZGUgPyBub2RlLmlkIDogbnVsbDtcbiAgfVxuXG4gIGdldEFjdGl2ZU5vZGUoKTpUcmVlTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlTm9kZXNbMF07XG4gIH1cblxuICBnZXRBY3RpdmVOb2RlcygpOlRyZWVOb2RlW10ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZU5vZGVzO1xuICB9XG5cbiAgZ2V0VHJlZU5vZGUobm9kZTphbnksIHBhcmVudDpUcmVlTm9kZSk6VHJlZU5vZGUge1xuICAgIHJldHVybiBuZXcgVHJlZU5vZGUobm9kZSwgcGFyZW50LCB0aGlzKTtcbiAgfVxuXG4gIGdldFZpc2libGVSb290cygpIHtcbiAgICByZXR1cm4gdGhpcy52aXJ0dWFsUm9vdC5nZXRWaXNpYmxlQ2hpbGRyZW4oKTtcbiAgfVxuXG4gIGdldEZpcnN0Um9vdChza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICByZXR1cm4gZmlyc3Qoc2tpcEhpZGRlbiA/IHRoaXMuZ2V0VmlzaWJsZVJvb3RzKCkgOiB0aGlzLnJvb3RzKTtcbiAgfVxuXG4gIGdldExhc3RSb290KHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIHJldHVybiBsYXN0KHNraXBIaWRkZW4gPyB0aGlzLmdldFZpc2libGVSb290cygpIDogdGhpcy5yb290cyk7XG4gIH1cblxuICBnZXQgaXNGb2N1c2VkKCkge1xuICAgIHJldHVybiBUcmVlTW9kZWwuZm9jdXNlZFRyZWUgPT09IHRoaXM7XG4gIH1cblxuICBpc05vZGVGb2N1c2VkKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5fZm9jdXNlZE5vZGUgPT09IG5vZGU7XG4gIH1cblxuICBzZXRGb2N1cyh2YWx1ZSkge1xuICAgIFRyZWVNb2RlbC5mb2N1c2VkVHJlZSA9IHZhbHVlID8gdGhpcyA6IG51bGw7XG4gIH1cblxuICBpc0VtcHR5VHJlZSgpOmJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJvb3RzICYmIHRoaXMucm9vdHMubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJlZU5vZGVDb250ZW50Q29tcG9uZW50OmFueTtcbiAgZ2V0IHRyZWVOb2RlQ29udGVudENvbXBvbmVudCgpIHsgcmV0dXJuIHRoaXMuX3RyZWVOb2RlQ29udGVudENvbXBvbmVudCB9O1xuXG4gIHByaXZhdGUgX2xvYWRpbmdDb21wb25lbnQ6YW55O1xuICBnZXQgbG9hZGluZ0NvbXBvbmVudCgpIHsgcmV0dXJuIHRoaXMuX2xvYWRpbmdDb21wb25lbnQgfTtcblxuICAvLyBpZiB0cmVlTm9kZVRlbXBsYXRlIGlzIGEgY29tcG9uZW50IC0gdXNlIGl0LFxuICAvLyBvdGhlcndpc2UgLSBpdCdzIGEgdGVtcGxhdGUsIHNvIHdyYXAgaXQgd2l0aCBhbiBBZEhvYyBjb21wb25lbnRcbiAgX2luaXRUcmVlTm9kZUNvbnRlbnRDb21wb25lbnQoKSB7XG4gICAgdGhpcy5fdHJlZU5vZGVDb250ZW50Q29tcG9uZW50ID0gdGhpcy5vcHRpb25zLnRyZWVOb2RlVGVtcGxhdGU7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl90cmVlTm9kZUNvbnRlbnRDb21wb25lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl90cmVlTm9kZUNvbnRlbnRDb21wb25lbnQgPSB0aGlzLl9jcmVhdGVBZEhvY0NvbXBvbmVudCh0aGlzLl90cmVlTm9kZUNvbnRlbnRDb21wb25lbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNhbWUgZm9yIGxvYWRpbmcgY29tcG9uZW50XG4gIF9pbml0TG9hZGluZ0NvbXBvbmVudCgpIHtcbiAgICB0aGlzLl9sb2FkaW5nQ29tcG9uZW50ID0gdGhpcy5vcHRpb25zLmxvYWRpbmdDb21wb25lbnQ7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9sb2FkaW5nQ29tcG9uZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fbG9hZGluZ0NvbXBvbmVudCA9IHRoaXMuX2NyZWF0ZUFkSG9jQ29tcG9uZW50KHRoaXMuX2xvYWRpbmdDb21wb25lbnQpO1xuICAgIH1cbiAgfVxuXG4gIF9sb2FkU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuZm9jdXNlZE5vZGVJZCkge1xuICAgICAgdGhpcy5fZm9jdXNlZE5vZGUgPSB0aGlzLmdldE5vZGVCeUlkKHRoaXMuZm9jdXNlZE5vZGVJZCk7XG4gICAgfVxuXG4gICAgdGhpcy5leHBhbmRlZE5vZGVzID0gT2JqZWN0LmtleXModGhpcy5leHBhbmRlZE5vZGVJZHMpXG4gICAgICAuZmlsdGVyKChpZCkgPT4gdGhpcy5leHBhbmRlZE5vZGVJZHNbaWRdKVxuICAgICAgLm1hcCgoaWQpID0+IHRoaXMuZ2V0Tm9kZUJ5SWQoaWQpKVxuICAgIHRoaXMuZXhwYW5kZWROb2RlcyA9IGNvbXBhY3QodGhpcy5leHBhbmRlZE5vZGVzKTtcblxuICAgIHRoaXMuYWN0aXZlTm9kZXMgPSBPYmplY3Qua2V5cyh0aGlzLmFjdGl2ZU5vZGVJZHMpXG4gICAgICAuZmlsdGVyKChpZCkgPT4gdGhpcy5leHBhbmRlZE5vZGVJZHNbaWRdKVxuICAgICAgLm1hcCgoaWQpID0+IHRoaXMuZ2V0Tm9kZUJ5SWQoaWQpKVxuICAgIHRoaXMuYWN0aXZlTm9kZXMgPSBjb21wYWN0KHRoaXMuYWN0aXZlTm9kZXMpO1xuICB9XG5cbiAgZ2V0Tm9kZUJ5UGF0aChwYXRoLCBzdGFydE5vZGU9bnVsbCk6VHJlZU5vZGUge1xuICAgIGlmICghcGF0aCkgcmV0dXJuIG51bGw7XG5cbiAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUgfHwgdGhpcy52aXJ0dWFsUm9vdDtcbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHJldHVybiBzdGFydE5vZGU7XG5cbiAgICBpZiAoIXN0YXJ0Tm9kZS5jaGlsZHJlbikgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBjaGlsZElkID0gcGF0aC5zaGlmdCgpO1xuICAgIGNvbnN0IGNoaWxkTm9kZSA9IGZpbmQoc3RhcnROb2RlLmNoaWxkcmVuLCB7IFt0aGlzLm9wdGlvbnMuaWRGaWVsZF06IGNoaWxkSWQgfSk7XG5cbiAgICBpZiAoIWNoaWxkTm9kZSkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gdGhpcy5nZXROb2RlQnlQYXRoKHBhdGgsIGNoaWxkTm9kZSlcbiAgfVxuXG4gIGdldE5vZGVCeUlkKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUJ5KHsgaWQgfSk7XG4gIH1cblxuICBnZXROb2RlQnkocHJlZGljYXRlLCBzdGFydE5vZGUgPSBudWxsKSB7XG4gICAgc3RhcnROb2RlID0gc3RhcnROb2RlIHx8IHRoaXMudmlydHVhbFJvb3Q7XG5cbiAgICBpZiAoIXN0YXJ0Tm9kZS5jaGlsZHJlbikgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBmb3VuZCA9IGZpbmQoc3RhcnROb2RlLmNoaWxkcmVuLCBwcmVkaWNhdGUpO1xuXG4gICAgaWYgKGZvdW5kKSB7IC8vIGZvdW5kIGluIGNoaWxkcmVuXG4gICAgICByZXR1cm4gZm91bmQ7XG4gICAgfSBlbHNlIHsgLy8gbG9vayBpbiBjaGlsZHJlbidzIGNoaWxkcmVuXG4gICAgICBmb3IgKGxldCBjaGlsZCBvZiBzdGFydE5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgY29uc3QgZm91bmQgPSB0aGlzLmdldE5vZGVCeShwcmVkaWNhdGUsIGNoaWxkKTtcbiAgICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2NyZWF0ZUFkSG9jQ29tcG9uZW50KHRlbXBsYXRlU3RyKTogYW55IHtcbiAgICBAQ29tcG9uZW50KHtcbiAgICAgICAgc2VsZWN0b3I6ICdUcmVlTm9kZVRlbXBsYXRlJyxcbiAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlU3RyXG4gICAgfSlcbiAgICBjbGFzcyBBZEhvY1RyZWVOb2RlVGVtcGxhdGVDb21wb25lbnQge1xuICAgICAgICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIEFkSG9jVHJlZU5vZGVUZW1wbGF0ZUNvbXBvbmVudDtcbiAgfVxuXG4gIGZvY3VzTmV4dE5vZGUoKSB7XG4gICAgbGV0IHByZXZpb3VzTm9kZSA9IHRoaXMuZ2V0Rm9jdXNlZE5vZGUoKTtcbiAgICBsZXQgbmV4dE5vZGUgPSBwcmV2aW91c05vZGUgPyBwcmV2aW91c05vZGUuZmluZE5leHROb2RlKHRydWUsIHRydWUpIDogdGhpcy5nZXRGaXJzdFJvb3QodHJ1ZSk7XG4gICAgbmV4dE5vZGUgJiYgbmV4dE5vZGUuZm9jdXMoKTtcbiAgfVxuXG4gIGZvY3VzUHJldmlvdXNOb2RlKCkge1xuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLmdldEZvY3VzZWROb2RlKCk7XG4gICAgbGV0IG5leHROb2RlID0gcHJldmlvdXNOb2RlID8gcHJldmlvdXNOb2RlLmZpbmRQcmV2aW91c05vZGUodHJ1ZSkgOiB0aGlzLmdldExhc3RSb290KHRydWUpO1xuICAgIG5leHROb2RlICYmIG5leHROb2RlLmZvY3VzKCk7XG4gIH1cblxuICBmb2N1c0RyaWxsRG93bigpIHtcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gdGhpcy5nZXRGb2N1c2VkTm9kZSgpO1xuICAgIGlmIChwcmV2aW91c05vZGUgJiYgcHJldmlvdXNOb2RlLmlzQ29sbGFwc2VkICYmIHByZXZpb3VzTm9kZS5oYXNDaGlsZHJlbikge1xuICAgICAgcHJldmlvdXNOb2RlLnRvZ2dsZUV4cGFuZGVkKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGV0IG5leHROb2RlID0gcHJldmlvdXNOb2RlID8gcHJldmlvdXNOb2RlLmdldEZpcnN0Q2hpbGQodHJ1ZSkgOiB0aGlzLmdldEZpcnN0Um9vdCh0cnVlKTtcbiAgICAgIG5leHROb2RlICYmIG5leHROb2RlLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgZm9jdXNEcmlsbFVwKCkge1xuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLmdldEZvY3VzZWROb2RlKCk7XG4gICAgaWYgKCFwcmV2aW91c05vZGUpIHJldHVybjtcbiAgICBpZiAocHJldmlvdXNOb2RlLmlzRXhwYW5kZWQpIHtcbiAgICAgIHByZXZpb3VzTm9kZS50b2dnbGVFeHBhbmRlZCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBuZXh0Tm9kZSA9IHByZXZpb3VzTm9kZS5yZWFsUGFyZW50O1xuICAgICAgbmV4dE5vZGUgJiYgbmV4dE5vZGUuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBpc0FjdGl2ZShub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlTm9kZUlkc1tub2RlLmlkXTtcbiAgfVxuXG4gIHNldEFjdGl2ZU5vZGUobm9kZSwgdmFsdWUsIG11bHRpID0gZmFsc2UpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIG5vZGUuZm9jdXMoKTtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbkFjdGl2YXRlLCBub2RlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25EZWFjdGl2YXRlLCBub2RlIH0pO1xuICAgIH1cblxuICAgIGlmIChtdWx0aSkge1xuICAgICAgdGhpcy5fc2V0QWN0aXZlTm9kZU11bHRpKG5vZGUsIHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLl9zZXRBY3RpdmVOb2RlU2luZ2xlKG5vZGUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBfc2V0QWN0aXZlTm9kZVNpbmdsZShub2RlLCB2YWx1ZSkge1xuICAgIC8vIERlYWN0aXZhdGUgYWxsIG90aGVyIG5vZGVzOlxuICAgIHRoaXMuYWN0aXZlTm9kZXNcbiAgICAgIC5maWx0ZXIoKGFjdGl2ZU5vZGUpID0+IGFjdGl2ZU5vZGUgIT0gbm9kZSlcbiAgICAgIC5mb3JFYWNoKChhY3RpdmVOb2RlKSA9PiB7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbkRlYWN0aXZhdGUsIG5vZGU6IGFjdGl2ZU5vZGUgfSk7XG4gICAgICB9KTtcblxuICAgIHRoaXMuYWN0aXZlTm9kZUlkcyA9IHt9O1xuICAgIHRoaXMuYWN0aXZlTm9kZXMgPSBbXTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuYWN0aXZlTm9kZXMucHVzaChub2RlKTtcbiAgICAgIHRoaXMuYWN0aXZlTm9kZUlkc1tub2RlLmlkXSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgX3NldEFjdGl2ZU5vZGVNdWx0aShub2RlLCB2YWx1ZSkge1xuICAgIHRoaXMuYWN0aXZlTm9kZUlkc1tub2RlLmlkXSA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgaWYgKCFpbmNsdWRlcyh0aGlzLmFjdGl2ZU5vZGVzLCBub2RlKSkge1xuICAgICAgICB0aGlzLmFjdGl2ZU5vZGVzLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpbmNsdWRlcyh0aGlzLmFjdGl2ZU5vZGVzLCBub2RlKSkge1xuICAgICAgICByZW1vdmUodGhpcy5hY3RpdmVOb2Rlcywgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNFeHBhbmRlZChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kZWROb2RlSWRzW25vZGUuaWRdO1xuICB9XG5cbiAgc2V0RXhwYW5kZWROb2RlKG5vZGUsIHZhbHVlKSB7XG4gICAgY29uc3QgaW5kZXggPSBpbmRleE9mKHRoaXMuZXhwYW5kZWROb2Rlcywgbm9kZSk7XG5cbiAgICBpZiAodmFsdWUgJiYgIWluZGV4KSB0aGlzLmV4cGFuZGVkTm9kZXMucHVzaChub2RlKTtcbiAgICBlbHNlIGlmIChpbmRleCkgcHVsbEF0KHRoaXMuZXhwYW5kZWROb2RlcywgaW5kZXgpO1xuXG4gICAgdGhpcy5leHBhbmRlZE5vZGVJZHNbbm9kZS5pZF0gPSB2YWx1ZTtcbiAgfVxuXG4gIHBlcmZvcm1LZXlBY3Rpb24obm9kZSwgJGV2ZW50KSB7XG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5vcHRpb25zLmFjdGlvbk1hcHBpbmcua2V5c1skZXZlbnQua2V5Q29kZV1cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGFjdGlvbih0aGlzLCBub2RlLCAkZXZlbnQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmaWx0ZXJOb2RlcyhmaWx0ZXIsIGF1dG9TaG93ID0gZmFsc2UpIHtcbiAgICBsZXQgZmlsdGVyRm47XG5cbiAgICBpZiAoIWZpbHRlcikge1xuICAgICAgcmV0dXJuIHRoaXMuY2xlYXJGaWx0ZXIoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTdHJpbmcoZmlsdGVyKSkge1xuICAgICAgZmlsdGVyRm4gPSAobm9kZSkgPT4gbm9kZS5kaXNwbGF5RmllbGQudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlci50b0xvd2VyQ2FzZSgpKSAhPSAtMVxuICAgIH1cbiAgICBlbHNlIGlmIChpc0Z1bmN0aW9uKGZpbHRlcikpIHtcbiAgICAgICBmaWx0ZXJGbiA9IGZpbHRlcjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdEb25cXCd0IGtub3cgd2hhdCB0byBkbyB3aXRoIGZpbHRlcicsIGZpbHRlcik7XG4gICAgICBjb25zb2xlLmVycm9yKCdTaG91bGQgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGZ1bmN0aW9uJywgZmlsdGVyKTtcbiAgICB9XG4gICAgdGhpcy5yb290cy5mb3JFYWNoKChub2RlKSA9PiBub2RlLmZpbHRlcihmaWx0ZXJGbiwgYXV0b1Nob3cpKTtcbiAgfVxuXG4gIGNsZWFyRmlsdGVyKCkge1xuICAgIHRoaXMucm9vdHMuZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5jbGVhckZpbHRlcigpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Nhbk1vdmVOb2RlKG5vZGUsIGZyb21JbmRleCwgdG8pIHtcbiAgICAvLyBzYW1lIG5vZGU6XG4gICAgaWYgKG5vZGUucGFyZW50ID09PSB0by5wYXJlbnQgJiYgZnJvbUluZGV4ID09PSB0by5pbmRleCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhdG8ucGFyZW50LmlzRGVzY2VuZGFudE9mKG5vZGUpO1xuICB9XG5cbiAgbW92ZU5vZGUobm9kZSwgdG8pIHtcbiAgICBjb25zdCBmcm9tSW5kZXggPSBub2RlLmdldEluZGV4SW5QYXJlbnQoKTtcbiAgICBjb25zdCBmcm9tUGFyZW50ID0gbm9kZS5wYXJlbnQ7XG5cbiAgICBpZiAoIXRoaXMuX2Nhbk1vdmVOb2RlKG5vZGUsIGZyb21JbmRleCAsIHRvKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZnJvbUNoaWxkcmVuID0gZnJvbVBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKTtcblxuICAgIC8vIElmIG5vZGUgZG9lc24ndCBoYXZlIGNoaWxkcmVuIC0gY3JlYXRlIGNoaWxkcmVuIGFycmF5XG4gICAgaWYgKCF0by5wYXJlbnQuZ2V0RmllbGQoJ2NoaWxkcmVuJykpIHtcbiAgICAgIHRvLnBhcmVudC5zZXRGaWVsZCgnY2hpbGRyZW4nLCBbXSk7XG4gICAgfVxuICAgIGNvbnN0IHRvQ2hpbGRyZW4gPSB0by5wYXJlbnQuZ2V0RmllbGQoJ2NoaWxkcmVuJyk7XG5cbiAgICBjb25zdCBvcmlnaW5hbE5vZGUgPSBmcm9tQ2hpbGRyZW4uc3BsaWNlKGZyb21JbmRleCwgMSlbMF07XG5cbiAgICAvLyBDb21wZW5zYXRlIGZvciBpbmRleCBpZiBhbHJlYWR5IHJlbW92ZWQgZnJvbSBwYXJlbnQ6XG4gICAgbGV0IHRvSW5kZXggPSAoZnJvbVBhcmVudCA9PT0gdG8ucGFyZW50ICYmIHRvLmluZGV4ID4gZnJvbUluZGV4KSA/IHRvLmluZGV4IC0gMSA6IHRvLmluZGV4O1xuXG4gICAgdG9DaGlsZHJlbi5zcGxpY2UodG9JbmRleCwgMCwgb3JpZ2luYWxOb2RlKTtcblxuICAgIGZyb21QYXJlbnQudHJlZU1vZGVsLnVwZGF0ZSgpO1xuICAgIGlmICh0by5wYXJlbnQudHJlZU1vZGVsICE9PSBmcm9tUGFyZW50LnRyZWVNb2RlbCkge1xuICAgICAgdG8ucGFyZW50LnRyZWVNb2RlbC51cGRhdGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25Nb3ZlTm9kZSwgbm9kZTogb3JpZ2luYWxOb2RlLCB0bzogeyBwYXJlbnQ6IHRvLnBhcmVudC5kYXRhLCBpbmRleDogdG9JbmRleCB9IH0pO1xuICB9XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==
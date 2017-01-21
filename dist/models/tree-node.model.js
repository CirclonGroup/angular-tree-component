"use strict";
var events_1 = require("../constants/events");
var deprecated_1 = require("../deprecated");
var _ = require("lodash");
var TreeNode = (function () {
    function TreeNode(data, parent, treeModel) {
        this.data = data;
        this.parent = parent;
        this.treeModel = treeModel;
        this.id = this.id || uuid(); // Make sure there's a unique ID
        this.level = this.parent ? this.parent.level + 1 : 0;
        this.path = this.parent ? this.parent.path.concat([this.id]) : [];
        if (this.getField('children')) {
            this._initChildren();
        }
        this.allowDrop = this.allowDropUnbound.bind(this);
    }
    Object.defineProperty(TreeNode.prototype, "isHidden", {
        get: function () { return this.getField('isHidden'); },
        set: function (value) { this.setField('isHidden', value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(TreeNode.prototype, "isExpanded", {
        get: function () { return this.treeModel.isExpanded(this); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "isActive", {
        get: function () { return this.treeModel.isActive(this); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "isFocused", {
        get: function () { return this.treeModel.isNodeFocused(this); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "originalNode", {
        get: function () { return this._originalNode; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "hasChildren", {
        // helper get functions:
        get: function () {
            return !!(this.data.hasChildren || (this.children && this.children.length > 0));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isCollapsed", {
        get: function () { return !this.isExpanded; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isLeaf", {
        get: function () { return !this.hasChildren; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isRoot", {
        get: function () { return this.parent.data.virtual; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "realParent", {
        get: function () { return this.isRoot ? null : this.parent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "options", {
        // proxy functions:
        get: function () { return this.treeModel.options; },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.fireEvent = function (event) { this.treeModel.fireEvent(event); };
    Object.defineProperty(TreeNode.prototype, "context", {
        get: function () { return this.options.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "displayField", {
        // field accessors:
        get: function () {
            return this.getField('display');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "id", {
        get: function () {
            return this.getField('id');
        },
        set: function (value) {
            this.setField('id', value);
        },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.getField = function (key) {
        return this.data[this.options[key + "Field"]];
    };
    TreeNode.prototype.setField = function (key, value) {
        this.data[this.options[key + "Field"]] = value;
    };
    // traversing:
    TreeNode.prototype._findAdjacentSibling = function (steps, skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var index = this.getIndexInParent(skipHidden);
        return this._getParentsChildren(skipHidden)[index + steps];
    };
    TreeNode.prototype.findNextSibling = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return this._findAdjacentSibling(+1, skipHidden);
    };
    TreeNode.prototype.findPreviousSibling = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return this._findAdjacentSibling(-1, skipHidden);
    };
    TreeNode.prototype.getVisibleChildren = function () {
        return (this.children || []).filter(function (node) { return !node.isHidden; });
    };
    TreeNode.prototype.getFirstChild = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var children = skipHidden ? this.getVisibleChildren() : this.children;
        return _.first(children || []);
    };
    TreeNode.prototype.getLastChild = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var children = skipHidden ? this.getVisibleChildren() : this.children;
        return _.last(children || []);
    };
    TreeNode.prototype.findNextNode = function (goInside, skipHidden) {
        if (goInside === void 0) { goInside = true; }
        if (skipHidden === void 0) { skipHidden = false; }
        return goInside && this.isExpanded && this.getFirstChild(skipHidden) ||
            this.findNextSibling(skipHidden) ||
            this.parent && this.parent.findNextNode(false, skipHidden);
    };
    TreeNode.prototype.findPreviousNode = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var previousSibling = this.findPreviousSibling(skipHidden);
        if (!previousSibling) {
            return this.realParent;
        }
        return previousSibling._getLastOpenDescendant(skipHidden);
    };
    TreeNode.prototype._getLastOpenDescendant = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var lastChild = this.getLastChild(skipHidden);
        return (this.isCollapsed || !lastChild)
            ? this
            : lastChild._getLastOpenDescendant(skipHidden);
    };
    TreeNode.prototype._getParentsChildren = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var children = this.parent &&
            (skipHidden ? this.parent.getVisibleChildren() : this.parent.children);
        return children || [];
    };
    TreeNode.prototype.getIndexInParent = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return this._getParentsChildren(skipHidden).indexOf(this);
    };
    TreeNode.prototype.isDescendantOf = function (node) {
        if (this === node)
            return true;
        else
            return this.parent && this.parent.isDescendantOf(node);
    };
    TreeNode.prototype.getNodePadding = function () {
        return this.options.levelPadding * (this.level - 1) + 'px';
    };
    TreeNode.prototype.getClass = function () {
        return this.options.nodeClass(this);
    };
    TreeNode.prototype.onDrop = function ($event) {
        this.mouseAction('drop', $event.event, {
            from: $event.element,
            to: { parent: this, index: 0 }
        });
    };
    TreeNode.prototype.allowDropUnbound = function (element) {
        return this.options.allowDrop(element, { parent: this, index: 0 });
    };
    // helper methods:
    TreeNode.prototype.loadChildren = function () {
        var _this = this;
        if (!this.options.getChildren) {
            throw new Error('Node doesn\'t have children, or a getChildren method');
        }
        return Promise.resolve(this.options.getChildren(this))
            .then(function (children) {
            if (children) {
                _this.setField('children', children);
                _this._initChildren();
                _this.children.forEach(function (child) {
                    if (child.getField('isExpanded') && child.hasChildren) {
                        child.expand();
                    }
                });
            }
        });
    };
    TreeNode.prototype.expand = function () {
        if (!this.isExpanded) {
            return this.toggleExpanded();
        }
        return Promise.resolve();
    };
    TreeNode.prototype.collapse = function () {
        if (this.isExpanded) {
            this.toggleExpanded();
        }
        return this;
    };
    TreeNode.prototype.ensureVisible = function () {
        if (this.realParent) {
            this.realParent.expand();
            this.realParent.ensureVisible();
        }
        return this;
    };
    TreeNode.prototype.toggle = function () {
        deprecated_1.deprecated('toggle', 'toggleExpanded');
        return this.toggleExpanded();
    };
    TreeNode.prototype.toggleExpanded = function () {
        var _this = this;
        return this.setIsExpanded(!this.isExpanded)
            .then(function () {
            _this.fireEvent({ eventName: events_1.TREE_EVENTS.onToggle, warning: 'this event is deprecated, please use onToggleExpanded instead', node: _this, isExpanded: _this.isExpanded });
            _this.fireEvent({ eventName: events_1.TREE_EVENTS.onToggleExpanded, node: _this, isExpanded: _this.isExpanded });
        });
    };
    TreeNode.prototype.setIsExpanded = function (value) {
        this.treeModel.setExpandedNode(this, value);
        var promise = null;
        if (!this.children && this.hasChildren && value) {
            promise = this.loadChildren();
        }
        return promise ? promise : Promise.resolve();
    };
    ;
    TreeNode.prototype.setIsActive = function (value, multi) {
        if (multi === void 0) { multi = false; }
        this.treeModel.setActiveNode(this, value, multi);
        if (value) {
            this.focus();
        }
        return this;
    };
    TreeNode.prototype.toggleActivated = function (multi) {
        if (multi === void 0) { multi = false; }
        this.setIsActive(!this.isActive, multi);
        return this;
    };
    TreeNode.prototype.setActiveAndVisible = function (multi) {
        if (multi === void 0) { multi = false; }
        this.setIsActive(true, multi)
            .ensureVisible();
        setTimeout(this.scrollIntoView.bind(this));
        return this;
    };
    TreeNode.prototype.scrollIntoView = function () {
        if (this.elementRef) {
            var nativeElement = this.elementRef.nativeElement;
            nativeElement.scrollIntoViewIfNeeded && nativeElement.scrollIntoViewIfNeeded();
            return this;
        }
    };
    TreeNode.prototype.focus = function () {
        var previousNode = this.treeModel.getFocusedNode();
        this.treeModel.setFocusedNode(this);
        this.scrollIntoView();
        if (previousNode) {
            this.fireEvent({ eventName: events_1.TREE_EVENTS.onBlur, node: previousNode });
        }
        this.fireEvent({ eventName: events_1.TREE_EVENTS.onFocus, node: this });
        return this;
    };
    TreeNode.prototype.blur = function () {
        var previousNode = this.treeModel.getFocusedNode();
        this.treeModel.setFocusedNode(null);
        if (previousNode) {
            this.fireEvent({ eventName: events_1.TREE_EVENTS.onBlur, node: this });
        }
        return this;
    };
    TreeNode.prototype.filter = function (filterFn, autoShow) {
        if (autoShow === void 0) { autoShow = false; }
        var isVisible = filterFn(this);
        if (this.children) {
            this.children.forEach(function (child) {
                child.filter(filterFn, autoShow);
                isVisible = isVisible || !child.isHidden;
            });
        }
        this.isHidden = !isVisible;
        if (autoShow) {
            this.ensureVisible();
        }
    };
    TreeNode.prototype.clearFilter = function () {
        this.isHidden = false;
        if (this.children)
            this.children.forEach(function (child) { return child.clearFilter(); });
    };
    TreeNode.prototype.allowDrag = function () {
        return this.options.allowDrag;
    };
    TreeNode.prototype.mouseAction = function (actionName, $event, data) {
        if (data === void 0) { data = null; }
        this.treeModel.setFocus(true);
        var actionMapping = this.options.actionMapping.mouse;
        var action = actionMapping[actionName];
        if (action) {
            action(this.treeModel, this, $event, data);
            // TODO: remove after deprecation of context menu and dbl click
            if (actionName === 'contextMenu') {
                this.fireEvent({ eventName: events_1.TREE_EVENTS.onContextMenu, node: this, rawEvent: $event });
            }
            if (actionName === 'dblClick') {
                this.fireEvent({ eventName: events_1.TREE_EVENTS.onDoubleClick, warning: 'This event is deprecated, please use actionMapping to handle double clicks', node: this, rawEvent: $event });
            }
        }
    };
    TreeNode.prototype._initChildren = function () {
        var _this = this;
        this.children = this.getField('children')
            .map(function (c) { return new TreeNode(c, _this, _this.treeModel); });
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
function uuid() {
    return Math.floor(Math.random() * 10000000000000);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21vZGVscy90cmVlLW5vZGUubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLDhDQUFrRDtBQUNsRCw0Q0FBMkM7QUFFM0MsMEJBQTRCO0FBRTVCO0lBZ0JFLGtCQUFtQixJQUFRLEVBQVMsTUFBZSxFQUFTLFNBQW1CO1FBQTVELFNBQUksR0FBSixJQUFJLENBQUk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFTO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUM3RSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxnQ0FBZ0M7UUFDN0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFFLElBQUksQ0FBQyxFQUFFLEtBQUksRUFBRSxDQUFDO1FBRTlELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUF6QkQsc0JBQUksOEJBQVE7YUFBWixjQUFpQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDLENBQUM7YUFDbkQsVUFBYSxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFD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LElBQUksUUFBUSxDQUFDLENBQUMsRUFBRSxLQUFJLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBbFVELElBa1VDO0FBbFVZLDRCQUFRO0FBb1VyQjtJQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxjQUFjLENBQUMsQ0FBQztBQUNwRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi90cmVlLm1vZGVsJztcbmltcG9ydCB7IFRyZWVPcHRpb25zIH0gZnJvbSAnLi90cmVlLW9wdGlvbnMubW9kZWwnO1xuaW1wb3J0IHsgSVRyZWVOb2RlIH0gZnJvbSAnLi4vZGVmcy9hcGknO1xuaW1wb3J0IHsgVFJFRV9FVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcbmltcG9ydCB7IGRlcHJlY2F0ZWQgfSBmcm9tICcuLi9kZXByZWNhdGVkJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY2xhc3MgVHJlZU5vZGUgaW1wbGVtZW50cyBJVHJlZU5vZGUge1xuICBnZXQgaXNIaWRkZW4oKSB7IHJldHVybiB0aGlzLmdldEZpZWxkKCdpc0hpZGRlbicpIH07XG4gIHNldCBpc0hpZGRlbih2YWx1ZSkgeyB0aGlzLnNldEZpZWxkKCdpc0hpZGRlbicsIHZhbHVlKSB9O1xuICBnZXQgaXNFeHBhbmRlZCgpIHsgcmV0dXJuIHRoaXMudHJlZU1vZGVsLmlzRXhwYW5kZWQodGhpcykgfTtcbiAgZ2V0IGlzQWN0aXZlKCkgeyByZXR1cm4gdGhpcy50cmVlTW9kZWwuaXNBY3RpdmUodGhpcykgfTtcbiAgZ2V0IGlzRm9jdXNlZCgpIHsgcmV0dXJuIHRoaXMudHJlZU1vZGVsLmlzTm9kZUZvY3VzZWQodGhpcykgfTtcblxuICBsZXZlbDogbnVtYmVyO1xuICBwYXRoOiBzdHJpbmdbXTtcbiAgZWxlbWVudFJlZjpFbGVtZW50UmVmO1xuICBjaGlsZHJlbjogVHJlZU5vZGVbXTtcbiAgYWxsb3dEcm9wOiAoYW55KSA9PiBib29sZWFuO1xuXG4gIHByaXZhdGUgX29yaWdpbmFsTm9kZTogYW55O1xuICBnZXQgb3JpZ2luYWxOb2RlKCkgeyByZXR1cm4gdGhpcy5fb3JpZ2luYWxOb2RlIH07XG5cbiAgY29uc3RydWN0b3IocHVibGljIGRhdGE6YW55LCBwdWJsaWMgcGFyZW50OlRyZWVOb2RlLCBwdWJsaWMgdHJlZU1vZGVsOlRyZWVNb2RlbCkge1xuICAgIHRoaXMuaWQgPSB0aGlzLmlkIHx8IHV1aWQoKTsgLy8gTWFrZSBzdXJlIHRoZXJlJ3MgYSB1bmlxdWUgSURcbiAgICB0aGlzLmxldmVsID0gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5sZXZlbCArIDEgOiAwO1xuICAgIHRoaXMucGF0aCA9IHRoaXMucGFyZW50ID8gWy4uLnRoaXMucGFyZW50LnBhdGgsIHRoaXMuaWRdIDogW107XG5cbiAgICBpZiAodGhpcy5nZXRGaWVsZCgnY2hpbGRyZW4nKSkge1xuICAgICAgdGhpcy5faW5pdENoaWxkcmVuKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hbGxvd0Ryb3AgPSB0aGlzLmFsbG93RHJvcFVuYm91bmQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8vIGhlbHBlciBnZXQgZnVuY3Rpb25zOlxuICBnZXQgaGFzQ2hpbGRyZW4oKTpib29sZWFuIHtcbiAgICByZXR1cm4gISEodGhpcy5kYXRhLmhhc0NoaWxkcmVuIHx8ICh0aGlzLmNoaWxkcmVuICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkpO1xuICB9XG4gIGdldCBpc0NvbGxhcHNlZCgpOmJvb2xlYW4geyByZXR1cm4gIXRoaXMuaXNFeHBhbmRlZCB9XG4gIGdldCBpc0xlYWYoKTpib29sZWFuIHsgcmV0dXJuICF0aGlzLmhhc0NoaWxkcmVuIH1cbiAgZ2V0IGlzUm9vdCgpOmJvb2xlYW4geyByZXR1cm4gdGhpcy5wYXJlbnQuZGF0YS52aXJ0dWFsIH1cbiAgZ2V0IHJlYWxQYXJlbnQoKTpUcmVlTm9kZSB7IHJldHVybiB0aGlzLmlzUm9vdCA/IG51bGwgOiB0aGlzLnBhcmVudCB9XG5cbiAgLy8gcHJveHkgZnVuY3Rpb25zOlxuICBnZXQgb3B0aW9ucygpOiBUcmVlT3B0aW9ucyB7IHJldHVybiB0aGlzLnRyZWVNb2RlbC5vcHRpb25zIH1cbiAgZmlyZUV2ZW50KGV2ZW50KSB7IHRoaXMudHJlZU1vZGVsLmZpcmVFdmVudChldmVudCkgfVxuICBnZXQgY29udGV4dCgpOmFueSB7IHJldHVybiB0aGlzLm9wdGlvbnMuY29udGV4dCB9XG5cbiAgLy8gZmllbGQgYWNjZXNzb3JzOlxuICBnZXQgZGlzcGxheUZpZWxkKCkge1xuICAgIHJldHVybiB0aGlzLmdldEZpZWxkKCdkaXNwbGF5Jyk7XG4gIH1cblxuICBnZXQgaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RmllbGQoJ2lkJyk7XG4gIH1cblxuICBzZXQgaWQodmFsdWUpIHtcbiAgICB0aGlzLnNldEZpZWxkKCdpZCcsIHZhbHVlKTtcbiAgfVxuXG4gIGdldEZpZWxkKGtleSkge1xuICAgIHJldHVybiB0aGlzLmRhdGFbdGhpcy5vcHRpb25zW2Ake2tleX1GaWVsZGBdXTtcbiAgfVxuXG4gIHNldEZpZWxkKGtleSwgdmFsdWUpIHtcbiAgICB0aGlzLmRhdGFbdGhpcy5vcHRpb25zW2Ake2tleX1GaWVsZGBdXSA9IHZhbHVlO1xuICB9XG5cbiAgLy8gdHJhdmVyc2luZzpcbiAgX2ZpbmRBZGphY2VudFNpYmxpbmcoc3RlcHMsIHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleEluUGFyZW50KHNraXBIaWRkZW4pO1xuICAgIHJldHVybiB0aGlzLl9nZXRQYXJlbnRzQ2hpbGRyZW4oc2tpcEhpZGRlbilbaW5kZXggKyBzdGVwc107XG4gIH1cblxuICBmaW5kTmV4dFNpYmxpbmcoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbmRBZGphY2VudFNpYmxpbmcoKzEsIHNraXBIaWRkZW4pO1xuICB9XG5cbiAgZmluZFByZXZpb3VzU2libGluZyhza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICByZXR1cm4gdGhpcy5fZmluZEFkamFjZW50U2libGluZygtMSwgc2tpcEhpZGRlbik7XG4gIH1cblxuICBnZXRWaXNpYmxlQ2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuICh0aGlzLmNoaWxkcmVuIHx8IFtdKS5maWx0ZXIoKG5vZGUpID0+ICFub2RlLmlzSGlkZGVuKTtcbiAgfVxuXG4gIGdldEZpcnN0Q2hpbGQoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgbGV0IGNoaWxkcmVuID0gc2tpcEhpZGRlbiA/IHRoaXMuZ2V0VmlzaWJsZUNoaWxkcmVuKCkgOiB0aGlzLmNoaWxkcmVuO1xuXG4gICAgcmV0dXJuIF8uZmlyc3QoY2hpbGRyZW4gfHwgW10pO1xuICB9XG5cbiAgZ2V0TGFzdENoaWxkKHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIGxldCBjaGlsZHJlbiA9IHNraXBIaWRkZW4gPyB0aGlzLmdldFZpc2libGVDaGlsZHJlbigpIDogdGhpcy5jaGlsZHJlbjtcblxuICAgIHJldHVybiBfLmxhc3QoY2hpbGRyZW4gfHwgW10pO1xuICB9XG5cbiAgZmluZE5leHROb2RlKGdvSW5zaWRlID0gdHJ1ZSwgc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIGdvSW5zaWRlICYmIHRoaXMuaXNFeHBhbmRlZCAmJiB0aGlzLmdldEZpcnN0Q2hpbGQoc2tpcEhpZGRlbikgfHxcbiAgICAgICAgICAgdGhpcy5maW5kTmV4dFNpYmxpbmcoc2tpcEhpZGRlbikgfHxcbiAgICAgICAgICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuZmluZE5leHROb2RlKGZhbHNlLCBza2lwSGlkZGVuKTtcbiAgfVxuXG4gIGZpbmRQcmV2aW91c05vZGUoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgbGV0IHByZXZpb3VzU2libGluZyA9IHRoaXMuZmluZFByZXZpb3VzU2libGluZyhza2lwSGlkZGVuKTtcbiAgICBpZiAoIXByZXZpb3VzU2libGluZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVhbFBhcmVudFxuICAgIH1cbiAgICByZXR1cm4gcHJldmlvdXNTaWJsaW5nLl9nZXRMYXN0T3BlbkRlc2NlbmRhbnQoc2tpcEhpZGRlbik7XG4gIH1cblxuICBfZ2V0TGFzdE9wZW5EZXNjZW5kYW50KHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIGNvbnN0IGxhc3RDaGlsZCA9IHRoaXMuZ2V0TGFzdENoaWxkKHNraXBIaWRkZW4pO1xuICAgIHJldHVybiAodGhpcy5pc0NvbGxhcHNlZCB8fCAhbGFzdENoaWxkKVxuICAgICAgPyB0aGlzXG4gICAgICA6IGxhc3RDaGlsZC5fZ2V0TGFzdE9wZW5EZXNjZW5kYW50KHNraXBIaWRkZW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UGFyZW50c0NoaWxkcmVuKHNraXBIaWRkZW4gPSBmYWxzZSk6YW55W10ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5wYXJlbnQgJiZcbiAgICAgIChza2lwSGlkZGVuID8gdGhpcy5wYXJlbnQuZ2V0VmlzaWJsZUNoaWxkcmVuKCkgOiB0aGlzLnBhcmVudC5jaGlsZHJlbik7XG5cbiAgICByZXR1cm4gY2hpbGRyZW4gfHwgW107XG4gIH1cblxuICBwcml2YXRlIGdldEluZGV4SW5QYXJlbnQoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFBhcmVudHNDaGlsZHJlbihza2lwSGlkZGVuKS5pbmRleE9mKHRoaXMpO1xuICB9XG5cbiAgaXNEZXNjZW5kYW50T2Yobm9kZTpUcmVlTm9kZSkge1xuICAgIGlmICh0aGlzID09PSBub2RlKSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5pc0Rlc2NlbmRhbnRPZihub2RlKTtcbiAgfVxuXG4gIGdldE5vZGVQYWRkaW5nKCk6c3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxldmVsUGFkZGluZyAqICh0aGlzLmxldmVsIC0gMSkgKyAncHgnO1xuICB9XG5cbiAgZ2V0Q2xhc3MoKTpzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubm9kZUNsYXNzKHRoaXMpO1xuICB9XG5cbiAgb25Ecm9wKCRldmVudCkge1xuICAgIHRoaXMubW91c2VBY3Rpb24oJ2Ryb3AnLCAkZXZlbnQuZXZlbnQsIHtcbiAgICAgIGZyb206ICRldmVudC5lbGVtZW50LFxuICAgICAgdG86IHsgcGFyZW50OiB0aGlzLCBpbmRleDogMCB9XG4gICAgfSk7XG4gIH1cblxuICBhbGxvd0Ryb3BVbmJvdW5kKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsbG93RHJvcChlbGVtZW50LCB7IHBhcmVudDogdGhpcywgaW5kZXg6IDAgfSk7XG4gIH1cblxuXG4gIC8vIGhlbHBlciBtZXRob2RzOlxuICBsb2FkQ2hpbGRyZW4oKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZ2V0Q2hpbGRyZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm9kZSBkb2VzblxcJ3QgaGF2ZSBjaGlsZHJlbiwgb3IgYSBnZXRDaGlsZHJlbiBtZXRob2QnKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLm9wdGlvbnMuZ2V0Q2hpbGRyZW4odGhpcykpXG4gICAgICAudGhlbigoY2hpbGRyZW4pID0+IHtcbiAgICAgICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgICAgdGhpcy5zZXRGaWVsZCgnY2hpbGRyZW4nLCBjaGlsZHJlbik7XG4gICAgICAgICAgdGhpcy5faW5pdENoaWxkcmVuKCk7XG4gICAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoaWxkLmdldEZpZWxkKCdpc0V4cGFuZGVkJykgJiYgY2hpbGQuaGFzQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgY2hpbGQuZXhwYW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgaWYgKCF0aGlzLmlzRXhwYW5kZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvZ2dsZUV4cGFuZGVkKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgaWYgKHRoaXMuaXNFeHBhbmRlZCkge1xuICAgICAgdGhpcy50b2dnbGVFeHBhbmRlZCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZW5zdXJlVmlzaWJsZSgpIHtcbiAgICBpZiAodGhpcy5yZWFsUGFyZW50KSB7XG4gICAgICB0aGlzLnJlYWxQYXJlbnQuZXhwYW5kKCk7XG4gICAgICB0aGlzLnJlYWxQYXJlbnQuZW5zdXJlVmlzaWJsZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIGRlcHJlY2F0ZWQoJ3RvZ2dsZScsICd0b2dnbGVFeHBhbmRlZCcpO1xuICAgIHJldHVybiB0aGlzLnRvZ2dsZUV4cGFuZGVkKCk7XG4gIH1cblxuICB0b2dnbGVFeHBhbmRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXRJc0V4cGFuZGVkKCF0aGlzLmlzRXhwYW5kZWQpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vblRvZ2dsZSwgd2FybmluZzogJ3RoaXMgZXZlbnQgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBvblRvZ2dsZUV4cGFuZGVkIGluc3RlYWQnLCBub2RlOiB0aGlzLCBpc0V4cGFuZGVkOiB0aGlzLmlzRXhwYW5kZWQgfSk7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vblRvZ2dsZUV4cGFuZGVkLCBub2RlOiB0aGlzLCBpc0V4cGFuZGVkOiB0aGlzLmlzRXhwYW5kZWQgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHNldElzRXhwYW5kZWQodmFsdWUpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRFeHBhbmRlZE5vZGUodGhpcywgdmFsdWUpO1xuXG4gICAgbGV0IHByb21pc2UgPSBudWxsO1xuICAgIGlmICghdGhpcy5jaGlsZHJlbiAmJiB0aGlzLmhhc0NoaWxkcmVuICYmIHZhbHVlKSB7XG4gICAgICBwcm9taXNlID0gdGhpcy5sb2FkQ2hpbGRyZW4oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZSA/IHByb21pc2UgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfTtcblxuICBzZXRJc0FjdGl2ZSh2YWx1ZSwgbXVsdGkgPSBmYWxzZSkge1xuICAgIHRoaXMudHJlZU1vZGVsLnNldEFjdGl2ZU5vZGUodGhpcywgdmFsdWUsIG11bHRpKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRvZ2dsZUFjdGl2YXRlZChtdWx0aSA9IGZhbHNlKSB7XG4gICAgdGhpcy5zZXRJc0FjdGl2ZSghdGhpcy5pc0FjdGl2ZSwgbXVsdGkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRBY3RpdmVBbmRWaXNpYmxlKG11bHRpID0gZmFsc2UpIHtcbiAgICB0aGlzLnNldElzQWN0aXZlKHRydWUsIG11bHRpKVxuICAgICAgLmVuc3VyZVZpc2libGUoKTtcblxuICAgIHNldFRpbWVvdXQodGhpcy5zY3JvbGxJbnRvVmlldy5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2Nyb2xsSW50b1ZpZXcoKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudFJlZikge1xuICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgbmF0aXZlRWxlbWVudC5zY3JvbGxJbnRvVmlld0lmTmVlZGVkICYmIG5hdGl2ZUVsZW1lbnQuc2Nyb2xsSW50b1ZpZXdJZk5lZWRlZCgpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cblxuICBmb2N1cygpIHtcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gdGhpcy50cmVlTW9kZWwuZ2V0Rm9jdXNlZE5vZGUoKTtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1c2VkTm9kZSh0aGlzKTtcbiAgICB0aGlzLnNjcm9sbEludG9WaWV3KCk7XG4gICAgaWYgKHByZXZpb3VzTm9kZSkge1xuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uQmx1ciwgbm9kZTogcHJldmlvdXNOb2RlIH0pO1xuICAgIH1cbiAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25Gb2N1cywgbm9kZTogdGhpcyB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYmx1cigpIHtcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gdGhpcy50cmVlTW9kZWwuZ2V0Rm9jdXNlZE5vZGUoKTtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1c2VkTm9kZShudWxsKTtcbiAgICBpZiAocHJldmlvdXNOb2RlKSB7XG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25CbHVyLCBub2RlOiB0aGlzIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZmlsdGVyKGZpbHRlckZuLCBhdXRvU2hvdyA9IGZhbHNlKSB7XG4gICAgbGV0IGlzVmlzaWJsZSA9IGZpbHRlckZuKHRoaXMpO1xuXG4gICAgaWYgKHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgY2hpbGQuZmlsdGVyKGZpbHRlckZuLCBhdXRvU2hvdyk7XG4gICAgICAgIGlzVmlzaWJsZSA9IGlzVmlzaWJsZSB8fCAhY2hpbGQuaXNIaWRkZW47XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmlzSGlkZGVuID0gIWlzVmlzaWJsZTtcbiAgICBpZiAoYXV0b1Nob3cpIHtcbiAgICAgIHRoaXMuZW5zdXJlVmlzaWJsZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyRmlsdGVyKCkge1xuICAgIHRoaXMuaXNIaWRkZW4gPSBmYWxzZTtcbiAgICBpZiAodGhpcy5jaGlsZHJlbikgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gY2hpbGQuY2xlYXJGaWx0ZXIoKSk7XG4gIH1cblxuICBhbGxvd0RyYWcoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGxvd0RyYWc7XG4gIH1cblxuICBtb3VzZUFjdGlvbihhY3Rpb25OYW1lOnN0cmluZywgJGV2ZW50LCBkYXRhOmFueSA9IG51bGwpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1cyh0cnVlKTtcblxuICAgIGNvbnN0IGFjdGlvbk1hcHBpbmcgPSB0aGlzLm9wdGlvbnMuYWN0aW9uTWFwcGluZy5tb3VzZTtcbiAgICBjb25zdCBhY3Rpb24gPSBhY3Rpb25NYXBwaW5nW2FjdGlvbk5hbWVdO1xuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgYWN0aW9uKHRoaXMudHJlZU1vZGVsLCB0aGlzLCAkZXZlbnQsIGRhdGEpO1xuXG4gICAgICAvLyBUT0RPOiByZW1vdmUgYWZ0ZXIgZGVwcmVjYXRpb24gb2YgY29udGV4dCBtZW51IGFuZCBkYmwgY2xpY2tcbiAgICAgIGlmIChhY3Rpb25OYW1lID09PSAnY29udGV4dE1lbnUnKSB7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbkNvbnRleHRNZW51LCBub2RlOiB0aGlzLCByYXdFdmVudDogJGV2ZW50IH0pO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGlvbk5hbWUgPT09ICdkYmxDbGljaycpIHtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uRG91YmxlQ2xpY2ssIHdhcm5pbmc6ICdUaGlzIGV2ZW50IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYWN0aW9uTWFwcGluZyB0byBoYW5kbGUgZG91YmxlIGNsaWNrcycsIG5vZGU6IHRoaXMsIHJhd0V2ZW50OiAkZXZlbnQgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2luaXRDaGlsZHJlbigpIHtcbiAgICB0aGlzLmNoaWxkcmVuID0gdGhpcy5nZXRGaWVsZCgnY2hpbGRyZW4nKVxuICAgICAgLm1hcChjID0+IG5ldyBUcmVlTm9kZShjLCB0aGlzLCB0aGlzLnRyZWVNb2RlbCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHV1aWQoKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDAwMDAwMCk7XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==
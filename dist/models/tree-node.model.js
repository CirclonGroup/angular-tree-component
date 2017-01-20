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
        this.allowDrop = this.allowDropTemplate.bind(this);
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
    TreeNode.prototype.allowDropTemplate = function (element) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21vZGVscy90cmVlLW5vZGUubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLDhDQUFrRDtBQUNsRCw0Q0FBMkM7QUFFM0MsMEJBQTRCO0FBRTVCO0lBZ0JFLGtCQUFtQixJQUFRLEVBQVMsTUFBZSxFQUFTLFNBQW1CO1FBQTVELFNBQUksR0FBSixJQUFJLENBQUk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFTO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUM3RSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxnQ0FBZ0M7UUFDN0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFFLElBQUksQ0FBQyxFQUFFLEtBQUksRUFBRSxDQUFDO1FBRTlELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUF6QkQsc0JBQUksOEJBQVE7YUFBWixjQUFpQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDLENBQUM7YUFDbkQsVUFBYSxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFD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LElBQUksUUFBUSxDQUFDLENBQUMsRUFBRSxLQUFJLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBbFVELElBa1VDO0FBbFVZLDRCQUFRO0FBb1VyQjtJQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxjQUFjLENBQUMsQ0FBQztBQUNwRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi90cmVlLm1vZGVsJztcbmltcG9ydCB7IFRyZWVPcHRpb25zIH0gZnJvbSAnLi90cmVlLW9wdGlvbnMubW9kZWwnO1xuaW1wb3J0IHsgSVRyZWVOb2RlIH0gZnJvbSAnLi4vZGVmcy9hcGknO1xuaW1wb3J0IHsgVFJFRV9FVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcbmltcG9ydCB7IGRlcHJlY2F0ZWQgfSBmcm9tICcuLi9kZXByZWNhdGVkJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY2xhc3MgVHJlZU5vZGUgaW1wbGVtZW50cyBJVHJlZU5vZGUge1xuICBnZXQgaXNIaWRkZW4oKSB7IHJldHVybiB0aGlzLmdldEZpZWxkKCdpc0hpZGRlbicpIH07XG4gIHNldCBpc0hpZGRlbih2YWx1ZSkgeyB0aGlzLnNldEZpZWxkKCdpc0hpZGRlbicsIHZhbHVlKSB9O1xuICBnZXQgaXNFeHBhbmRlZCgpIHsgcmV0dXJuIHRoaXMudHJlZU1vZGVsLmlzRXhwYW5kZWQodGhpcykgfTtcbiAgZ2V0IGlzQWN0aXZlKCkgeyByZXR1cm4gdGhpcy50cmVlTW9kZWwuaXNBY3RpdmUodGhpcykgfTtcbiAgZ2V0IGlzRm9jdXNlZCgpIHsgcmV0dXJuIHRoaXMudHJlZU1vZGVsLmlzTm9kZUZvY3VzZWQodGhpcykgfTtcblxuICBsZXZlbDogbnVtYmVyO1xuICBwYXRoOiBzdHJpbmdbXTtcbiAgZWxlbWVudFJlZjpFbGVtZW50UmVmO1xuICBjaGlsZHJlbjogVHJlZU5vZGVbXTtcbiAgYWxsb3dEcm9wOiAoYW55KSA9PiBib29sZWFuO1xuXG4gIHByaXZhdGUgX29yaWdpbmFsTm9kZTogYW55O1xuICBnZXQgb3JpZ2luYWxOb2RlKCkgeyByZXR1cm4gdGhpcy5fb3JpZ2luYWxOb2RlIH07XG5cbiAgY29uc3RydWN0b3IocHVibGljIGRhdGE6YW55LCBwdWJsaWMgcGFyZW50OlRyZWVOb2RlLCBwdWJsaWMgdHJlZU1vZGVsOlRyZWVNb2RlbCkge1xuICAgIHRoaXMuaWQgPSB0aGlzLmlkIHx8IHV1aWQoKTsgLy8gTWFrZSBzdXJlIHRoZXJlJ3MgYSB1bmlxdWUgSURcbiAgICB0aGlzLmxldmVsID0gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5sZXZlbCArIDEgOiAwO1xuICAgIHRoaXMucGF0aCA9IHRoaXMucGFyZW50ID8gWy4uLnRoaXMucGFyZW50LnBhdGgsIHRoaXMuaWRdIDogW107XG5cbiAgICBpZiAodGhpcy5nZXRGaWVsZCgnY2hpbGRyZW4nKSkge1xuICAgICAgdGhpcy5faW5pdENoaWxkcmVuKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hbGxvd0Ryb3AgPSB0aGlzLmFsbG93RHJvcFRlbXBsYXRlLmJpbmQodGhpcyk7XG4gIH1cblxuICAvLyBoZWxwZXIgZ2V0IGZ1bmN0aW9uczpcbiAgZ2V0IGhhc0NoaWxkcmVuKCk6Ym9vbGVhbiB7XG4gICAgcmV0dXJuICEhKHRoaXMuZGF0YS5oYXNDaGlsZHJlbiB8fCAodGhpcy5jaGlsZHJlbiAmJiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApKTtcbiAgfVxuICBnZXQgaXNDb2xsYXBzZWQoKTpib29sZWFuIHsgcmV0dXJuICF0aGlzLmlzRXhwYW5kZWQgfVxuICBnZXQgaXNMZWFmKCk6Ym9vbGVhbiB7IHJldHVybiAhdGhpcy5oYXNDaGlsZHJlbiB9XG4gIGdldCBpc1Jvb3QoKTpib29sZWFuIHsgcmV0dXJuIHRoaXMucGFyZW50LmRhdGEudmlydHVhbCB9XG4gIGdldCByZWFsUGFyZW50KCk6VHJlZU5vZGUgeyByZXR1cm4gdGhpcy5pc1Jvb3QgPyBudWxsIDogdGhpcy5wYXJlbnQgfVxuXG4gIC8vIHByb3h5IGZ1bmN0aW9uczpcbiAgZ2V0IG9wdGlvbnMoKTogVHJlZU9wdGlvbnMgeyByZXR1cm4gdGhpcy50cmVlTW9kZWwub3B0aW9ucyB9XG4gIGZpcmVFdmVudChldmVudCkgeyB0aGlzLnRyZWVNb2RlbC5maXJlRXZlbnQoZXZlbnQpIH1cbiAgZ2V0IGNvbnRleHQoKTphbnkgeyByZXR1cm4gdGhpcy5vcHRpb25zLmNvbnRleHQgfVxuXG4gIC8vIGZpZWxkIGFjY2Vzc29yczpcbiAgZ2V0IGRpc3BsYXlGaWVsZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRGaWVsZCgnZGlzcGxheScpO1xuICB9XG5cbiAgZ2V0IGlkKCkge1xuICAgIHJldHVybiB0aGlzLmdldEZpZWxkKCdpZCcpO1xuICB9XG5cbiAgc2V0IGlkKHZhbHVlKSB7XG4gICAgdGhpcy5zZXRGaWVsZCgnaWQnLCB2YWx1ZSk7XG4gIH1cblxuICBnZXRGaWVsZChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhW3RoaXMub3B0aW9uc1tgJHtrZXl9RmllbGRgXV07XG4gIH1cblxuICBzZXRGaWVsZChrZXksIHZhbHVlKSB7XG4gICAgdGhpcy5kYXRhW3RoaXMub3B0aW9uc1tgJHtrZXl9RmllbGRgXV0gPSB2YWx1ZTtcbiAgfVxuXG4gIC8vIHRyYXZlcnNpbmc6XG4gIF9maW5kQWRqYWNlbnRTaWJsaW5nKHN0ZXBzLCBza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhJblBhcmVudChza2lwSGlkZGVuKTtcbiAgICByZXR1cm4gdGhpcy5fZ2V0UGFyZW50c0NoaWxkcmVuKHNraXBIaWRkZW4pW2luZGV4ICsgc3RlcHNdO1xuICB9XG5cbiAgZmluZE5leHRTaWJsaW5nKHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIHJldHVybiB0aGlzLl9maW5kQWRqYWNlbnRTaWJsaW5nKCsxLCBza2lwSGlkZGVuKTtcbiAgfVxuXG4gIGZpbmRQcmV2aW91c1NpYmxpbmcoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbmRBZGphY2VudFNpYmxpbmcoLTEsIHNraXBIaWRkZW4pO1xuICB9XG5cbiAgZ2V0VmlzaWJsZUNoaWxkcmVuKCkge1xuICAgIHJldHVybiAodGhpcy5jaGlsZHJlbiB8fCBbXSkuZmlsdGVyKChub2RlKSA9PiAhbm9kZS5pc0hpZGRlbik7XG4gIH1cblxuICBnZXRGaXJzdENoaWxkKHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIGxldCBjaGlsZHJlbiA9IHNraXBIaWRkZW4gPyB0aGlzLmdldFZpc2libGVDaGlsZHJlbigpIDogdGhpcy5jaGlsZHJlbjtcblxuICAgIHJldHVybiBfLmZpcnN0KGNoaWxkcmVuIHx8IFtdKTtcbiAgfVxuXG4gIGdldExhc3RDaGlsZChza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICBsZXQgY2hpbGRyZW4gPSBza2lwSGlkZGVuID8gdGhpcy5nZXRWaXNpYmxlQ2hpbGRyZW4oKSA6IHRoaXMuY2hpbGRyZW47XG5cbiAgICByZXR1cm4gXy5sYXN0KGNoaWxkcmVuIHx8IFtdKTtcbiAgfVxuXG4gIGZpbmROZXh0Tm9kZShnb0luc2lkZSA9IHRydWUsIHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIHJldHVybiBnb0luc2lkZSAmJiB0aGlzLmlzRXhwYW5kZWQgJiYgdGhpcy5nZXRGaXJzdENoaWxkKHNraXBIaWRkZW4pIHx8XG4gICAgICAgICAgIHRoaXMuZmluZE5leHRTaWJsaW5nKHNraXBIaWRkZW4pIHx8XG4gICAgICAgICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmZpbmROZXh0Tm9kZShmYWxzZSwgc2tpcEhpZGRlbik7XG4gIH1cblxuICBmaW5kUHJldmlvdXNOb2RlKHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIGxldCBwcmV2aW91c1NpYmxpbmcgPSB0aGlzLmZpbmRQcmV2aW91c1NpYmxpbmcoc2tpcEhpZGRlbik7XG4gICAgaWYgKCFwcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlYWxQYXJlbnRcbiAgICB9XG4gICAgcmV0dXJuIHByZXZpb3VzU2libGluZy5fZ2V0TGFzdE9wZW5EZXNjZW5kYW50KHNraXBIaWRkZW4pO1xuICB9XG5cbiAgX2dldExhc3RPcGVuRGVzY2VuZGFudChza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICBjb25zdCBsYXN0Q2hpbGQgPSB0aGlzLmdldExhc3RDaGlsZChza2lwSGlkZGVuKTtcbiAgICByZXR1cm4gKHRoaXMuaXNDb2xsYXBzZWQgfHwgIWxhc3RDaGlsZClcbiAgICAgID8gdGhpc1xuICAgICAgOiBsYXN0Q2hpbGQuX2dldExhc3RPcGVuRGVzY2VuZGFudChza2lwSGlkZGVuKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFBhcmVudHNDaGlsZHJlbihza2lwSGlkZGVuID0gZmFsc2UpOmFueVtdIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMucGFyZW50ICYmXG4gICAgICAoc2tpcEhpZGRlbiA/IHRoaXMucGFyZW50LmdldFZpc2libGVDaGlsZHJlbigpIDogdGhpcy5wYXJlbnQuY2hpbGRyZW4pO1xuXG4gICAgcmV0dXJuIGNoaWxkcmVuIHx8IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbmRleEluUGFyZW50KHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIHJldHVybiB0aGlzLl9nZXRQYXJlbnRzQ2hpbGRyZW4oc2tpcEhpZGRlbikuaW5kZXhPZih0aGlzKTtcbiAgfVxuXG4gIGlzRGVzY2VuZGFudE9mKG5vZGU6VHJlZU5vZGUpIHtcbiAgICBpZiAodGhpcyA9PT0gbm9kZSkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuaXNEZXNjZW5kYW50T2Yobm9kZSk7XG4gIH1cblxuICBnZXROb2RlUGFkZGluZygpOnN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5sZXZlbFBhZGRpbmcgKiAodGhpcy5sZXZlbCAtIDEpICsgJ3B4JztcbiAgfVxuXG4gIGdldENsYXNzKCk6c3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5vZGVDbGFzcyh0aGlzKTtcbiAgfVxuXG4gIG9uRHJvcCgkZXZlbnQpIHtcbiAgICB0aGlzLm1vdXNlQWN0aW9uKCdkcm9wJywgJGV2ZW50LmV2ZW50LCB7XG4gICAgICBmcm9tOiAkZXZlbnQuZWxlbWVudCxcbiAgICAgIHRvOiB7IHBhcmVudDogdGhpcywgaW5kZXg6IDAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWxsb3dEcm9wVGVtcGxhdGUoZWxlbWVudCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dEcm9wKGVsZW1lbnQsIHsgcGFyZW50OiB0aGlzLCBpbmRleDogMCB9KTtcbiAgfVxuXG5cbiAgLy8gaGVscGVyIG1ldGhvZHM6XG4gIGxvYWRDaGlsZHJlbigpIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5nZXRDaGlsZHJlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIGRvZXNuXFwndCBoYXZlIGNoaWxkcmVuLCBvciBhIGdldENoaWxkcmVuIG1ldGhvZCcpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMub3B0aW9ucy5nZXRDaGlsZHJlbih0aGlzKSlcbiAgICAgIC50aGVuKChjaGlsZHJlbikgPT4ge1xuICAgICAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgICB0aGlzLnNldEZpZWxkKCdjaGlsZHJlbicsIGNoaWxkcmVuKTtcbiAgICAgICAgICB0aGlzLl9pbml0Q2hpbGRyZW4oKTtcbiAgICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hpbGQuZ2V0RmllbGQoJ2lzRXhwYW5kZWQnKSAmJiBjaGlsZC5oYXNDaGlsZHJlbikge1xuICAgICAgICAgICAgICBjaGlsZC5leHBhbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICBpZiAoIXRoaXMuaXNFeHBhbmRlZCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlRXhwYW5kZWQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICBpZiAodGhpcy5pc0V4cGFuZGVkKSB7XG4gICAgICB0aGlzLnRvZ2dsZUV4cGFuZGVkKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlbnN1cmVWaXNpYmxlKCkge1xuICAgIGlmICh0aGlzLnJlYWxQYXJlbnQpIHtcbiAgICAgIHRoaXMucmVhbFBhcmVudC5leHBhbmQoKTtcbiAgICAgIHRoaXMucmVhbFBhcmVudC5lbnN1cmVWaXNpYmxlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgZGVwcmVjYXRlZCgndG9nZ2xlJywgJ3RvZ2dsZUV4cGFuZGVkJyk7XG4gICAgcmV0dXJuIHRoaXMudG9nZ2xlRXhwYW5kZWQoKTtcbiAgfVxuXG4gIHRvZ2dsZUV4cGFuZGVkKCkge1xuICAgIHJldHVybiB0aGlzLnNldElzRXhwYW5kZWQoIXRoaXMuaXNFeHBhbmRlZClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uVG9nZ2xlLCB3YXJuaW5nOiAndGhpcyBldmVudCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIG9uVG9nZ2xlRXhwYW5kZWQgaW5zdGVhZCcsIG5vZGU6IHRoaXMsIGlzRXhwYW5kZWQ6IHRoaXMuaXNFeHBhbmRlZCB9KTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uVG9nZ2xlRXhwYW5kZWQsIG5vZGU6IHRoaXMsIGlzRXhwYW5kZWQ6IHRoaXMuaXNFeHBhbmRlZCB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgc2V0SXNFeHBhbmRlZCh2YWx1ZSkge1xuICAgIHRoaXMudHJlZU1vZGVsLnNldEV4cGFuZGVkTm9kZSh0aGlzLCB2YWx1ZSk7XG5cbiAgICBsZXQgcHJvbWlzZSA9IG51bGw7XG4gICAgaWYgKCF0aGlzLmNoaWxkcmVuICYmIHRoaXMuaGFzQ2hpbGRyZW4gJiYgdmFsdWUpIHtcbiAgICAgIHByb21pc2UgPSB0aGlzLmxvYWRDaGlsZHJlbigpO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlID8gcHJvbWlzZSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICB9O1xuXG4gIHNldElzQWN0aXZlKHZhbHVlLCBtdWx0aSA9IGZhbHNlKSB7XG4gICAgdGhpcy50cmVlTW9kZWwuc2V0QWN0aXZlTm9kZSh0aGlzLCB2YWx1ZSwgbXVsdGkpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdG9nZ2xlQWN0aXZhdGVkKG11bHRpID0gZmFsc2UpIHtcbiAgICB0aGlzLnNldElzQWN0aXZlKCF0aGlzLmlzQWN0aXZlLCBtdWx0aSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldEFjdGl2ZUFuZFZpc2libGUobXVsdGkgPSBmYWxzZSkge1xuICAgIHRoaXMuc2V0SXNBY3RpdmUodHJ1ZSwgbXVsdGkpXG4gICAgICAuZW5zdXJlVmlzaWJsZSgpO1xuXG4gICAgc2V0VGltZW91dCh0aGlzLnNjcm9sbEludG9WaWV3LmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzY3JvbGxJbnRvVmlldygpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50UmVmKSB7XG4gICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBuYXRpdmVFbGVtZW50LnNjcm9sbEludG9WaWV3SWZOZWVkZWQgJiYgbmF0aXZlRWxlbWVudC5zY3JvbGxJbnRvVmlld0lmTmVlZGVkKCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLnRyZWVNb2RlbC5nZXRGb2N1c2VkTm9kZSgpO1xuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzZWROb2RlKHRoaXMpO1xuICAgIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICBpZiAocHJldmlvdXNOb2RlKSB7XG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25CbHVyLCBub2RlOiBwcmV2aW91c05vZGUgfSk7XG4gICAgfVxuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbkZvY3VzLCBub2RlOiB0aGlzIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBibHVyKCkge1xuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLnRyZWVNb2RlbC5nZXRGb2N1c2VkTm9kZSgpO1xuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzZWROb2RlKG51bGwpO1xuICAgIGlmIChwcmV2aW91c05vZGUpIHtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbkJsdXIsIG5vZGU6IHRoaXMgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmaWx0ZXIoZmlsdGVyRm4sIGF1dG9TaG93ID0gZmFsc2UpIHtcbiAgICBsZXQgaXNWaXNpYmxlID0gZmlsdGVyRm4odGhpcyk7XG5cbiAgICBpZiAodGhpcy5jaGlsZHJlbikge1xuICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICBjaGlsZC5maWx0ZXIoZmlsdGVyRm4sIGF1dG9TaG93KTtcbiAgICAgICAgaXNWaXNpYmxlID0gaXNWaXNpYmxlIHx8ICFjaGlsZC5pc0hpZGRlbjtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuaXNIaWRkZW4gPSAhaXNWaXNpYmxlO1xuICAgIGlmIChhdXRvU2hvdykge1xuICAgICAgdGhpcy5lbnN1cmVWaXNpYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJGaWx0ZXIoKSB7XG4gICAgdGhpcy5pc0hpZGRlbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmNoaWxkcmVuKSB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiBjaGlsZC5jbGVhckZpbHRlcigpKTtcbiAgfVxuXG4gIGFsbG93RHJhZygpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsbG93RHJhZztcbiAgfVxuXG4gIG1vdXNlQWN0aW9uKGFjdGlvbk5hbWU6c3RyaW5nLCAkZXZlbnQsIGRhdGE6YW55ID0gbnVsbCkge1xuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzKHRydWUpO1xuXG4gICAgY29uc3QgYWN0aW9uTWFwcGluZyA9IHRoaXMub3B0aW9ucy5hY3Rpb25NYXBwaW5nLm1vdXNlO1xuICAgIGNvbnN0IGFjdGlvbiA9IGFjdGlvbk1hcHBpbmdbYWN0aW9uTmFtZV07XG5cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICBhY3Rpb24odGhpcy50cmVlTW9kZWwsIHRoaXMsICRldmVudCwgZGF0YSk7XG5cbiAgICAgIC8vIFRPRE86IHJlbW92ZSBhZnRlciBkZXByZWNhdGlvbiBvZiBjb250ZXh0IG1lbnUgYW5kIGRibCBjbGlja1xuICAgICAgaWYgKGFjdGlvbk5hbWUgPT09ICdjb250ZXh0TWVudScpIHtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uQ29udGV4dE1lbnUsIG5vZGU6IHRoaXMsIHJhd0V2ZW50OiAkZXZlbnQgfSk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uTmFtZSA9PT0gJ2RibENsaWNrJykge1xuICAgICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25Eb3VibGVDbGljaywgd2FybmluZzogJ1RoaXMgZXZlbnQgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBhY3Rpb25NYXBwaW5nIHRvIGhhbmRsZSBkb3VibGUgY2xpY2tzJywgbm9kZTogdGhpcywgcmF3RXZlbnQ6ICRldmVudCB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfaW5pdENoaWxkcmVuKCkge1xuICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLmdldEZpZWxkKCdjaGlsZHJlbicpXG4gICAgICAubWFwKGMgPT4gbmV3IFRyZWVOb2RlKGMsIHRoaXMsIHRoaXMudHJlZU1vZGVsKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXVpZCgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDAwMDAwKTtcbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19
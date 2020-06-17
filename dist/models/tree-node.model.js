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
import { observable, computed, reaction, action } from 'mobx';
import { TREE_EVENTS } from '../constants/events';
import first from 'lodash/first';
import last from 'lodash/last';
import some from 'lodash/some';
import every from 'lodash/every';
var TreeNode = /** @class */ (function() {
  function TreeNode(data, parent, treeModel, index) {
    var _this = this;
    this.data = data;
    this.parent = parent;
    this.treeModel = treeModel;
    this.position = 0;
    this.allowDrop = function(element, $event) {
      return _this.options.allowDrop(
        element,
        { parent: _this, index: 0 },
        $event
      );
    };
    this.allowDragoverStyling = function() {
      return _this.options.allowDragoverStyling;
    };
    if (this.id === undefined || this.id === null) {
      this.id = uuid();
    } // Make sure there's a unique id without overriding existing ids to work with immutable data structures
    this.index = index;
    if (this.getField('children')) {
      this._initChildren();
    }
    this.autoLoadChildren();
  }
  Object.defineProperty(TreeNode.prototype, 'isHidden', {
    get: function() {
      return this.treeModel.isHidden(this);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'isExpanded', {
    get: function() {
      return this.treeModel.isExpanded(this);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'isActive', {
    get: function() {
      return this.treeModel.isActive(this);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'isFocused', {
    get: function() {
      return this.treeModel.isNodeFocused(this);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'isSelected', {
    get: function() {
      if (this.isSelectable()) {
        return this.treeModel.isSelected(this);
      } else {
        return some(this.children, function(node) {
          return node.isSelected;
        });
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'isAllSelected', {
    get: function() {
      if (this.isSelectable()) {
        return this.treeModel.isSelected(this);
      } else {
        return every(this.children, function(node) {
          return node.isAllSelected;
        });
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'isPartiallySelected', {
    get: function() {
      return this.isSelected && !this.isAllSelected;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'level', {
    get: function() {
      return this.parent ? this.parent.level + 1 : 0;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'path', {
    get: function() {
      return this.parent ? this.parent.path.concat([this.id]) : [];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'elementRef', {
    get: function() {
      throw 'Element Ref is no longer supported since introducing virtual scroll\n\n      You may use a template to obtain a reference to the element';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'originalNode', {
    get: function() {
      return this._originalNode;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'hasChildren', {
    // helper get functions:
    get: function() {
      return !!(
        this.getField('hasChildren') ||
        (this.children && this.children.length > 0)
      );
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'isCollapsed', {
    get: function() {
      return !this.isExpanded;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'isLeaf', {
    get: function() {
      return !this.hasChildren;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'isRoot', {
    get: function() {
      return this.parent.data.virtual;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'realParent', {
    get: function() {
      return this.isRoot ? null : this.parent;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'options', {
    // proxy functions:
    get: function() {
      return this.treeModel.options;
    },
    enumerable: true,
    configurable: true
  });
  TreeNode.prototype.fireEvent = function(event) {
    this.treeModel.fireEvent(event);
  };
  Object.defineProperty(TreeNode.prototype, 'displayField', {
    // field accessors:
    get: function() {
      return this.getField('display');
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNode.prototype, 'id', {
    get: function() {
      return this.getField('id');
    },
    set: function(value) {
      this.setField('id', value);
    },
    enumerable: true,
    configurable: true
  });
  TreeNode.prototype.getField = function(key) {
    return this.data[this.options[key + 'Field']];
  };
  TreeNode.prototype.setField = function(key, value) {
    this.data[this.options[key + 'Field']] = value;
  };
  // traversing:
  TreeNode.prototype._findAdjacentSibling = function(steps, skipHidden) {
    if (skipHidden === void 0) {
      skipHidden = false;
    }
    var siblings = this._getParentsChildren(skipHidden);
    var index = siblings.indexOf(this);
    return siblings.length > index + steps ? siblings[index + steps] : null;
  };
  TreeNode.prototype.findNextSibling = function(skipHidden) {
    if (skipHidden === void 0) {
      skipHidden = false;
    }
    return this._findAdjacentSibling(+1, skipHidden);
  };
  TreeNode.prototype.findPreviousSibling = function(skipHidden) {
    if (skipHidden === void 0) {
      skipHidden = false;
    }
    return this._findAdjacentSibling(-1, skipHidden);
  };
  TreeNode.prototype.getVisibleChildren = function() {
    return this.visibleChildren;
  };
  Object.defineProperty(TreeNode.prototype, 'visibleChildren', {
    get: function() {
      return (this.children || []).filter(function(node) {
        return !node.isHidden;
      });
    },
    enumerable: true,
    configurable: true
  });
  TreeNode.prototype.getFirstChild = function(skipHidden) {
    if (skipHidden === void 0) {
      skipHidden = false;
    }
    var children = skipHidden ? this.visibleChildren : this.children;
    return first(children || []);
  };
  TreeNode.prototype.getLastChild = function(skipHidden) {
    if (skipHidden === void 0) {
      skipHidden = false;
    }
    var children = skipHidden ? this.visibleChildren : this.children;
    return last(children || []);
  };
  TreeNode.prototype.findNextNode = function(goInside, skipHidden) {
    if (goInside === void 0) {
      goInside = true;
    }
    if (skipHidden === void 0) {
      skipHidden = false;
    }
    return (
      (goInside && this.isExpanded && this.getFirstChild(skipHidden)) ||
      this.findNextSibling(skipHidden) ||
      (this.parent && this.parent.findNextNode(false, skipHidden))
    );
  };
  TreeNode.prototype.findPreviousNode = function(skipHidden) {
    if (skipHidden === void 0) {
      skipHidden = false;
    }
    var previousSibling = this.findPreviousSibling(skipHidden);
    if (!previousSibling) {
      return this.realParent;
    }
    return previousSibling._getLastOpenDescendant(skipHidden);
  };
  TreeNode.prototype._getLastOpenDescendant = function(skipHidden) {
    if (skipHidden === void 0) {
      skipHidden = false;
    }
    var lastChild = this.getLastChild(skipHidden);
    return this.isCollapsed || !lastChild
      ? this
      : lastChild._getLastOpenDescendant(skipHidden);
  };
  TreeNode.prototype._getParentsChildren = function(skipHidden) {
    if (skipHidden === void 0) {
      skipHidden = false;
    }
    var children =
      this.parent &&
      (skipHidden ? this.parent.getVisibleChildren() : this.parent.children);
    return children || [];
  };
  TreeNode.prototype.getIndexInParent = function(skipHidden) {
    if (skipHidden === void 0) {
      skipHidden = false;
    }
    return this._getParentsChildren(skipHidden).indexOf(this);
  };
  TreeNode.prototype.isDescendantOf = function(node) {
    if (this === node) return true;
    else return this.parent && this.parent.isDescendantOf(node);
  };
  TreeNode.prototype.getNodePadding = function() {
    return this.options.levelPadding * (this.level - 1) + 'px';
  };
  TreeNode.prototype.getClass = function() {
    return [this.options.nodeClass(this), 'tree-node-level-' + this.level].join(
      ' '
    );
  };
  TreeNode.prototype.onDrop = function($event) {
    this.mouseAction('drop', $event.event, {
      from: $event.element,
      to: { parent: this, index: 0, dropOnNode: true }
    });
  };
  TreeNode.prototype.allowDrag = function() {
    return this.options.allowDrag(this);
  };
  // helper methods:
  TreeNode.prototype.loadNodeChildren = function() {
    var _this = this;
    if (!this.options.getChildren) {
      return Promise.resolve(); // Not getChildren method - for using redux
    }
    return Promise.resolve(this.options.getChildren(this))
      .then(function(children) {
        if (children) {
          _this.setField('children', children);
          _this._initChildren();
          if (_this.options.useTriState && _this.treeModel.isSelected(_this)) {
            _this.setIsSelected(true);
          }
          _this.children.forEach(function(child) {
            if (child.getField('isExpanded') && child.hasChildren) {
              child.expand();
            }
          });
        }
      })
      .then(function() {
        _this.fireEvent({
          eventName: TREE_EVENTS.loadNodeChildren,
          node: _this
        });
      });
  };
  TreeNode.prototype.expand = function() {
    if (!this.isExpanded) {
      this.toggleExpanded();
    }
    return this;
  };
  TreeNode.prototype.collapse = function() {
    if (this.isExpanded) {
      this.toggleExpanded();
    }
    return this;
  };
  TreeNode.prototype.doForAll = function(fn) {
    var _this = this;
    Promise.resolve(fn(this)).then(function() {
      if (_this.children) {
        _this.children.forEach(function(child) {
          return child.doForAll(fn);
        });
      }
    });
  };
  TreeNode.prototype.expandAll = function() {
    this.doForAll(function(node) {
      return node.expand();
    });
  };
  TreeNode.prototype.collapseAll = function() {
    this.doForAll(function(node) {
      return node.collapse();
    });
  };
  TreeNode.prototype.ensureVisible = function() {
    if (this.realParent) {
      this.realParent.expand();
      this.realParent.ensureVisible();
    }
    return this;
  };
  TreeNode.prototype.toggleExpanded = function() {
    this.setIsExpanded(!this.isExpanded);
    return this;
  };
  TreeNode.prototype.setIsExpanded = function(value) {
    if (this.hasChildren) {
      this.treeModel.setExpandedNode(this, value);
    }
    return this;
  };
  TreeNode.prototype.autoLoadChildren = function() {
    var _this = this;
    this.handler = reaction(
      function() {
        return _this.isExpanded;
      },
      function(isExpanded) {
        if (!_this.children && _this.hasChildren && isExpanded) {
          _this.loadNodeChildren();
        }
      },
      { fireImmediately: true }
    );
  };
  TreeNode.prototype.dispose = function() {
    if (this.children) {
      this.children.forEach(function(child) {
        return child.dispose();
      });
    }
    if (this.handler) {
      this.handler();
    }
    this.parent = null;
    this.children = null;
  };
  TreeNode.prototype.setIsActive = function(value, multi) {
    if (multi === void 0) {
      multi = false;
    }
    this.treeModel.setActiveNode(this, value, multi);
    if (value) {
      this.focus(this.options.scrollOnActivate);
    }
    return this;
  };
  TreeNode.prototype.isSelectable = function() {
    return this.isLeaf || !this.children || !this.options.useTriState;
  };
  TreeNode.prototype.setIsSelected = function(value) {
    if (this.isSelectable()) {
      this.treeModel.setSelectedNode(this, value);
    } else {
      this.visibleChildren.forEach(function(child) {
        return child.setIsSelected(value);
      });
    }
    return this;
  };
  TreeNode.prototype.toggleSelected = function() {
    this.setIsSelected(!this.isSelected);
    return this;
  };
  TreeNode.prototype.toggleActivated = function(multi) {
    if (multi === void 0) {
      multi = false;
    }
    this.setIsActive(!this.isActive, multi);
    return this;
  };
  TreeNode.prototype.setActiveAndVisible = function(multi) {
    if (multi === void 0) {
      multi = false;
    }
    this.setIsActive(true, multi).ensureVisible();
    setTimeout(this.scrollIntoView.bind(this));
    return this;
  };
  TreeNode.prototype.scrollIntoView = function(force) {
    if (force === void 0) {
      force = false;
    }
    this.treeModel.virtualScroll.scrollIntoView(this, force);
  };
  TreeNode.prototype.focus = function(scroll) {
    if (scroll === void 0) {
      scroll = true;
    }
    var previousNode = this.treeModel.getFocusedNode();
    this.treeModel.setFocusedNode(this);
    if (scroll) {
      this.scrollIntoView();
    }
    if (previousNode) {
      this.fireEvent({ eventName: TREE_EVENTS.blur, node: previousNode });
    }
    this.fireEvent({ eventName: TREE_EVENTS.focus, node: this });
    return this;
  };
  TreeNode.prototype.blur = function() {
    var previousNode = this.treeModel.getFocusedNode();
    this.treeModel.setFocusedNode(null);
    if (previousNode) {
      this.fireEvent({ eventName: TREE_EVENTS.blur, node: this });
    }
    return this;
  };
  TreeNode.prototype.setIsHidden = function(value) {
    this.treeModel.setIsHidden(this, value);
  };
  TreeNode.prototype.hide = function() {
    this.setIsHidden(true);
  };
  TreeNode.prototype.show = function() {
    this.setIsHidden(false);
  };
  TreeNode.prototype.mouseAction = function(actionName, $event, data) {
    if (data === void 0) {
      data = null;
    }
    this.treeModel.setFocus(true);
    var actionMapping = this.options.actionMapping.mouse;
    var action = actionMapping[actionName];
    if (action) {
      action(this.treeModel, this, $event, data);
    }
  };
  TreeNode.prototype.getSelfHeight = function() {
    return this.options.nodeHeight(this);
  };
  TreeNode.prototype._initChildren = function() {
    var _this = this;
    this.children = this.getField('children').map(function(c, index) {
      return new TreeNode(c, _this, _this.treeModel, index);
    });
  };
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeNode.prototype,
    'isHidden',
    null
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeNode.prototype,
    'isExpanded',
    null
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeNode.prototype,
    'isActive',
    null
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeNode.prototype,
    'isFocused',
    null
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeNode.prototype,
    'isSelected',
    null
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeNode.prototype,
    'isAllSelected',
    null
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeNode.prototype,
    'isPartiallySelected',
    null
  );
  __decorate(
    [observable, __metadata('design:type', Array)],
    TreeNode.prototype,
    'children',
    void 0
  );
  __decorate(
    [observable, __metadata('design:type', Number)],
    TreeNode.prototype,
    'index',
    void 0
  );
  __decorate(
    [observable, __metadata('design:type', Object)],
    TreeNode.prototype,
    'position',
    void 0
  );
  __decorate(
    [observable, __metadata('design:type', Number)],
    TreeNode.prototype,
    'height',
    void 0
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Number),
      __metadata('design:paramtypes', [])
    ],
    TreeNode.prototype,
    'level',
    null
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Array),
      __metadata('design:paramtypes', [])
    ],
    TreeNode.prototype,
    'path',
    null
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeNode.prototype,
    'visibleChildren',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeNode.prototype,
    'setIsSelected',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0)
    ],
    TreeNode.prototype,
    '_initChildren',
    null
  );
  return TreeNode;
})();
export { TreeNode };
function uuid() {
  return Math.floor(Math.random() * 10000000000000);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21vZGVscy90cmVlLW5vZGUubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFXLE1BQU0sRUFBcUIsTUFBTSxNQUFNLENBQUM7QUFJMUYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWxELE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQztBQUNqQyxPQUFPLElBQUksTUFBTSxhQUFhLENBQUM7QUFDL0IsT0FBTyxJQUFJLE1BQU0sYUFBYSxDQUFDO0FBQy9CLE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQztBQUVqQztJQTJDRSxrQkFBbUIsSUFBUyxFQUFTLE1BQWdCLEVBQVMsU0FBb0IsRUFBRSxLQUFhO1FBQWpHLGlCQVVDO1FBVmtCLFNBQUksR0FBSixJQUFJLENBQUs7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFVO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQWpCdEUsYUFBUSxHQUFHLENBQUMsQ0FBQztRQXVKekIsY0FBUyxHQUFHLFVBQUMsT0FBTyxFQUFFLE1BQU87WUFDM0IsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUE7UUFFRCx5QkFBb0IsR0FBRztZQUNyQixPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUM7UUFDM0MsQ0FBQyxDQUFBO1FBM0lDLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDN0MsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUUs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aURBR047SUFDSCxlQUFDO0NBQUEsQUE5WUQsSUE4WUM7U0E5WVksUUFBUTtBQWdackIsU0FBUyxJQUFJO0lBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxjQUFjLENBQUMsQ0FBQztBQUNwRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2JzZXJ2YWJsZSwgY29tcHV0ZWQsIHJlYWN0aW9uLCBhdXRvcnVuLCBhY3Rpb24sIElSZWFjdGlvbkRpc3Bvc2VyIH0gZnJvbSAnbW9ieCc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuL3RyZWUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU9wdGlvbnMgfSBmcm9tICcuL3RyZWUtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQgeyBJVHJlZU5vZGUgfSBmcm9tICcuLi9kZWZzL2FwaSc7XG5pbXBvcnQgeyBUUkVFX0VWRU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xuXG5pbXBvcnQgZmlyc3QgZnJvbSAnbG9kYXNoL2ZpcnN0JztcbmltcG9ydCBsYXN0IGZyb20gJ2xvZGFzaC9sYXN0JztcbmltcG9ydCBzb21lIGZyb20gJ2xvZGFzaC9zb21lJztcbmltcG9ydCBldmVyeSBmcm9tICdsb2Rhc2gvZXZlcnknO1xuXG5leHBvcnQgY2xhc3MgVHJlZU5vZGUgaW1wbGVtZW50cyBJVHJlZU5vZGUge1xuICBwcml2YXRlIGhhbmRsZXI6IElSZWFjdGlvbkRpc3Bvc2VyO1xuICBAY29tcHV0ZWQgZ2V0IGlzSGlkZGVuKCkgeyByZXR1cm4gdGhpcy50cmVlTW9kZWwuaXNIaWRkZW4odGhpcyk7IH07XG4gIEBjb21wdXRlZCBnZXQgaXNFeHBhbmRlZCgpIHsgcmV0dXJuIHRoaXMudHJlZU1vZGVsLmlzRXhwYW5kZWQodGhpcyk7IH07XG4gIEBjb21wdXRlZCBnZXQgaXNBY3RpdmUoKSB7IHJldHVybiB0aGlzLnRyZWVNb2RlbC5pc0FjdGl2ZSh0aGlzKTsgfTtcbiAgQGNvbXB1dGVkIGdldCBpc0ZvY3VzZWQoKSB7IHJldHVybiB0aGlzLnRyZWVNb2RlbC5pc05vZGVGb2N1c2VkKHRoaXMpOyB9O1xuICBAY29tcHV0ZWQgZ2V0IGlzU2VsZWN0ZWQoKSB7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RhYmxlKCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZU1vZGVsLmlzU2VsZWN0ZWQodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzb21lKHRoaXMuY2hpbGRyZW4sIChub2RlOiBUcmVlTm9kZSkgPT4gbm9kZS5pc1NlbGVjdGVkKTtcbiAgICB9XG4gIH07XG4gIEBjb21wdXRlZCBnZXQgaXNBbGxTZWxlY3RlZCgpIHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGFibGUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudHJlZU1vZGVsLmlzU2VsZWN0ZWQodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBldmVyeSh0aGlzLmNoaWxkcmVuLCAobm9kZTogVHJlZU5vZGUpID0+IG5vZGUuaXNBbGxTZWxlY3RlZCk7XG4gICAgfVxuICB9O1xuICBAY29tcHV0ZWQgZ2V0IGlzUGFydGlhbGx5U2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNTZWxlY3RlZCAmJiAhdGhpcy5pc0FsbFNlbGVjdGVkO1xuICB9XG5cbiAgQG9ic2VydmFibGUgY2hpbGRyZW46IFRyZWVOb2RlW107XG4gIEBvYnNlcnZhYmxlIGluZGV4OiBudW1iZXI7XG4gIEBvYnNlcnZhYmxlIHBvc2l0aW9uID0gMDtcbiAgQG9ic2VydmFibGUgaGVpZ2h0OiBudW1iZXI7XG4gIEBjb21wdXRlZCBnZXQgbGV2ZWwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5sZXZlbCArIDEgOiAwO1xuICB9XG4gIEBjb21wdXRlZCBnZXQgcGF0aCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50ID8gWy4uLnRoaXMucGFyZW50LnBhdGgsIHRoaXMuaWRdIDogW107XG4gIH1cblxuICBnZXQgZWxlbWVudFJlZigpOiBhbnkge1xuICAgIHRocm93IGBFbGVtZW50IFJlZiBpcyBubyBsb25nZXIgc3VwcG9ydGVkIHNpbmNlIGludHJvZHVjaW5nIHZpcnR1YWwgc2Nyb2xsXFxuXG4gICAgICBZb3UgbWF5IHVzZSBhIHRlbXBsYXRlIHRvIG9idGFpbiBhIHJlZmVyZW5jZSB0byB0aGUgZWxlbWVudGA7XG4gIH1cblxuICBwcml2YXRlIF9vcmlnaW5hbE5vZGU6IGFueTtcbiAgZ2V0IG9yaWdpbmFsTm9kZSgpIHsgcmV0dXJuIHRoaXMuX29yaWdpbmFsTm9kZTsgfTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YTogYW55LCBwdWJsaWMgcGFyZW50OiBUcmVlTm9kZSwgcHVibGljIHRyZWVNb2RlbDogVHJlZU1vZGVsLCBpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuaWQgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmlkID09PSBudWxsKSB7XG4gICAgICB0aGlzLmlkID0gdXVpZCgpO1xuICAgIH0gLy8gTWFrZSBzdXJlIHRoZXJlJ3MgYSB1bmlxdWUgaWQgd2l0aG91dCBvdmVycmlkaW5nIGV4aXN0aW5nIGlkcyB0byB3b3JrIHdpdGggaW1tdXRhYmxlIGRhdGEgc3RydWN0dXJlc1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcblxuICAgIGlmICh0aGlzLmdldEZpZWxkKCdjaGlsZHJlbicpKSB7XG4gICAgICB0aGlzLl9pbml0Q2hpbGRyZW4oKTtcbiAgICB9XG4gICAgdGhpcy5hdXRvTG9hZENoaWxkcmVuKCk7XG4gIH1cblxuICAvLyBoZWxwZXIgZ2V0IGZ1bmN0aW9uczpcbiAgZ2V0IGhhc0NoaWxkcmVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhISh0aGlzLmdldEZpZWxkKCdoYXNDaGlsZHJlbicpIHx8ICh0aGlzLmNoaWxkcmVuICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkpO1xuICB9XG4gIGdldCBpc0NvbGxhcHNlZCgpOiBib29sZWFuIHsgcmV0dXJuICF0aGlzLmlzRXhwYW5kZWQ7IH1cbiAgZ2V0IGlzTGVhZigpOiBib29sZWFuIHsgcmV0dXJuICF0aGlzLmhhc0NoaWxkcmVuOyB9XG4gIGdldCBpc1Jvb3QoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhcmVudC5kYXRhLnZpcnR1YWw7IH1cbiAgZ2V0IHJlYWxQYXJlbnQoKTogVHJlZU5vZGUgeyByZXR1cm4gdGhpcy5pc1Jvb3QgPyBudWxsIDogdGhpcy5wYXJlbnQ7IH1cblxuICAvLyBwcm94eSBmdW5jdGlvbnM6XG4gIGdldCBvcHRpb25zKCk6IFRyZWVPcHRpb25zIHsgcmV0dXJuIHRoaXMudHJlZU1vZGVsLm9wdGlvbnM7IH1cbiAgZmlyZUV2ZW50KGV2ZW50KSB7IHRoaXMudHJlZU1vZGVsLmZpcmVFdmVudChldmVudCk7IH1cblxuICAvLyBmaWVsZCBhY2Nlc3NvcnM6XG4gIGdldCBkaXNwbGF5RmllbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RmllbGQoJ2Rpc3BsYXknKTtcbiAgfVxuXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRGaWVsZCgnaWQnKTtcbiAgfVxuXG4gIHNldCBpZCh2YWx1ZSkge1xuICAgIHRoaXMuc2V0RmllbGQoJ2lkJywgdmFsdWUpO1xuICB9XG5cbiAgZ2V0RmllbGQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVt0aGlzLm9wdGlvbnNbYCR7a2V5fUZpZWxkYF1dO1xuICB9XG5cbiAgc2V0RmllbGQoa2V5LCB2YWx1ZSkge1xuICAgIHRoaXMuZGF0YVt0aGlzLm9wdGlvbnNbYCR7a2V5fUZpZWxkYF1dID0gdmFsdWU7XG4gIH1cblxuICAvLyB0cmF2ZXJzaW5nOlxuICBfZmluZEFkamFjZW50U2libGluZyhzdGVwcywgc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgY29uc3Qgc2libGluZ3MgPSB0aGlzLl9nZXRQYXJlbnRzQ2hpbGRyZW4oc2tpcEhpZGRlbik7XG4gICAgY29uc3QgaW5kZXggPSBzaWJsaW5ncy5pbmRleE9mKHRoaXMpO1xuXG4gICAgcmV0dXJuIHNpYmxpbmdzLmxlbmd0aCA+IGluZGV4ICsgc3RlcHMgPyBzaWJsaW5nc1tpbmRleCArIHN0ZXBzXSA6IG51bGw7XG4gIH1cblxuICBmaW5kTmV4dFNpYmxpbmcoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbmRBZGphY2VudFNpYmxpbmcoKzEsIHNraXBIaWRkZW4pO1xuICB9XG5cbiAgZmluZFByZXZpb3VzU2libGluZyhza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICByZXR1cm4gdGhpcy5fZmluZEFkamFjZW50U2libGluZygtMSwgc2tpcEhpZGRlbik7XG4gIH1cblxuICBnZXRWaXNpYmxlQ2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMudmlzaWJsZUNoaWxkcmVuO1xuICB9XG5cbiAgQGNvbXB1dGVkIGdldCB2aXNpYmxlQ2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuICh0aGlzLmNoaWxkcmVuIHx8IFtdKS5maWx0ZXIoKG5vZGUpID0+ICFub2RlLmlzSGlkZGVuKTtcbiAgfVxuXG4gIGdldEZpcnN0Q2hpbGQoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgbGV0IGNoaWxkcmVuID0gc2tpcEhpZGRlbiA/IHRoaXMudmlzaWJsZUNoaWxkcmVuIDogdGhpcy5jaGlsZHJlbjtcblxuICAgIHJldHVybiBmaXJzdChjaGlsZHJlbiB8fCBbXSk7XG4gIH1cblxuICBnZXRMYXN0Q2hpbGQoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgbGV0IGNoaWxkcmVuID0gc2tpcEhpZGRlbiA/IHRoaXMudmlzaWJsZUNoaWxkcmVuIDogdGhpcy5jaGlsZHJlbjtcblxuICAgIHJldHVybiBsYXN0KGNoaWxkcmVuIHx8IFtdKTtcbiAgfVxuXG4gIGZpbmROZXh0Tm9kZShnb0luc2lkZSA9IHRydWUsIHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIHJldHVybiBnb0luc2lkZSAmJiB0aGlzLmlzRXhwYW5kZWQgJiYgdGhpcy5nZXRGaXJzdENoaWxkKHNraXBIaWRkZW4pIHx8XG4gICAgICAgICAgIHRoaXMuZmluZE5leHRTaWJsaW5nKHNraXBIaWRkZW4pIHx8XG4gICAgICAgICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmZpbmROZXh0Tm9kZShmYWxzZSwgc2tpcEhpZGRlbik7XG4gIH1cblxuICBmaW5kUHJldmlvdXNOb2RlKHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIGxldCBwcmV2aW91c1NpYmxpbmcgPSB0aGlzLmZpbmRQcmV2aW91c1NpYmxpbmcoc2tpcEhpZGRlbik7XG4gICAgaWYgKCFwcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlYWxQYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBwcmV2aW91c1NpYmxpbmcuX2dldExhc3RPcGVuRGVzY2VuZGFudChza2lwSGlkZGVuKTtcbiAgfVxuXG4gIF9nZXRMYXN0T3BlbkRlc2NlbmRhbnQoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgbGFzdENoaWxkID0gdGhpcy5nZXRMYXN0Q2hpbGQoc2tpcEhpZGRlbik7XG4gICAgcmV0dXJuICh0aGlzLmlzQ29sbGFwc2VkIHx8ICFsYXN0Q2hpbGQpXG4gICAgICA/IHRoaXNcbiAgICAgIDogbGFzdENoaWxkLl9nZXRMYXN0T3BlbkRlc2NlbmRhbnQoc2tpcEhpZGRlbik7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQYXJlbnRzQ2hpbGRyZW4oc2tpcEhpZGRlbiA9IGZhbHNlKTogYW55W10ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5wYXJlbnQgJiZcbiAgICAgIChza2lwSGlkZGVuID8gdGhpcy5wYXJlbnQuZ2V0VmlzaWJsZUNoaWxkcmVuKCkgOiB0aGlzLnBhcmVudC5jaGlsZHJlbik7XG5cbiAgICByZXR1cm4gY2hpbGRyZW4gfHwgW107XG4gIH1cblxuICBwcml2YXRlIGdldEluZGV4SW5QYXJlbnQoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFBhcmVudHNDaGlsZHJlbihza2lwSGlkZGVuKS5pbmRleE9mKHRoaXMpO1xuICB9XG5cbiAgaXNEZXNjZW5kYW50T2Yobm9kZTogVHJlZU5vZGUpIHtcbiAgICBpZiAodGhpcyA9PT0gbm9kZSkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuaXNEZXNjZW5kYW50T2Yobm9kZSk7XG4gIH1cblxuICBnZXROb2RlUGFkZGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubGV2ZWxQYWRkaW5nICogKHRoaXMubGV2ZWwgLSAxKSArICdweCc7XG4gIH1cblxuICBnZXRDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBbdGhpcy5vcHRpb25zLm5vZGVDbGFzcyh0aGlzKSwgYHRyZWUtbm9kZS1sZXZlbC0keyB0aGlzLmxldmVsIH1gXS5qb2luKCcgJyk7XG4gIH1cblxuICBvbkRyb3AoJGV2ZW50KSB7XG4gICAgdGhpcy5tb3VzZUFjdGlvbignZHJvcCcsICRldmVudC5ldmVudCwge1xuICAgICAgZnJvbTogJGV2ZW50LmVsZW1lbnQsXG4gICAgICB0bzogeyBwYXJlbnQ6IHRoaXMsIGluZGV4OiAwLCBkcm9wT25Ob2RlOiB0cnVlIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFsbG93RHJvcCA9IChlbGVtZW50LCAkZXZlbnQ/KSA9PiB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGxvd0Ryb3AoZWxlbWVudCwgeyBwYXJlbnQ6IHRoaXMsIGluZGV4OiAwIH0sICRldmVudCk7XG4gIH1cblxuICBhbGxvd0RyYWdvdmVyU3R5bGluZyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsbG93RHJhZ292ZXJTdHlsaW5nO1xuICB9XG5cbiAgYWxsb3dEcmFnKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dEcmFnKHRoaXMpO1xuICB9XG5cblxuICAvLyBoZWxwZXIgbWV0aG9kczpcbiAgbG9hZE5vZGVDaGlsZHJlbigpIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5nZXRDaGlsZHJlbikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpOyAvLyBOb3QgZ2V0Q2hpbGRyZW4gbWV0aG9kIC0gZm9yIHVzaW5nIHJlZHV4XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5vcHRpb25zLmdldENoaWxkcmVuKHRoaXMpKVxuICAgICAgLnRoZW4oKGNoaWxkcmVuKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICAgIHRoaXMuc2V0RmllbGQoJ2NoaWxkcmVuJywgY2hpbGRyZW4pO1xuICAgICAgICAgIHRoaXMuX2luaXRDaGlsZHJlbigpO1xuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXNlVHJpU3RhdGUgJiYgdGhpcy50cmVlTW9kZWwuaXNTZWxlY3RlZCh0aGlzKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJc1NlbGVjdGVkKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hpbGQuZ2V0RmllbGQoJ2lzRXhwYW5kZWQnKSAmJiBjaGlsZC5oYXNDaGlsZHJlbikge1xuICAgICAgICAgICAgICBjaGlsZC5leHBhbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH19KS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoe1xuICAgICAgICAgIGV2ZW50TmFtZTogVFJFRV9FVkVOVFMubG9hZE5vZGVDaGlsZHJlbixcbiAgICAgICAgICBub2RlOiB0aGlzXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgaWYgKCF0aGlzLmlzRXhwYW5kZWQpIHtcbiAgICAgIHRoaXMudG9nZ2xlRXhwYW5kZWQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvbGxhcHNlKCkge1xuICAgIGlmICh0aGlzLmlzRXhwYW5kZWQpIHtcbiAgICAgIHRoaXMudG9nZ2xlRXhwYW5kZWQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRvRm9yQWxsKGZuOiAobm9kZTogSVRyZWVOb2RlKSA9PiBhbnkpIHtcbiAgICBQcm9taXNlLnJlc29sdmUoZm4odGhpcykpLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gY2hpbGQuZG9Gb3JBbGwoZm4pKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGV4cGFuZEFsbCgpIHtcbiAgICB0aGlzLmRvRm9yQWxsKChub2RlKSA9PiBub2RlLmV4cGFuZCgpKTtcbiAgfVxuXG4gIGNvbGxhcHNlQWxsKCkge1xuICAgIHRoaXMuZG9Gb3JBbGwoKG5vZGUpID0+IG5vZGUuY29sbGFwc2UoKSk7XG4gIH1cblxuICBlbnN1cmVWaXNpYmxlKCkge1xuICAgIGlmICh0aGlzLnJlYWxQYXJlbnQpIHtcbiAgICAgIHRoaXMucmVhbFBhcmVudC5leHBhbmQoKTtcbiAgICAgIHRoaXMucmVhbFBhcmVudC5lbnN1cmVWaXNpYmxlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0b2dnbGVFeHBhbmRlZCgpIHtcbiAgICB0aGlzLnNldElzRXhwYW5kZWQoIXRoaXMuaXNFeHBhbmRlZCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldElzRXhwYW5kZWQodmFsdWUpIHtcbiAgICBpZiAodGhpcy5oYXNDaGlsZHJlbikge1xuICAgICAgdGhpcy50cmVlTW9kZWwuc2V0RXhwYW5kZWROb2RlKHRoaXMsIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBhdXRvTG9hZENoaWxkcmVuKCkge1xuICAgIHRoaXMuaGFuZGxlciA9XG4gICAgICByZWFjdGlvbihcbiAgICAgICAgKCkgPT4gdGhpcy5pc0V4cGFuZGVkLFxuICAgICAgICAoaXNFeHBhbmRlZCkgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5jaGlsZHJlbiAmJiB0aGlzLmhhc0NoaWxkcmVuICYmIGlzRXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZE5vZGVDaGlsZHJlbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgeyBmaXJlSW1tZWRpYXRlbHk6IHRydWUgfVxuICAgICAgKTtcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgaWYgKHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGNoaWxkLmRpc3Bvc2UoKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmhhbmRsZXIpIHtcbiAgICAgIHRoaXMuaGFuZGxlcigpO1xuICAgIH1cbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5jaGlsZHJlbiA9IG51bGw7XG4gIH1cblxuICBzZXRJc0FjdGl2ZSh2YWx1ZSwgbXVsdGkgPSBmYWxzZSkge1xuICAgIHRoaXMudHJlZU1vZGVsLnNldEFjdGl2ZU5vZGUodGhpcywgdmFsdWUsIG11bHRpKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuZm9jdXModGhpcy5vcHRpb25zLnNjcm9sbE9uQWN0aXZhdGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaXNTZWxlY3RhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzTGVhZiB8fCAhdGhpcy5jaGlsZHJlbiB8fCAhdGhpcy5vcHRpb25zLnVzZVRyaVN0YXRlO1xuICB9XG5cbiAgQGFjdGlvbiBzZXRJc1NlbGVjdGVkKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RhYmxlKCkpIHtcbiAgICAgIHRoaXMudHJlZU1vZGVsLnNldFNlbGVjdGVkTm9kZSh0aGlzLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlzaWJsZUNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiBjaGlsZC5zZXRJc1NlbGVjdGVkKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0b2dnbGVTZWxlY3RlZCgpIHtcbiAgICB0aGlzLnNldElzU2VsZWN0ZWQoIXRoaXMuaXNTZWxlY3RlZCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRvZ2dsZUFjdGl2YXRlZChtdWx0aSA9IGZhbHNlKSB7XG4gICAgdGhpcy5zZXRJc0FjdGl2ZSghdGhpcy5pc0FjdGl2ZSwgbXVsdGkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRBY3RpdmVBbmRWaXNpYmxlKG11bHRpID0gZmFsc2UpIHtcbiAgICB0aGlzLnNldElzQWN0aXZlKHRydWUsIG11bHRpKVxuICAgICAgLmVuc3VyZVZpc2libGUoKTtcblxuICAgIHNldFRpbWVvdXQodGhpcy5zY3JvbGxJbnRvVmlldy5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2Nyb2xsSW50b1ZpZXcoZm9yY2UgPSBmYWxzZSkge1xuICAgIHRoaXMudHJlZU1vZGVsLnZpcnR1YWxTY3JvbGwuc2Nyb2xsSW50b1ZpZXcodGhpcywgZm9yY2UpO1xuICB9XG5cbiAgZm9jdXMoc2Nyb2xsID0gdHJ1ZSkge1xuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLnRyZWVNb2RlbC5nZXRGb2N1c2VkTm9kZSgpO1xuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzZWROb2RlKHRoaXMpO1xuICAgIGlmIChzY3JvbGwpIHtcbiAgICAgIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICB9XG4gICAgaWYgKHByZXZpb3VzTm9kZSkge1xuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmJsdXIsIG5vZGU6IHByZXZpb3VzTm9kZSB9KTtcbiAgICB9XG4gICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmZvY3VzLCBub2RlOiB0aGlzIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBibHVyKCkge1xuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLnRyZWVNb2RlbC5nZXRGb2N1c2VkTm9kZSgpO1xuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzZWROb2RlKG51bGwpO1xuICAgIGlmIChwcmV2aW91c05vZGUpIHtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5ibHVyLCBub2RlOiB0aGlzIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0SXNIaWRkZW4odmFsdWUpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRJc0hpZGRlbih0aGlzLCB2YWx1ZSk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMuc2V0SXNIaWRkZW4odHJ1ZSk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMuc2V0SXNIaWRkZW4oZmFsc2UpO1xuICB9XG5cbiAgbW91c2VBY3Rpb24oYWN0aW9uTmFtZTogc3RyaW5nLCAkZXZlbnQsIGRhdGE6IGFueSA9IG51bGwpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1cyh0cnVlKTtcblxuICAgIGNvbnN0IGFjdGlvbk1hcHBpbmcgPSB0aGlzLm9wdGlvbnMuYWN0aW9uTWFwcGluZy5tb3VzZTtcbiAgICBjb25zdCBhY3Rpb24gPSBhY3Rpb25NYXBwaW5nW2FjdGlvbk5hbWVdO1xuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgYWN0aW9uKHRoaXMudHJlZU1vZGVsLCB0aGlzLCAkZXZlbnQsIGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGdldFNlbGZIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5ub2RlSGVpZ2h0KHRoaXMpO1xuICB9XG5cbiAgQGFjdGlvbiBfaW5pdENoaWxkcmVuKCkge1xuICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLmdldEZpZWxkKCdjaGlsZHJlbicpXG4gICAgICAubWFwKChjLCBpbmRleCkgPT4gbmV3IFRyZWVOb2RlKGMsIHRoaXMsIHRoaXMudHJlZU1vZGVsLCBpbmRleCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHV1aWQoKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDAwMDAwMCk7XG59XG4iXX0=

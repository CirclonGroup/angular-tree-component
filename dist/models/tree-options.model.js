"use strict";
var keys_1 = require("../constants/keys");
var deprecated_1 = require("../deprecated");
var lodash_1 = require("lodash");
exports.TREE_ACTIONS = {
    TOGGLE_SELECTED: function (tree, node, $event) { return node.toggleActivated(); },
    TOGGLE_SELECTED_MULTI: function (tree, node, $event) { return node.toggleActivated(true); },
    SELECT: function (tree, node, $event) { return node.setIsActive(true); },
    DESELECT: function (tree, node, $event) { return node.setIsActive(false); },
    FOCUS: function (tree, node, $event) { return node.focus(); },
    TOGGLE_EXPANDED: function (tree, node, $event) { return node.hasChildren && node.toggleExpanded(); },
    EXPAND: function (tree, node, $event) { return node.expand(); },
    COLLAPSE: function (tree, node, $event) { return node.collapse(); },
    DRILL_DOWN: function (tree, node, $event) { return tree.focusDrillDown(); },
    DRILL_UP: function (tree, node, $event) { return tree.focusDrillUp(); },
    NEXT_NODE: function (tree, node, $event) { return tree.focusNextNode(); },
    PREVIOUS_NODE: function (tree, node, $event) { return tree.focusPreviousNode(); },
    MOVE_NODE: function (tree, node, $event, _a) {
        var from = _a.from, to = _a.to;
        // default action assumes from = node, to = {parent, index}
        tree.moveNode(from, to);
    }
};
var defaultActionMapping = {
    mouse: {
        click: exports.TREE_ACTIONS.TOGGLE_SELECTED,
        dblClick: null,
        contextMenu: null,
        expanderClick: exports.TREE_ACTIONS.TOGGLE_EXPANDED,
        drop: exports.TREE_ACTIONS.MOVE_NODE
    },
    keys: (_a = {},
        _a[keys_1.KEYS.RIGHT] = exports.TREE_ACTIONS.DRILL_DOWN,
        _a[keys_1.KEYS.LEFT] = exports.TREE_ACTIONS.DRILL_UP,
        _a[keys_1.KEYS.DOWN] = exports.TREE_ACTIONS.NEXT_NODE,
        _a[keys_1.KEYS.UP] = exports.TREE_ACTIONS.PREVIOUS_NODE,
        _a[keys_1.KEYS.SPACE] = exports.TREE_ACTIONS.TOGGLE_SELECTED,
        _a[keys_1.KEYS.ENTER] = exports.TREE_ACTIONS.TOGGLE_SELECTED,
        _a)
};
var TreeOptions = (function () {
    function TreeOptions(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.actionMapping = lodash_1.defaultsDeep(this.options.actionMapping, defaultActionMapping);
        if (options.hasCustomContextMenu) {
            deprecated_1.deprecated('hasCustomContextMenu', 'actionMapping: mouse: contextMenu');
        }
        if (options.context) {
            deprecated_1.deprecated('context', 'values directly in a template in the content of the <Tree> component like this: <Tree><template #treeNodeTemplate let-node>{{ outsideValue }}</template></Tree>.  If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule');
        }
        if (options.treeNodeTemplate) {
            deprecated_1.deprecated('treeNodeTemplate', 'a template in the content of the <Tree> component like this: <Tree><template #treeNodeTemplate let-node>...</template></Tree>.  If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule');
        }
        if (options.loadingComponent) {
            deprecated_1.deprecated('loadingComponent', 'a template in the content of the <Tree> component like this: <Tree><template #loadingTemplate>...</template></Tree>.  If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule');
        }
        if (lodash_1.get(options, 'mouse.shift')) {
            deprecated_1.deprecated('mouse.shift', '$event.shiftKey in click action instead');
        }
        if (lodash_1.get(options, 'mouse.ctrl')) {
            deprecated_1.deprecated('mouse.ctrl', '$event.ctrlKey in click action instead');
        }
        if (lodash_1.get(options, 'mouse.alt')) {
            deprecated_1.deprecated('mouse.alt', '$event.altKey in click action instead');
        }
    }
    Object.defineProperty(TreeOptions.prototype, "childrenField", {
        get: function () { return this.options.childrenField || 'children'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "displayField", {
        get: function () { return this.options.displayField || 'name'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "idField", {
        get: function () { return this.options.idField || 'id'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "isExpandedField", {
        get: function () { return this.options.isExpandedField || 'isExpanded'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "isHiddenField", {
        get: function () { return this.options.isHiddenField || 'isHidden'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "treeNodeTemplate", {
        get: function () { return this.options.treeNodeTemplate; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "loadingComponent", {
        get: function () { return this.options.loadingComponent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "getChildren", {
        get: function () { return this.options.getChildren; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "hasCustomContextMenu", {
        get: function () { return this.options.hasCustomContextMenu; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "context", {
        get: function () { return this.options.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "allowDrag", {
        get: function () { return this.options.allowDrag; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "levelPadding", {
        get: function () { return this.options.levelPadding || 0; },
        enumerable: true,
        configurable: true
    });
    TreeOptions.prototype.allowDrop = function (element, to) {
        if (this.options.allowDrop instanceof Function) {
            return this.options.allowDrop(element, to);
        }
        else {
            return this.options.allowDrop === undefined ? true : this.options.allowDrop;
        }
    };
    TreeOptions.prototype.nodeClass = function (node) {
        return this.options.nodeClass ? this.options.nodeClass(node) : '';
    };
    return TreeOptions;
}());
exports.TreeOptions = TreeOptions;
var _a;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1vcHRpb25zLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21vZGVscy90cmVlLW9wdGlvbnMubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLDBDQUF5QztBQUN6Qyw0Q0FBMkM7QUFHM0MsaUNBQTJDO0FBTTlCLFFBQUEsWUFBWSxHQUFHO0lBQzFCLGVBQWUsRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUF0QixDQUFzQjtJQUN0RixxQkFBcUIsRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBMUIsQ0FBMEI7SUFDaEcsTUFBTSxFQUFFLFVBQUMsSUFBYyxFQUFFLElBQWEsRUFBRSxNQUFVLElBQUssT0FBQSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUF0QixDQUFzQjtJQUM3RSxRQUFRLEVBQUUsVUFBQyxJQUFjLEVBQUUsSUFBYSxFQUFFLE1BQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQXZCLENBQXVCO0lBQ2hGLEtBQUssRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFaLENBQVk7SUFDbEUsZUFBZSxFQUFFLFVBQUMsSUFBYyxFQUFFLElBQWEsRUFBRSxNQUFVLElBQUssT0FBQSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBekMsQ0FBeUM7SUFDekcsTUFBTSxFQUFFLFVBQUMsSUFBYyxFQUFFLElBQWEsRUFBRSxNQUFVLElBQUssT0FBQSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQWIsQ0FBYTtJQUNwRSxRQUFRLEVBQUUsVUFBQyxJQUFjLEVBQUUsSUFBYSxFQUFFLE1BQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBZixDQUFlO0lBQ3hFLFVBQVUsRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFyQixDQUFxQjtJQUNoRixRQUFRLEVBQUUsVUFBQyxJQUFjLEVBQUUsSUFBYSxFQUFFLE1BQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBbkIsQ0FBbUI7SUFDNUUsU0FBUyxFQUFFLFVBQUMsSUFBYyxFQUFFLElBQWEsRUFBRSxNQUFVLElBQU0sT0FBQSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CO0lBQy9FLGFBQWEsRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFNLE9BQUEsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQXhCLENBQXdCO0lBQ3ZGLFNBQVMsRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxFQUFFLEVBQThCO1lBQTdCLGNBQUksRUFBRyxVQUFFO1FBQy9ELDJEQUEyRDtRQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0YsQ0FBQTtBQUVELElBQU0sb0JBQW9CLEdBQWtCO0lBQzFDLEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxvQkFBWSxDQUFDLGVBQWU7UUFDbkMsUUFBUSxFQUFFLElBQUk7UUFDZCxXQUFXLEVBQUUsSUFBSTtRQUNqQixhQUFhLEVBQUUsb0JBQVksQ0FBQyxlQUFlO1FBQzNDLElBQUksRUFBRSxvQkFBWSxDQUFDLFNBQVM7S0FDN0I7SUFDRCxJQUFJO1FBQ0YsR0FBQyxXQUFJLENBQUMsS0FBSyxJQUFHLG9CQUFZLENBQUMsVUFBVTtRQUNyQyxHQUFDLFdBQUksQ0FBQyxJQUFJLElBQUcsb0JBQVksQ0FBQyxRQUFRO1FBQ2xDLEdBQUMsV0FBSSxDQUFDLElBQUksSUFBRyxvQkFBWSxDQUFDLFNBQVM7UUFDbkMsR0FBQyxXQUFJLENBQUMsRUFBRSxJQUFHLG9CQUFZLENBQUMsYUFBYTtRQUNyQyxHQUFDLFdBQUksQ0FBQyxLQUFLLElBQUcsb0JBQVksQ0FBQyxlQUFlO1FBQzFDLEdBQUMsV0FBSSxDQUFDLEtBQUssSUFBRyxvQkFBWSxDQUFDLGVBQWU7V0FDM0M7Q0FDRixDQUFDO0FBbUJGO0lBZUUscUJBQW9CLE9BQXlCO1FBQXpCLHdCQUFBLEVBQUEsWUFBeUI7UUFBekIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxxQkFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFFcEYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztZQUNqQyx1QkFBVSxDQUFDLHNCQUFzQixFQUFFLG1DQUFtQyxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLHVCQUFVLENBQUMsU0FBUyxFQUFFLHlRQUF5USxDQUFDLENBQUM7UUFDblMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDN0IsdUJBQVUsQ0FBQyxrQkFBa0IsRUFBRSx1T0FBdU8sQ0FBQyxDQUFDO1FBQzFRLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzdCLHVCQUFVLENBQUMsa0JBQWtCLEVBQUUsNk5BQTZOLENBQUMsQ0FBQztRQUNoUSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsWUFBRyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsdUJBQVUsQ0FBQyxhQUFhLEVBQUUseUNBQXlDLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsWUFBRyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsdUJBQVUsQ0FBQyxZQUFZLEVBQUUsd0NBQXdDLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsWUFBRyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsdUNBQXVDLENBQUMsQ0FBQztRQUNuRSxDQUFDO0lBQ0gsQ0FBQztJQTVDRCxzQkFBSSxzQ0FBYTthQUFqQixjQUE4QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUksVUFBVSxDQUFBLENBQUEsQ0FBQzs7O09BQUE7SUFDOUUsc0JBQUkscUNBQVk7YUFBaEIsY0FBNkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQSxDQUFBLENBQUM7OztPQUFBO0lBQ3hFLHNCQUFJLGdDQUFPO2FBQVgsY0FBd0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQSxDQUFBLENBQUM7OztPQUFBO0lBQzVELHNCQUFJLHdDQUFlO2FBQW5CLGNBQWdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsSUFBSSxZQUFZLENBQUEsQ0FBQSxDQUFDOzs7T0FBQTtJQUNwRixzQkFBSSxzQ0FBYTthQUFqQixjQUE4QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUksVUFBVSxDQUFBLENBQUEsQ0FBQzs7O09BQUE7SUFDOUUsc0JBQUkseUNBQWdCO2FBQXBCLGNBQThCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFBLENBQUMsQ0FBQzs7O09BQUE7SUFDcEUsc0JBQUkseUNBQWdCO2FBQXBCLGNBQThCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFBLENBQUMsQ0FBQzs7O09BQUE7SUFDcEUsc0JBQUksb0NBQVc7YUFBZixjQUF5QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUEsQ0FBQyxDQUFDOzs7T0FBQTtJQUMxRCxzQkFBSSw2Q0FBb0I7YUFBeEIsY0FBc0MsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUEsQ0FBQyxDQUFDOzs7T0FBQTtJQUNoRixzQkFBSSxnQ0FBTzthQUFYLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQSxDQUFDLENBQUM7OztPQUFBO0lBQ2xELHNCQUFJLGtDQUFTO2FBQWIsY0FBMkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFBLENBQUMsQ0FBQzs7O09BQUE7SUFDMUQsc0JBQUkscUNBQVk7YUFBaEIsY0FBNkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUM7OztPQUFBO0lBa0NwRSwrQkFBUyxHQUFULFVBQVUsT0FBTyxFQUFFLEVBQUU7UUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLFlBQVksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQzlFLENBQUM7SUFDSCxDQUFDO0lBQ0QsK0JBQVMsR0FBVCxVQUFVLElBQWM7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNwRSxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBekRELElBeURDO0FBekRZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuL3RyZWUubW9kZWwnO1xuaW1wb3J0IHsgS0VZUyB9IGZyb20gJy4uL2NvbnN0YW50cy9rZXlzJztcbmltcG9ydCB7IGRlcHJlY2F0ZWQgfSBmcm9tICcuLi9kZXByZWNhdGVkJztcbmltcG9ydCB7IElUcmVlT3B0aW9ucyB9IGZyb20gJy4uL2RlZnMvYXBpJztcblxuaW1wb3J0IHsgZGVmYXVsdHNEZWVwLCBnZXQgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25IYW5kbGVyIHtcbiAgKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55LCAuLi5yZXN0KTtcbn1cblxuZXhwb3J0IGNvbnN0IFRSRUVfQUNUSU9OUyA9IHtcbiAgVE9HR0xFX1NFTEVDVEVEOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUudG9nZ2xlQWN0aXZhdGVkKCksXG4gIFRPR0dMRV9TRUxFQ1RFRF9NVUxUSTogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLnRvZ2dsZUFjdGl2YXRlZCh0cnVlKSxcbiAgU0VMRUNUOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUuc2V0SXNBY3RpdmUodHJ1ZSksXG4gIERFU0VMRUNUOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUuc2V0SXNBY3RpdmUoZmFsc2UpLFxuICBGT0NVUzogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLmZvY3VzKCksXG4gIFRPR0dMRV9FWFBBTkRFRDogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLmhhc0NoaWxkcmVuICYmIG5vZGUudG9nZ2xlRXhwYW5kZWQoKSxcbiAgRVhQQU5EOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUuZXhwYW5kKCksXG4gIENPTExBUFNFOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUuY29sbGFwc2UoKSxcbiAgRFJJTExfRE9XTjogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiB0cmVlLmZvY3VzRHJpbGxEb3duKCksXG4gIERSSUxMX1VQOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IHRyZWUuZm9jdXNEcmlsbFVwKCksXG4gIE5FWFRfTk9ERTogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiAgdHJlZS5mb2N1c05leHROb2RlKCksXG4gIFBSRVZJT1VTX05PREU6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gIHRyZWUuZm9jdXNQcmV2aW91c05vZGUoKSxcbiAgTU9WRV9OT0RFOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnksIHtmcm9tICwgdG99Ontmcm9tOmFueSwgdG86YW55fSkgPT4ge1xuICAgIC8vIGRlZmF1bHQgYWN0aW9uIGFzc3VtZXMgZnJvbSA9IG5vZGUsIHRvID0ge3BhcmVudCwgaW5kZXh9XG4gICAgdHJlZS5tb3ZlTm9kZShmcm9tLCB0byk7XG4gIH1cbn1cblxuY29uc3QgZGVmYXVsdEFjdGlvbk1hcHBpbmc6SUFjdGlvbk1hcHBpbmcgPSB7XG4gIG1vdXNlOiB7XG4gICAgY2xpY2s6IFRSRUVfQUNUSU9OUy5UT0dHTEVfU0VMRUNURUQsXG4gICAgZGJsQ2xpY2s6IG51bGwsXG4gICAgY29udGV4dE1lbnU6IG51bGwsXG4gICAgZXhwYW5kZXJDbGljazogVFJFRV9BQ1RJT05TLlRPR0dMRV9FWFBBTkRFRCxcbiAgICBkcm9wOiBUUkVFX0FDVElPTlMuTU9WRV9OT0RFXG4gIH0sXG4gIGtleXM6IHtcbiAgICBbS0VZUy5SSUdIVF06IFRSRUVfQUNUSU9OUy5EUklMTF9ET1dOLFxuICAgIFtLRVlTLkxFRlRdOiBUUkVFX0FDVElPTlMuRFJJTExfVVAsXG4gICAgW0tFWVMuRE9XTl06IFRSRUVfQUNUSU9OUy5ORVhUX05PREUsXG4gICAgW0tFWVMuVVBdOiBUUkVFX0FDVElPTlMuUFJFVklPVVNfTk9ERSxcbiAgICBbS0VZUy5TUEFDRV06IFRSRUVfQUNUSU9OUy5UT0dHTEVfU0VMRUNURUQsXG4gICAgW0tFWVMuRU5URVJdOiBUUkVFX0FDVElPTlMuVE9HR0xFX1NFTEVDVEVEXG4gIH1cbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbk1hcHBpbmcge1xuICBtb3VzZT86IHtcbiAgICBjbGljaz86IElBY3Rpb25IYW5kbGVyLFxuICAgIGRibENsaWNrPzogSUFjdGlvbkhhbmRsZXIsXG4gICAgY29udGV4dE1lbnU/OiBJQWN0aW9uSGFuZGxlcixcbiAgICBleHBhbmRlckNsaWNrPzogSUFjdGlvbkhhbmRsZXIsXG4gICAgZHJhZ1N0YXJ0PzogSUFjdGlvbkhhbmRsZXIsXG4gICAgZHJhZz86IElBY3Rpb25IYW5kbGVyLFxuICAgIGRyYWdFbmQ/OiBJQWN0aW9uSGFuZGxlcixcbiAgICBkcmFnT3Zlcj86IElBY3Rpb25IYW5kbGVyLFxuICAgIGRyb3A/OiBJQWN0aW9uSGFuZGxlclxuICB9LFxuICBrZXlzPzoge1xuICAgIFtrZXk6bnVtYmVyXTogSUFjdGlvbkhhbmRsZXJcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVHJlZU9wdGlvbnMge1xuICBnZXQgY2hpbGRyZW5GaWVsZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcHRpb25zLmNoaWxkcmVuRmllbGQgfHwgJ2NoaWxkcmVuJ31cbiAgZ2V0IGRpc3BsYXlGaWVsZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcHRpb25zLmRpc3BsYXlGaWVsZCB8fCAnbmFtZSd9XG4gIGdldCBpZEZpZWxkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm9wdGlvbnMuaWRGaWVsZCB8fCAnaWQnfVxuICBnZXQgaXNFeHBhbmRlZEZpZWxkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm9wdGlvbnMuaXNFeHBhbmRlZEZpZWxkIHx8ICdpc0V4cGFuZGVkJ31cbiAgZ2V0IGlzSGlkZGVuRmllbGQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5pc0hpZGRlbkZpZWxkIHx8ICdpc0hpZGRlbid9XG4gIGdldCB0cmVlTm9kZVRlbXBsYXRlKCk6IGFueSB7IHJldHVybiB0aGlzLm9wdGlvbnMudHJlZU5vZGVUZW1wbGF0ZSB9XG4gIGdldCBsb2FkaW5nQ29tcG9uZW50KCk6IGFueSB7IHJldHVybiB0aGlzLm9wdGlvbnMubG9hZGluZ0NvbXBvbmVudCB9XG4gIGdldCBnZXRDaGlsZHJlbigpOiBhbnkgeyByZXR1cm4gdGhpcy5vcHRpb25zLmdldENoaWxkcmVuIH1cbiAgZ2V0IGhhc0N1c3RvbUNvbnRleHRNZW51KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5vcHRpb25zLmhhc0N1c3RvbUNvbnRleHRNZW51IH1cbiAgZ2V0IGNvbnRleHQoKTogYW55IHsgcmV0dXJuIHRoaXMub3B0aW9ucy5jb250ZXh0IH1cbiAgZ2V0IGFsbG93RHJhZygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGxvd0RyYWcgfVxuICBnZXQgbGV2ZWxQYWRkaW5nKCk6IG51bWJlciB7IHJldHVybiB0aGlzLm9wdGlvbnMubGV2ZWxQYWRkaW5nIHx8IDAgfVxuICBhY3Rpb25NYXBwaW5nOiBJQWN0aW9uTWFwcGluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6SVRyZWVPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmFjdGlvbk1hcHBpbmcgPSBkZWZhdWx0c0RlZXAodGhpcy5vcHRpb25zLmFjdGlvbk1hcHBpbmcsIGRlZmF1bHRBY3Rpb25NYXBwaW5nKTtcblxuICAgIGlmIChvcHRpb25zLmhhc0N1c3RvbUNvbnRleHRNZW51KSB7XG4gICAgICBkZXByZWNhdGVkKCdoYXNDdXN0b21Db250ZXh0TWVudScsICdhY3Rpb25NYXBwaW5nOiBtb3VzZTogY29udGV4dE1lbnUnKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5jb250ZXh0KSB7XG4gICAgICBkZXByZWNhdGVkKCdjb250ZXh0JywgJ3ZhbHVlcyBkaXJlY3RseSBpbiBhIHRlbXBsYXRlIGluIHRoZSBjb250ZW50IG9mIHRoZSA8VHJlZT4gY29tcG9uZW50IGxpa2UgdGhpczogPFRyZWU+PHRlbXBsYXRlICN0cmVlTm9kZVRlbXBsYXRlIGxldC1ub2RlPnt7IG91dHNpZGVWYWx1ZSB9fTwvdGVtcGxhdGU+PC9UcmVlPi4gIElmIHlvdSBkb25cXCd0IGhhdmUgdGltZSB0byB1cGRhdGUgeW91ciBjb2RlIGFuZCBkb25cXCd0IG5lZWQgQW9UIGNvbXBpbGF0aW9uLCB1c2UgRGVwcmVjYXRlZFRyZWVNb2R1bGUnKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy50cmVlTm9kZVRlbXBsYXRlKSB7XG4gICAgICBkZXByZWNhdGVkKCd0cmVlTm9kZVRlbXBsYXRlJywgJ2EgdGVtcGxhdGUgaW4gdGhlIGNvbnRlbnQgb2YgdGhlIDxUcmVlPiBjb21wb25lbnQgbGlrZSB0aGlzOiA8VHJlZT48dGVtcGxhdGUgI3RyZWVOb2RlVGVtcGxhdGUgbGV0LW5vZGU+Li4uPC90ZW1wbGF0ZT48L1RyZWU+LiAgSWYgeW91IGRvblxcJ3QgaGF2ZSB0aW1lIHRvIHVwZGF0ZSB5b3VyIGNvZGUgYW5kIGRvblxcJ3QgbmVlZCBBb1QgY29tcGlsYXRpb24sIHVzZSBEZXByZWNhdGVkVHJlZU1vZHVsZScpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmxvYWRpbmdDb21wb25lbnQpIHtcbiAgICAgIGRlcHJlY2F0ZWQoJ2xvYWRpbmdDb21wb25lbnQnLCAnYSB0ZW1wbGF0ZSBpbiB0aGUgY29udGVudCBvZiB0aGUgPFRyZWU+IGNvbXBvbmVudCBsaWtlIHRoaXM6IDxUcmVlPjx0ZW1wbGF0ZSAjbG9hZGluZ1RlbXBsYXRlPi4uLjwvdGVtcGxhdGU+PC9UcmVlPi4gIElmIHlvdSBkb25cXCd0IGhhdmUgdGltZSB0byB1cGRhdGUgeW91ciBjb2RlIGFuZCBkb25cXCd0IG5lZWQgQW9UIGNvbXBpbGF0aW9uLCB1c2UgRGVwcmVjYXRlZFRyZWVNb2R1bGUnKTtcbiAgICB9XG5cbiAgICBpZiAoZ2V0KG9wdGlvbnMsICdtb3VzZS5zaGlmdCcpKSB7XG4gICAgICBkZXByZWNhdGVkKCdtb3VzZS5zaGlmdCcsICckZXZlbnQuc2hpZnRLZXkgaW4gY2xpY2sgYWN0aW9uIGluc3RlYWQnKTtcbiAgICB9XG5cbiAgICBpZiAoZ2V0KG9wdGlvbnMsICdtb3VzZS5jdHJsJykpIHtcbiAgICAgIGRlcHJlY2F0ZWQoJ21vdXNlLmN0cmwnLCAnJGV2ZW50LmN0cmxLZXkgaW4gY2xpY2sgYWN0aW9uIGluc3RlYWQnKTtcbiAgICB9XG5cbiAgICBpZiAoZ2V0KG9wdGlvbnMsICdtb3VzZS5hbHQnKSkge1xuICAgICAgZGVwcmVjYXRlZCgnbW91c2UuYWx0JywgJyRldmVudC5hbHRLZXkgaW4gY2xpY2sgYWN0aW9uIGluc3RlYWQnKTtcbiAgICB9XG4gIH1cbiAgYWxsb3dEcm9wKGVsZW1lbnQsIHRvKTpib29sZWFuIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmFsbG93RHJvcCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsbG93RHJvcChlbGVtZW50LCB0byk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGxvd0Ryb3AgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB0aGlzLm9wdGlvbnMuYWxsb3dEcm9wO1xuICAgIH1cbiAgfVxuICBub2RlQ2xhc3Mobm9kZTogVHJlZU5vZGUpOnN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5ub2RlQ2xhc3MgPyB0aGlzLm9wdGlvbnMubm9kZUNsYXNzKG5vZGUpIDogJyc7XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19
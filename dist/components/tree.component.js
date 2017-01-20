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
var tree_model_1 = require("../models/tree.model");
var tree_dragged_element_model_1 = require("../models/tree-dragged-element.model");
var tree_options_model_1 = require("../models/tree-options.model");
var _ = require("lodash");
var TreeComponent = (function () {
    function TreeComponent(treeModel, treeDraggedElement) {
        var _this = this;
        this.treeModel = treeModel;
        this.treeDraggedElement = treeDraggedElement;
        treeModel.eventNames.forEach(function (name) { return _this[name] = new core_1.EventEmitter(); });
    }
    Object.defineProperty(TreeComponent.prototype, "nodes", {
        // Will be handled in ngOnChanges
        set: function (nodes) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "options", {
        set: function (options) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "focused", {
        set: function (value) {
            this.treeModel.setFocus(value);
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.prototype.onKeydown = function ($event) {
        if (!this.treeModel.isFocused)
            return;
        if (_.includes(['input', 'textarea'], document.activeElement.tagName.toLowerCase()))
            return;
        var focusedNode = this.treeModel.getFocusedNode();
        this.treeModel.performKeyAction(focusedNode, $event);
    };
    TreeComponent.prototype.onMousedown = function ($event) {
        var insideClick = $event.target.closest('Tree');
        if (!insideClick) {
            this.treeModel.setFocus(false);
        }
    };
    TreeComponent.prototype.ngOnChanges = function (changes) {
        this.treeModel.setData({
            options: changes.options && changes.options.currentValue,
            nodes: changes.nodes && changes.nodes.currentValue,
            events: _.pick(this, this.treeModel.eventNames)
        });
    };
    return TreeComponent;
}());
__decorate([
    core_1.ContentChild('loadingTemplate'),
    __metadata("design:type", core_1.TemplateRef)
], TreeComponent.prototype, "loadingTemplate", void 0);
__decorate([
    core_1.ContentChild('treeNodeTemplate'),
    __metadata("design:type", core_1.TemplateRef)
], TreeComponent.prototype, "treeNodeTemplate", void 0);
__decorate([
    core_1.ContentChild('treeNodeFullTemplate'),
    __metadata("design:type", core_1.TemplateRef)
], TreeComponent.prototype, "treeNodeFullTemplate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], TreeComponent.prototype, "nodes", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", tree_options_model_1.TreeOptions),
    __metadata("design:paramtypes", [tree_options_model_1.TreeOptions])
], TreeComponent.prototype, "options", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TreeComponent.prototype, "focused", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onToggle", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onToggleExpanded", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onActiveChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onActivate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onDeactivate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onFocus", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onBlur", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onDoubleClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onContextMenu", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onUpdateData", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onInitialized", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onMoveNode", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onEvent", void 0);
TreeComponent = __decorate([
    core_1.Component({
        selector: 'Tree',
        encapsulation: core_1.ViewEncapsulation.None,
        host: {
            '(body: keydown)': "onKeydown($event)",
            '(body: mousedown)': "onMousedown($event)"
        },
        providers: [tree_model_1.TreeModel],
        styles: [
            '.tree-children { padding-left: 20px }',
            '.empty-tree-drop-slot .node-drop-slot { height: 20px; min-width: 100px }',
            ".tree {\n      display: inline-block;\n      cursor: pointer;\n      -webkit-touch-callout: none; /* iOS Safari */\n      -webkit-user-select: none;   /* Chrome/Safari/Opera */\n      -khtml-user-select: none;    /* Konqueror */\n      -moz-user-select: none;      /* Firefox */\n      -ms-user-select: none;       /* IE/Edge */\n      user-select: none;           /* non-prefixed version, currently not supported by any browser */\n    }"
        ],
        template: "\n    <div class=\"tree\" [class.node-dragging]=\"treeDraggedElement.isDragging()\">\n      <TreeNode\n        *ngFor=\"let node of treeModel.roots; let i = index\"\n        [node]=\"node\"\n        [index]=\"i\"\n        [templates]=\"{\n          loadingTemplate: loadingTemplate,\n          treeNodeTemplate: treeNodeTemplate,\n          treeNodeFullTemplate: treeNodeFullTemplate\n        }\">\n      </TreeNode>\n      <TreeNodeDropSlot\n        class=\"empty-tree-drop-slot\"\n        *ngIf=\"treeModel.isEmptyTree()\"\n        [dropIndex]=\"0\"\n        [node]=\"treeModel.virtualRoot\">\n      </TreeNodeDropSlot>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [tree_model_1.TreeModel, tree_dragged_element_model_1.TreeDraggedElement])
], TreeComponent);
exports.TreeComponent = TreeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy90cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQThJO0FBQzlJLG1EQUFpRDtBQUNqRCxtRkFBMEU7QUFDMUUsbUVBQTJEO0FBRzNELDBCQUEyQjtBQTZDM0IsSUFBYSxhQUFhO0lBQ3hCLHVCQUFtQixTQUFtQixFQUFTLGtCQUFxQztRQUFwRixpQkFFQztRQUZrQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQVMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNsRixTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLG1CQUFZLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFVUSxzQkFBSSxnQ0FBSztRQURsQixpQ0FBaUM7YUFDeEIsVUFBVSxLQUFXLElBQUksQ0FBQzs7O09BQUE7SUFBQSxDQUFDO0lBQzNCLHNCQUFJLGtDQUFPO2FBQVgsVUFBWSxPQUFtQixJQUFJLENBQUM7OztPQUFBO0lBQUEsQ0FBQztJQUVyQyxzQkFBSSxrQ0FBTzthQUFYLFVBQVksS0FBYTtZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQWdCRCxpQ0FBUyxHQUFULFVBQVUsTUFBTTtRQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFDaEMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUUxRCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXBELElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksTUFBTTtRQUNoQixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQztJQUNILENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksT0FBTztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUNyQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVk7WUFDeEQsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZO1lBQ2xELE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztTQUNoRCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBMURELElBMERDO0FBbERrQztJQUFoQyxtQkFBWSxDQUFDLGlCQUFpQixDQUFDOzhCQUFrQixrQkFBVztzREFBTTtBQUNqQztJQUFqQyxtQkFBWSxDQUFDLGtCQUFrQixDQUFDOzhCQUFtQixrQkFBVzt1REFBTTtBQUMvQjtJQUFyQyxtQkFBWSxDQUFDLHNCQUFzQixDQUFDOzhCQUF1QixrQkFBVzsyREFBTTtBQUdwRTtJQUFSLFlBQUssRUFBRTs7OzBDQUEyQjtBQUMxQjtJQUFSLFlBQUssRUFBRTs4QkFBcUIsZ0NBQVc7cUNBQVgsZ0NBQVc7NENBQUs7QUFFcEM7SUFBUixZQUFLLEVBQUU7Ozs0Q0FFUDtBQUVTO0lBQVQsYUFBTSxFQUFFOzsrQ0FBVTtBQUNUO0lBQVQsYUFBTSxFQUFFOzt1REFBa0I7QUFDakI7SUFBVCxhQUFNLEVBQUU7O3NEQUFpQjtBQUNoQjtJQUFULGFBQU0sRUFBRTs7aURBQVk7QUFDWDtJQUFULGFBQU0sRUFBRTs7bURBQWM7QUFDYjtJQUFULGFBQU0sRUFBRTs7OENBQVM7QUFDUjtJQUFULGFBQU0sRUFBRTs7NkNBQVE7QUFDUDtJQUFULGFBQU0sRUFBRTs7b0RBQWU7QUFDZDtJQUFULGFBQU0sRUFBRTs7b0RBQWU7QUFDZDtJQUFULGFBQU0sRUFBRTs7bURBQWM7QUFDYjtJQUFULGFBQU0sRUFBRTs7b0RBQWU7QUFDZDtJQUFULGFBQU0sRUFBRTs7aURBQVk7QUFDWDtJQUFULGFBQU0sRUFBRTs7OENBQVM7QUFoQ1AsYUFBYTtJQTNDekIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxNQUFNO1FBQ2hCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLElBQUksRUFBRTtZQUNKLGlCQUFpQixFQUFFLG1CQUFtQjtZQUN0QyxtQkFBbUIsRUFBRSxxQkFBcUI7U0FDM0M7UUFDRCxTQUFTLEVBQUUsQ0FBQyxzQkFBUyxDQUFDO1FBQ3RCLE1BQU0sRUFBRTtZQUNOLHVDQUF1QztZQUN2QywwRUFBMEU7WUFDMUUsd2JBU0U7U0FDSDtRQUNELFFBQVEsRUFBRSwrbkJBbUJUO0tBQ0YsQ0FBQztxQ0FFNkIsc0JBQVMsRUFBNEIsK0NBQWtCO0dBRHpFLGFBQWEsQ0EwRHpCO0FBMURZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgRXZlbnRFbWl0dGVyLCBWaWV3RW5jYXBzdWxhdGlvbiwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcbmltcG9ydCB7IFRyZWVPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQgeyBLRVlTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2tleXMnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnVHJlZScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICAnKGJvZHk6IGtleWRvd24pJzogXCJvbktleWRvd24oJGV2ZW50KVwiLFxuICAgICcoYm9keTogbW91c2Vkb3duKSc6IFwib25Nb3VzZWRvd24oJGV2ZW50KVwiXG4gIH0sXG4gIHByb3ZpZGVyczogW1RyZWVNb2RlbF0sXG4gIHN0eWxlczogW1xuICAgICcudHJlZS1jaGlsZHJlbiB7IHBhZGRpbmctbGVmdDogMjBweCB9JyxcbiAgICAnLmVtcHR5LXRyZWUtZHJvcC1zbG90IC5ub2RlLWRyb3Atc2xvdCB7IGhlaWdodDogMjBweDsgbWluLXdpZHRoOiAxMDBweCB9JyxcbiAgICBgLnRyZWUge1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lOyAvKiBpT1MgU2FmYXJpICovXG4gICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOyAgIC8qIENocm9tZS9TYWZhcmkvT3BlcmEgKi9cbiAgICAgIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTsgICAgLyogS29ucXVlcm9yICovXG4gICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lOyAgICAgIC8qIEZpcmVmb3ggKi9cbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTsgICAgICAgLyogSUUvRWRnZSAqL1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7ICAgICAgICAgICAvKiBub24tcHJlZml4ZWQgdmVyc2lvbiwgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWQgYnkgYW55IGJyb3dzZXIgKi9cbiAgICB9YFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ0cmVlXCIgW2NsYXNzLm5vZGUtZHJhZ2dpbmddPVwidHJlZURyYWdnZWRFbGVtZW50LmlzRHJhZ2dpbmcoKVwiPlxuICAgICAgPFRyZWVOb2RlXG4gICAgICAgICpuZ0Zvcj1cImxldCBub2RlIG9mIHRyZWVNb2RlbC5yb290czsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgIFtub2RlXT1cIm5vZGVcIlxuICAgICAgICBbaW5kZXhdPVwiaVwiXG4gICAgICAgIFt0ZW1wbGF0ZXNdPVwie1xuICAgICAgICAgIGxvYWRpbmdUZW1wbGF0ZTogbG9hZGluZ1RlbXBsYXRlLFxuICAgICAgICAgIHRyZWVOb2RlVGVtcGxhdGU6IHRyZWVOb2RlVGVtcGxhdGUsXG4gICAgICAgICAgdHJlZU5vZGVGdWxsVGVtcGxhdGU6IHRyZWVOb2RlRnVsbFRlbXBsYXRlXG4gICAgICAgIH1cIj5cbiAgICAgIDwvVHJlZU5vZGU+XG4gICAgICA8VHJlZU5vZGVEcm9wU2xvdFxuICAgICAgICBjbGFzcz1cImVtcHR5LXRyZWUtZHJvcC1zbG90XCJcbiAgICAgICAgKm5nSWY9XCJ0cmVlTW9kZWwuaXNFbXB0eVRyZWUoKVwiXG4gICAgICAgIFtkcm9wSW5kZXhdPVwiMFwiXG4gICAgICAgIFtub2RlXT1cInRyZWVNb2RlbC52aXJ0dWFsUm9vdFwiPlxuICAgICAgPC9UcmVlTm9kZURyb3BTbG90PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHJlZU1vZGVsOlRyZWVNb2RlbCwgcHVibGljIHRyZWVEcmFnZ2VkRWxlbWVudDpUcmVlRHJhZ2dlZEVsZW1lbnQpIHtcbiAgICB0cmVlTW9kZWwuZXZlbnROYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB0aGlzW25hbWVdID0gbmV3IEV2ZW50RW1pdHRlcigpKTtcbiAgfVxuXG4gIF9ub2RlczphbnlbXTtcbiAgX29wdGlvbnM6VHJlZU9wdGlvbnM7XG5cbiAgQENvbnRlbnRDaGlsZCgnbG9hZGluZ1RlbXBsYXRlJykgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKCd0cmVlTm9kZVRlbXBsYXRlJykgdHJlZU5vZGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZCgndHJlZU5vZGVGdWxsVGVtcGxhdGUnKSB0cmVlTm9kZUZ1bGxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvLyBXaWxsIGJlIGhhbmRsZWQgaW4gbmdPbkNoYW5nZXNcbiAgQElucHV0KCkgc2V0IG5vZGVzKG5vZGVzOmFueVtdKSB7IH07XG4gIEBJbnB1dCgpIHNldCBvcHRpb25zKG9wdGlvbnM6VHJlZU9wdGlvbnMpIHsgfTtcblxuICBASW5wdXQoKSBzZXQgZm9jdXNlZCh2YWx1ZTpib29sZWFuKSB7XG4gICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXModmFsdWUpO1xuICB9XG5cbiAgQE91dHB1dCgpIG9uVG9nZ2xlO1xuICBAT3V0cHV0KCkgb25Ub2dnbGVFeHBhbmRlZDtcbiAgQE91dHB1dCgpIG9uQWN0aXZlQ2hhbmdlZDtcbiAgQE91dHB1dCgpIG9uQWN0aXZhdGU7XG4gIEBPdXRwdXQoKSBvbkRlYWN0aXZhdGU7XG4gIEBPdXRwdXQoKSBvbkZvY3VzO1xuICBAT3V0cHV0KCkgb25CbHVyO1xuICBAT3V0cHV0KCkgb25Eb3VibGVDbGljaztcbiAgQE91dHB1dCgpIG9uQ29udGV4dE1lbnU7XG4gIEBPdXRwdXQoKSBvblVwZGF0ZURhdGE7XG4gIEBPdXRwdXQoKSBvbkluaXRpYWxpemVkO1xuICBAT3V0cHV0KCkgb25Nb3ZlTm9kZTtcbiAgQE91dHB1dCgpIG9uRXZlbnQ7XG5cbiAgb25LZXlkb3duKCRldmVudCkge1xuICAgIGlmICghdGhpcy50cmVlTW9kZWwuaXNGb2N1c2VkKSByZXR1cm47XG4gICAgaWYgKF8uaW5jbHVkZXMoWydpbnB1dCcsICd0ZXh0YXJlYSddLFxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSkpIHJldHVybjtcblxuICAgIGNvbnN0IGZvY3VzZWROb2RlID0gdGhpcy50cmVlTW9kZWwuZ2V0Rm9jdXNlZE5vZGUoKTtcblxuICAgIHRoaXMudHJlZU1vZGVsLnBlcmZvcm1LZXlBY3Rpb24oZm9jdXNlZE5vZGUsICRldmVudCk7XG4gIH1cblxuICBvbk1vdXNlZG93bigkZXZlbnQpIHtcbiAgICBsZXQgaW5zaWRlQ2xpY2sgPSAkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1RyZWUnKTtcbiAgICBpZiAoIWluc2lkZUNsaWNrKSB7XG4gICAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1cyhmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgIHRoaXMudHJlZU1vZGVsLnNldERhdGEoe1xuICAgICAgb3B0aW9uczogY2hhbmdlcy5vcHRpb25zICYmIGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUsXG4gICAgICBub2RlczogY2hhbmdlcy5ub2RlcyAmJiBjaGFuZ2VzLm5vZGVzLmN1cnJlbnRWYWx1ZSxcbiAgICAgIGV2ZW50czogXy5waWNrKHRoaXMsIHRoaXMudHJlZU1vZGVsLmV2ZW50TmFtZXMpXG4gICAgfSk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19
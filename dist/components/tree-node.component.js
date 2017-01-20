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
var tree_node_model_1 = require("../models/tree-node.model");
var TreeNodeComponent = (function () {
    function TreeNodeComponent(elementRef) {
        this.elementRef = elementRef;
    }
    TreeNodeComponent.prototype.ngAfterViewInit = function () {
        this.node.elementRef = this.elementRef;
    };
    return TreeNodeComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", tree_node_model_1.TreeNode)
], TreeNodeComponent.prototype, "node", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TreeNodeComponent.prototype, "index", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeNodeComponent.prototype, "templates", void 0);
TreeNodeComponent = __decorate([
    core_1.Component({
        selector: 'TreeNode',
        encapsulation: core_1.ViewEncapsulation.None,
        styles: [
            ".node-content-wrapper {\n      display: inline-block;\n      padding: 2px 5px;\n      border-radius: 2px;\n      transition: background-color .15s,box-shadow .15s;\n    }",
            '.node-wrapper {display: flex; align-items: flex-start;}',
            '.tree-node-active > .node-wrapper > .node-content-wrapper { background: #beebff }',
            '.tree-node-active.tree-node-focused > .node-wrapper > .node-content-wrapper { background: #beebff }',
            '.tree-node-focused > .node-wrapper > .node-content-wrapper { background: #e7f4f9 }',
            '.node-content-wrapper:hover { background: #f7fbff }',
            '.tree-node-active > .node-wrapper > .node-content-wrapper, .tree-node-focused > .node-content-wrapper, .node-content-wrapper:hover { box-shadow: inset 0 0 1px #999; }',
            '.node-content-wrapper.is-dragging-over { background: #ddffee; box-shadow: inset 0 0 1px #999; }',
            '.node-content-wrapper.is-dragging-over-disabled { opacity: 0.5 }'
        ],
        template: "\n    <div\n      *ngIf=\"!node.isHidden && !templates.treeNodeFullTemplate\"\n      class=\"tree-node tree-node-level-{{ node.level }}\"\n      [class]=\"node.getClass()\"\n      [class.tree-node-expanded]=\"node.isExpanded && node.hasChildren\"\n      [class.tree-node-collapsed]=\"node.isCollapsed && node.hasChildren\"\n      [class.tree-node-leaf]=\"node.isLeaf\"\n      [class.tree-node-active]=\"node.isActive\"\n      [class.tree-node-focused]=\"node.isFocused\">\n\n      <TreeNodeDropSlot *ngIf=\"index === 0\" [dropIndex]=\"index\" [node]=\"node.parent\"></TreeNodeDropSlot>\n\n        <div class=\"node-wrapper\" [style.padding-left]=\"node.getNodePadding()\">\n          <TreeNodeExpander [node]=\"node\"></TreeNodeExpander>\n          <div class=\"node-content-wrapper\"\n            (click)=\"node.mouseAction('click', $event)\"\n            (dblclick)=\"node.mouseAction('dblClick', $event)\"\n            (contextmenu)=\"node.mouseAction('contextMenu', $event)\"\n            (treeDrop)=\"node.onDrop($event)\"\n            [treeAllowDrop]=\"node.allowDrop\"\n            [treeDrag]=\"node\"\n            [treeDragEnabled]=\"node.allowDrag()\">\n\n            <TreeNodeContent [node]=\"node\" [index]=\"index\" [template]=\"templates.treeNodeTemplate\">\n            </TreeNodeContent>\n          </div>\n        </div>\n\n      <TreeNodeChildren [node]=\"node\" [templates]=\"templates\"></TreeNodeChildren>\n      <TreeNodeDropSlot [dropIndex]=\"index + 1\" [node]=\"node.parent\"></TreeNodeDropSlot>\n    </div>\n    <template\n      [ngTemplateOutlet]=\"templates.treeNodeFullTemplate\"\n      [ngOutletContext]=\"{ $implicit: node, node: node, index: index, templates: templates }\">\n    </template>"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], TreeNodeComponent);
exports.TreeNodeComponent = TreeNodeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUE0RztBQUM1Ryw2REFBcUQ7QUEyRHJELElBQWEsaUJBQWlCO0lBSzVCLDJCQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQzFDLENBQUM7SUFFRCwyQ0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QyxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQVZVO0lBQVIsWUFBSyxFQUFFOzhCQUFNLDBCQUFROytDQUFDO0FBQ2Q7SUFBUixZQUFLLEVBQUU7O2dEQUFjO0FBQ2I7SUFBUixZQUFLLEVBQUU7O29EQUFnQjtBQUhiLGlCQUFpQjtJQXpEN0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxVQUFVO1FBQ3BCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLE1BQU0sRUFBRTtZQUNOLDRLQUtFO1lBQ0YseURBQXlEO1lBQ3pELG1GQUFtRjtZQUNuRixxR0FBcUc7WUFDckcsb0ZBQW9GO1lBQ3BGLHFEQUFxRDtZQUNyRCx3S0FBd0s7WUFDeEssaUdBQWlHO1lBQ2pHLGtFQUFrRTtTQUNuRTtRQUNELFFBQVEsRUFBRSw0ckRBbUNJO0tBQ2YsQ0FBQztxQ0FPZ0MsaUJBQVU7R0FML0IsaUJBQWlCLENBVzdCO0FBWFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdUcmVlTm9kZScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlczogW1xuICAgIGAubm9kZS1jb250ZW50LXdyYXBwZXIge1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgcGFkZGluZzogMnB4IDVweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgLjE1cyxib3gtc2hhZG93IC4xNXM7XG4gICAgfWAsXG4gICAgJy5ub2RlLXdyYXBwZXIge2Rpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O30nLFxuICAgICcudHJlZS1ub2RlLWFjdGl2ZSA+IC5ub2RlLXdyYXBwZXIgPiAubm9kZS1jb250ZW50LXdyYXBwZXIgeyBiYWNrZ3JvdW5kOiAjYmVlYmZmIH0nLFxuICAgICcudHJlZS1ub2RlLWFjdGl2ZS50cmVlLW5vZGUtZm9jdXNlZCA+IC5ub2RlLXdyYXBwZXIgPiAubm9kZS1jb250ZW50LXdyYXBwZXIgeyBiYWNrZ3JvdW5kOiAjYmVlYmZmIH0nLFxuICAgICcudHJlZS1ub2RlLWZvY3VzZWQgPiAubm9kZS13cmFwcGVyID4gLm5vZGUtY29udGVudC13cmFwcGVyIHsgYmFja2dyb3VuZDogI2U3ZjRmOSB9JyxcbiAgICAnLm5vZGUtY29udGVudC13cmFwcGVyOmhvdmVyIHsgYmFja2dyb3VuZDogI2Y3ZmJmZiB9JyxcbiAgICAnLnRyZWUtbm9kZS1hY3RpdmUgPiAubm9kZS13cmFwcGVyID4gLm5vZGUtY29udGVudC13cmFwcGVyLCAudHJlZS1ub2RlLWZvY3VzZWQgPiAubm9kZS1jb250ZW50LXdyYXBwZXIsIC5ub2RlLWNvbnRlbnQtd3JhcHBlcjpob3ZlciB7IGJveC1zaGFkb3c6IGluc2V0IDAgMCAxcHggIzk5OTsgfScsXG4gICAgJy5ub2RlLWNvbnRlbnQtd3JhcHBlci5pcy1kcmFnZ2luZy1vdmVyIHsgYmFja2dyb3VuZDogI2RkZmZlZTsgYm94LXNoYWRvdzogaW5zZXQgMCAwIDFweCAjOTk5OyB9JyxcbiAgICAnLm5vZGUtY29udGVudC13cmFwcGVyLmlzLWRyYWdnaW5nLW92ZXItZGlzYWJsZWQgeyBvcGFjaXR5OiAwLjUgfSdcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cIiFub2RlLmlzSGlkZGVuICYmICF0ZW1wbGF0ZXMudHJlZU5vZGVGdWxsVGVtcGxhdGVcIlxuICAgICAgY2xhc3M9XCJ0cmVlLW5vZGUgdHJlZS1ub2RlLWxldmVsLXt7IG5vZGUubGV2ZWwgfX1cIlxuICAgICAgW2NsYXNzXT1cIm5vZGUuZ2V0Q2xhc3MoKVwiXG4gICAgICBbY2xhc3MudHJlZS1ub2RlLWV4cGFuZGVkXT1cIm5vZGUuaXNFeHBhbmRlZCAmJiBub2RlLmhhc0NoaWxkcmVuXCJcbiAgICAgIFtjbGFzcy50cmVlLW5vZGUtY29sbGFwc2VkXT1cIm5vZGUuaXNDb2xsYXBzZWQgJiYgbm9kZS5oYXNDaGlsZHJlblwiXG4gICAgICBbY2xhc3MudHJlZS1ub2RlLWxlYWZdPVwibm9kZS5pc0xlYWZcIlxuICAgICAgW2NsYXNzLnRyZWUtbm9kZS1hY3RpdmVdPVwibm9kZS5pc0FjdGl2ZVwiXG4gICAgICBbY2xhc3MudHJlZS1ub2RlLWZvY3VzZWRdPVwibm9kZS5pc0ZvY3VzZWRcIj5cblxuICAgICAgPFRyZWVOb2RlRHJvcFNsb3QgKm5nSWY9XCJpbmRleCA9PT0gMFwiIFtkcm9wSW5kZXhdPVwiaW5kZXhcIiBbbm9kZV09XCJub2RlLnBhcmVudFwiPjwvVHJlZU5vZGVEcm9wU2xvdD5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibm9kZS13cmFwcGVyXCIgW3N0eWxlLnBhZGRpbmctbGVmdF09XCJub2RlLmdldE5vZGVQYWRkaW5nKClcIj5cbiAgICAgICAgICA8VHJlZU5vZGVFeHBhbmRlciBbbm9kZV09XCJub2RlXCI+PC9UcmVlTm9kZUV4cGFuZGVyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJub2RlLWNvbnRlbnQtd3JhcHBlclwiXG4gICAgICAgICAgICAoY2xpY2spPVwibm9kZS5tb3VzZUFjdGlvbignY2xpY2snLCAkZXZlbnQpXCJcbiAgICAgICAgICAgIChkYmxjbGljayk9XCJub2RlLm1vdXNlQWN0aW9uKCdkYmxDbGljaycsICRldmVudClcIlxuICAgICAgICAgICAgKGNvbnRleHRtZW51KT1cIm5vZGUubW91c2VBY3Rpb24oJ2NvbnRleHRNZW51JywgJGV2ZW50KVwiXG4gICAgICAgICAgICAodHJlZURyb3ApPVwibm9kZS5vbkRyb3AoJGV2ZW50KVwiXG4gICAgICAgICAgICBbdHJlZUFsbG93RHJvcF09XCJub2RlLmFsbG93RHJvcFwiXG4gICAgICAgICAgICBbdHJlZURyYWddPVwibm9kZVwiXG4gICAgICAgICAgICBbdHJlZURyYWdFbmFibGVkXT1cIm5vZGUuYWxsb3dEcmFnKClcIj5cblxuICAgICAgICAgICAgPFRyZWVOb2RlQ29udGVudCBbbm9kZV09XCJub2RlXCIgW2luZGV4XT1cImluZGV4XCIgW3RlbXBsYXRlXT1cInRlbXBsYXRlcy50cmVlTm9kZVRlbXBsYXRlXCI+XG4gICAgICAgICAgICA8L1RyZWVOb2RlQ29udGVudD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDxUcmVlTm9kZUNoaWxkcmVuIFtub2RlXT1cIm5vZGVcIiBbdGVtcGxhdGVzXT1cInRlbXBsYXRlc1wiPjwvVHJlZU5vZGVDaGlsZHJlbj5cbiAgICAgIDxUcmVlTm9kZURyb3BTbG90IFtkcm9wSW5kZXhdPVwiaW5kZXggKyAxXCIgW25vZGVdPVwibm9kZS5wYXJlbnRcIj48L1RyZWVOb2RlRHJvcFNsb3Q+XG4gICAgPC9kaXY+XG4gICAgPHRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZXMudHJlZU5vZGVGdWxsVGVtcGxhdGVcIlxuICAgICAgW25nT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogbm9kZSwgbm9kZTogbm9kZSwgaW5kZXg6IGluZGV4LCB0ZW1wbGF0ZXM6IHRlbXBsYXRlcyB9XCI+XG4gICAgPC90ZW1wbGF0ZT5gXG59KVxuXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgbm9kZTpUcmVlTm9kZTtcbiAgQElucHV0KCkgaW5kZXg6bnVtYmVyO1xuICBASW5wdXQoKSB0ZW1wbGF0ZXM6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLm5vZGUuZWxlbWVudFJlZiA9IHRoaXMuZWxlbWVudFJlZjtcbiAgfVxufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=
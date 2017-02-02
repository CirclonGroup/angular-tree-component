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
var TreeNodeChildrenComponent = (function () {
    function TreeNodeChildrenComponent() {
    }
    return TreeNodeChildrenComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", tree_node_model_1.TreeNode)
], TreeNodeChildrenComponent.prototype, "node", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeNodeChildrenComponent.prototype, "templates", void 0);
TreeNodeChildrenComponent = __decorate([
    core_1.Component({
        selector: 'TreeNodeChildren',
        encapsulation: core_1.ViewEncapsulation.None,
        styles: [
            '.tree-children.tree-children-no-padding { padding-left: 0 }',
            '.tree-children { padding-left: 20px }'
        ],
        template: "\n    <div [class.tree-children]=\"true\"\n         [class.tree-children-no-padding]=\"node.options.levelPadding\"\n         *ngIf=\"node.isExpanded\">\n      <div *ngIf=\"node.children\">\n        <TreeNode\n          *ngFor=\"let node of node.children; let i = index\"\n          [node]=\"node\"\n          [index]=\"i\"\n          [templates]=\"templates\">\n        </TreeNode>\n      </div>\n      <LoadingComponent\n        [style.padding-left]=\"node.getNodePadding()\"\n        class=\"tree-node-loading\"\n        *ngIf=\"!node.children\"\n        [template]=\"templates.loadingTemplate\"\n      ></LoadingComponent>\n    </div>\n  "
    })
], TreeNodeChildrenComponent);
exports.TreeNodeChildrenComponent = TreeNodeChildrenComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNoaWxkcmVuLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1jaGlsZHJlbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQUNwRSw2REFBcUQ7QUE4QnJELElBQWEseUJBQXlCO0lBQXRDO0lBR0EsQ0FBQztJQUFELGdDQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFGVTtJQUFSLFlBQUssRUFBRTs4QkFBTSwwQkFBUTt1REFBQztBQUNkO0lBQVIsWUFBSyxFQUFFOzs0REFBZ0I7QUFGYix5QkFBeUI7SUE1QnJDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLE1BQU0sRUFBRTtZQUNOLDZEQUE2RDtZQUM3RCx1Q0FBdUM7U0FDeEM7UUFDRCxRQUFRLEVBQUUsbW9CQW1CVDtLQUNGLENBQUM7R0FDVyx5QkFBeUIsQ0FHckM7QUFIWSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnVHJlZU5vZGVDaGlsZHJlbicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlczogW1xuICAgICcudHJlZS1jaGlsZHJlbi50cmVlLWNoaWxkcmVuLW5vLXBhZGRpbmcgeyBwYWRkaW5nLWxlZnQ6IDAgfScsXG4gICAgJy50cmVlLWNoaWxkcmVuIHsgcGFkZGluZy1sZWZ0OiAyMHB4IH0nXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3MudHJlZS1jaGlsZHJlbl09XCJ0cnVlXCJcbiAgICAgICAgIFtjbGFzcy50cmVlLWNoaWxkcmVuLW5vLXBhZGRpbmddPVwibm9kZS5vcHRpb25zLmxldmVsUGFkZGluZ1wiXG4gICAgICAgICAqbmdJZj1cIm5vZGUuaXNFeHBhbmRlZFwiPlxuICAgICAgPGRpdiAqbmdJZj1cIm5vZGUuY2hpbGRyZW5cIj5cbiAgICAgICAgPFRyZWVOb2RlXG4gICAgICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2Ygbm9kZS5jaGlsZHJlbjsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgW25vZGVdPVwibm9kZVwiXG4gICAgICAgICAgW2luZGV4XT1cImlcIlxuICAgICAgICAgIFt0ZW1wbGF0ZXNdPVwidGVtcGxhdGVzXCI+XG4gICAgICAgIDwvVHJlZU5vZGU+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxMb2FkaW5nQ29tcG9uZW50XG4gICAgICAgIFtzdHlsZS5wYWRkaW5nLWxlZnRdPVwibm9kZS5nZXROb2RlUGFkZGluZygpXCJcbiAgICAgICAgY2xhc3M9XCJ0cmVlLW5vZGUtbG9hZGluZ1wiXG4gICAgICAgICpuZ0lmPVwiIW5vZGUuY2hpbGRyZW5cIlxuICAgICAgICBbdGVtcGxhdGVdPVwidGVtcGxhdGVzLmxvYWRpbmdUZW1wbGF0ZVwiXG4gICAgICA+PC9Mb2FkaW5nQ29tcG9uZW50PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQge1xuICBASW5wdXQoKSBub2RlOlRyZWVOb2RlO1xuICBASW5wdXQoKSB0ZW1wbGF0ZXM6IGFueTtcbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19
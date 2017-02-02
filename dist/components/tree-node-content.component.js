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
var TreeNodeContent = (function () {
    function TreeNodeContent() {
    }
    return TreeNodeContent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", tree_node_model_1.TreeNode)
], TreeNodeContent.prototype, "node", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TreeNodeContent.prototype, "index", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], TreeNodeContent.prototype, "template", void 0);
TreeNodeContent = __decorate([
    core_1.Component({
        selector: 'TreeNodeContent',
        template: "<span *ngIf=\"!template\">{{ node.displayField }}</span>\n  <template\n    [ngTemplateOutlet]=\"template\"\n    [ngOutletContext]=\"{ $implicit: node, node: node, index: index }\">\n  </template>",
    })
], TreeNodeContent);
exports.TreeNodeContent = TreeNodeContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBOEQ7QUFDOUQsNkRBQXFEO0FBVXJELElBQWEsZUFBZTtJQUE1QjtJQUlBLENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSFU7SUFBUixZQUFLLEVBQUU7OEJBQU8sMEJBQVE7NkNBQUM7QUFDZjtJQUFSLFlBQUssRUFBRTs7OENBQWU7QUFDZDtJQUFSLFlBQUssRUFBRTs4QkFBVyxrQkFBVztpREFBTTtBQUh6QixlQUFlO0lBUjNCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFFBQVEsRUFBRSxxTUFJRTtLQUNiLENBQUM7R0FDVyxlQUFlLENBSTNCO0FBSlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnVHJlZU5vZGVDb250ZW50JyxcbiAgdGVtcGxhdGU6IGA8c3BhbiAqbmdJZj1cIiF0ZW1wbGF0ZVwiPnt7IG5vZGUuZGlzcGxheUZpZWxkIH19PC9zcGFuPlxuICA8dGVtcGxhdGVcbiAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiXG4gICAgW25nT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogbm9kZSwgbm9kZTogbm9kZSwgaW5kZXg6IGluZGV4IH1cIj5cbiAgPC90ZW1wbGF0ZT5gLFxufSlcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZUNvbnRlbnQge1xuICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcbiAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==
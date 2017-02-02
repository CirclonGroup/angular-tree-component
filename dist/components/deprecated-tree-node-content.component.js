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
var tree_model_1 = require("../models/tree.model");
var adhoc_component_factory_service_1 = require("./adhoc-component-factory.service");
var TreeNodeContent = (function () {
    function TreeNodeContent(treeModel, componentFactoryResolver, viewContainerRef, adHocComponentFactoryCreator) {
        this.treeModel = treeModel;
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.adHocComponentFactoryCreator = adHocComponentFactoryCreator;
    }
    TreeNodeContent.prototype.ngAfterViewInit = function () {
        this._loadTreeNodeContent();
    };
    TreeNodeContent.prototype._loadTreeNodeContent = function () {
        var componentFactory;
        try {
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.treeModel.treeNodeContentComponent);
        }
        catch (error) {
            componentFactory = this.adHocComponentFactoryCreator.getFactory(this.treeModel.treeNodeContentComponent);
        }
        var componentRef = this.viewContainerRef.createComponent(componentFactory, 0, this.viewContainerRef.injector);
        componentRef.instance.node = this.node;
        componentRef.instance.context = this.node.context;
        componentRef.changeDetectorRef.detectChanges();
    };
    return TreeNodeContent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", tree_node_model_1.TreeNode)
], TreeNodeContent.prototype, "node", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], TreeNodeContent.prototype, "treeNodeContentTemplate", void 0);
TreeNodeContent = __decorate([
    core_1.Component({
        selector: 'TreeNodeContent',
        template: '',
    }),
    __metadata("design:paramtypes", [tree_model_1.TreeModel,
        core_1.ComponentFactoryResolver,
        core_1.ViewContainerRef,
        adhoc_component_factory_service_1.AdHocComponentFactoryCreator])
], TreeNodeContent);
exports.TreeNodeContent = TreeNodeContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwcmVjYXRlZC10cmVlLW5vZGUtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy9kZXByZWNhdGVkLXRyZWUtbm9kZS1jb250ZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQXlKO0FBRXpKLDZEQUFxRDtBQUNyRCxtREFBaUQ7QUFDakQscUZBQWlGO0FBV2pGLElBQWEsZUFBZTtJQUkxQix5QkFDVSxTQUFvQixFQUNwQix3QkFBa0QsRUFDbEQsZ0JBQWtDLEVBQ2xDLDRCQUEwRDtRQUgxRCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxpQ0FBNEIsR0FBNUIsNEJBQTRCLENBQThCO0lBRXBFLENBQUM7SUFFRCx5Q0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELDhDQUFvQixHQUFwQjtRQUNFLElBQUksZ0JBQWdCLENBQUM7UUFDckIsSUFBSSxDQUFDO1lBQ0gsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUNwSCxDQUFDO1FBQUMsS0FBSyxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLGdCQUFnQixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzNHLENBQUM7UUFDRCxJQUFJLFlBQVksR0FDWixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFvQixnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xILFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFbEQsWUFBWSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUE5QkQsSUE4QkM7QUE3QlU7SUFBUixZQUFLLEVBQUU7OEJBQU8sMEJBQVE7NkNBQUM7QUFDZjtJQUFSLFlBQUssRUFBRTs4QkFBMEIsa0JBQVc7Z0VBQW9CO0FBRnRELGVBQWU7SUFKM0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsUUFBUSxFQUFFLEVBQUU7S0FDYixDQUFDO3FDQU1xQixzQkFBUztRQUNNLCtCQUF3QjtRQUNoQyx1QkFBZ0I7UUFDSiw4REFBNEI7R0FSekQsZUFBZSxDQThCM0I7QUE5QlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NvbnRhaW5lclJlZiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUubW9kZWwnO1xuaW1wb3J0IHsgQWRIb2NDb21wb25lbnRGYWN0b3J5Q3JlYXRvciB9IGZyb20gJy4vYWRob2MtY29tcG9uZW50LWZhY3Rvcnkuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRyZWVOb2RlVGVtcGxhdGUge1xuICBub2RlOiBUcmVlTm9kZTtcbiAgY29udGV4dDogYW55O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdUcmVlTm9kZUNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogJycsXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlQ29udGVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcbiAgQElucHV0KCkgdHJlZU5vZGVDb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPElUcmVlTm9kZVRlbXBsYXRlPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRyZWVNb2RlbDogVHJlZU1vZGVsLFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgYWRIb2NDb21wb25lbnRGYWN0b3J5Q3JlYXRvcjogQWRIb2NDb21wb25lbnRGYWN0b3J5Q3JlYXRvclxuICAgICkge1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2xvYWRUcmVlTm9kZUNvbnRlbnQoKTtcbiAgfVxuXG4gIF9sb2FkVHJlZU5vZGVDb250ZW50KCkge1xuICAgIGxldCBjb21wb25lbnRGYWN0b3J5O1xuICAgIHRyeSB7XG4gICAgICBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy50cmVlTW9kZWwudHJlZU5vZGVDb250ZW50Q29tcG9uZW50KTtcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5hZEhvY0NvbXBvbmVudEZhY3RvcnlDcmVhdG9yLmdldEZhY3RvcnkodGhpcy50cmVlTW9kZWwudHJlZU5vZGVDb250ZW50Q29tcG9uZW50KTtcbiAgICB9XG4gICAgbGV0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPElUcmVlTm9kZVRlbXBsYXRlPlxuICAgICAgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50PElUcmVlTm9kZVRlbXBsYXRlPihjb21wb25lbnRGYWN0b3J5LCAwLCB0aGlzLnZpZXdDb250YWluZXJSZWYuaW5qZWN0b3IpO1xuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5ub2RlID0gdGhpcy5ub2RlO1xuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5jb250ZXh0ID0gdGhpcy5ub2RlLmNvbnRleHQ7XG5cbiAgICBjb21wb25lbnRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59XG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=
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
var adhoc_component_factory_service_1 = require("./adhoc-component-factory.service");
var LoadingComponent = (function () {
    function LoadingComponent(treeModel, componentFactoryResolver, viewContainerRef, adHocComponentFactoryCreator) {
        this.treeModel = treeModel;
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.adHocComponentFactoryCreator = adHocComponentFactoryCreator;
    }
    LoadingComponent.prototype.ngAfterViewInit = function () {
        this._loadTreeNodeContent();
    };
    LoadingComponent.prototype._loadTreeNodeContent = function () {
        var componentFactory;
        try {
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.treeModel.loadingComponent);
        }
        catch (error) {
            componentFactory = this.adHocComponentFactoryCreator.getFactory(this.treeModel.loadingComponent);
        }
        var componentRef = this.viewContainerRef.createComponent(componentFactory);
        componentRef.changeDetectorRef.detectChanges();
    };
    return LoadingComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], LoadingComponent.prototype, "loadingTemplate", void 0);
LoadingComponent = __decorate([
    core_1.Component({
        selector: 'LoadingComponent',
        template: ''
    }),
    __metadata("design:paramtypes", [tree_model_1.TreeModel,
        core_1.ComponentFactoryResolver,
        core_1.ViewContainerRef,
        adhoc_component_factory_service_1.AdHocComponentFactoryCreator])
], LoadingComponent);
exports.LoadingComponent = LoadingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwcmVjYXRlZC1sb2FkaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2RlcHJlY2F0ZWQtbG9hZGluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUEwSTtBQUUxSSxtREFBaUQ7QUFDakQscUZBQWlGO0FBTWpGLElBQWEsZ0JBQWdCO0lBRzNCLDBCQUFvQixTQUFvQixFQUNwQix3QkFBa0QsRUFDbEQsZ0JBQWtDLEVBQ2xDLDRCQUEwRDtRQUgxRCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxpQ0FBNEIsR0FBNUIsNEJBQTRCLENBQThCO0lBQzlFLENBQUM7SUFFRCwwQ0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELCtDQUFvQixHQUFwQjtRQUNFLElBQUksZ0JBQWdCLENBQUM7UUFDckIsSUFBSSxDQUFDO1lBQ0gsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM1RyxDQUFDO1FBQUMsS0FBSyxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLGdCQUFnQixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25HLENBQUM7UUFDRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0UsWUFBWSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUF0QlU7SUFBUixZQUFLLEVBQUU7OEJBQWtCLGtCQUFXO3lEQUFNO0FBRGhDLGdCQUFnQjtJQUo1QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixRQUFRLEVBQUUsRUFBRTtLQUNiLENBQUM7cUNBSStCLHNCQUFTO1FBQ00sK0JBQXdCO1FBQ2hDLHVCQUFnQjtRQUNKLDhEQUE0QjtHQU5uRSxnQkFBZ0IsQ0F1QjVCO0FBdkJZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NvbnRhaW5lclJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbnB1dCwgQ29tcG9uZW50RmFjdG9yeSwgVGVtcGxhdGVSZWYsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90cmVlLm1vZGVsJztcbmltcG9ydCB7IEFkSG9jQ29tcG9uZW50RmFjdG9yeUNyZWF0b3IgfSBmcm9tICcuL2FkaG9jLWNvbXBvbmVudC1mYWN0b3J5LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdMb2FkaW5nQ29tcG9uZW50JyxcbiAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIExvYWRpbmdDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZU1vZGVsOiBUcmVlTW9kZWwsXG4gICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhZEhvY0NvbXBvbmVudEZhY3RvcnlDcmVhdG9yOiBBZEhvY0NvbXBvbmVudEZhY3RvcnlDcmVhdG9yKSB7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fbG9hZFRyZWVOb2RlQ29udGVudCgpO1xuICB9XG5cbiAgX2xvYWRUcmVlTm9kZUNvbnRlbnQoKSB7XG4gICAgbGV0IGNvbXBvbmVudEZhY3Rvcnk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLnRyZWVNb2RlbC5sb2FkaW5nQ29tcG9uZW50KTtcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5hZEhvY0NvbXBvbmVudEZhY3RvcnlDcmVhdG9yLmdldEZhY3RvcnkodGhpcy50cmVlTW9kZWwubG9hZGluZ0NvbXBvbmVudCk7XG4gICAgfVxuICAgIGxldCBjb21wb25lbnRSZWYgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgIGNvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn1cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==
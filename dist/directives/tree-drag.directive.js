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
var tree_dragged_element_model_1 = require("../models/tree-dragged-element.model");
var DRAG_OVER_CLASS = 'is-dragging-over';
var TreeDragDirective = (function () {
    function TreeDragDirective(el, renderer, treeDraggedElement) {
        this.el = el;
        this.renderer = renderer;
        this.treeDraggedElement = treeDraggedElement;
    }
    TreeDragDirective.prototype.ngDoCheck = function () {
        this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', this.treeDragEnabled ? "true" : "false");
    };
    TreeDragDirective.prototype.onDragStart = function () {
        var _this = this;
        setTimeout(function () { return _this.treeDraggedElement.set(_this.draggedElement); }, 30);
    };
    TreeDragDirective.prototype.onDragEnd = function () {
        this.treeDraggedElement.set(null);
    };
    return TreeDragDirective;
}());
__decorate([
    core_1.Input('treeDrag'),
    __metadata("design:type", Object)
], TreeDragDirective.prototype, "draggedElement", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeDragDirective.prototype, "treeDragEnabled", void 0);
__decorate([
    core_1.HostListener('dragstart'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeDragDirective.prototype, "onDragStart", null);
__decorate([
    core_1.HostListener('dragend'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeDragDirective.prototype, "onDragEnd", null);
TreeDragDirective = __decorate([
    core_1.Directive({
        selector: '[treeDrag]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, tree_dragged_element_model_1.TreeDraggedElement])
], TreeDragDirective);
exports.TreeDragDirective = TreeDragDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcmFnLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL3RyZWUtZHJhZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUE0RztBQUM1RyxtRkFBMEU7QUFFMUUsSUFBTSxlQUFlLEdBQUcsa0JBQWtCLENBQUM7QUFLM0MsSUFBYSxpQkFBaUI7SUFJNUIsMkJBQW9CLEVBQWMsRUFBVSxRQUFrQixFQUFVLGtCQUFxQztRQUF6RixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7SUFDN0csQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBRTBCLHVDQUFXLEdBQVg7UUFBM0IsaUJBRUM7UUFEQyxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxFQUFoRCxDQUFnRCxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFd0IscUNBQVMsR0FBVDtRQUN2QixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFqQm9CO0lBQWxCLFlBQUssQ0FBQyxVQUFVLENBQUM7O3lEQUFnQjtBQUN6QjtJQUFSLFlBQUssRUFBRTs7MERBQWlCO0FBU0U7SUFBMUIsbUJBQVksQ0FBQyxXQUFXLENBQUM7Ozs7b0RBRXpCO0FBRXdCO0lBQXhCLG1CQUFZLENBQUMsU0FBUyxDQUFDOzs7O2tEQUV2QjtBQWpCVSxpQkFBaUI7SUFIN0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxZQUFZO0tBQ3ZCLENBQUM7cUNBS3dCLGlCQUFVLEVBQW9CLGVBQVEsRUFBNkIsK0NBQWtCO0dBSmxHLGlCQUFpQixDQWtCN0I7QUFsQlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIFJlbmRlcmVyLCBFbGVtZW50UmVmLCBEb0NoZWNrIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlRHJhZ2dlZEVsZW1lbnQgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwnO1xuXG5jb25zdCBEUkFHX09WRVJfQ0xBU1MgPSAnaXMtZHJhZ2dpbmctb3Zlcic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0cmVlRHJhZ10nXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVEcmFnRGlyZWN0aXZlIGltcGxlbWVudHMgRG9DaGVjayB7XG4gIEBJbnB1dCgndHJlZURyYWcnKSBkcmFnZ2VkRWxlbWVudDtcbiAgQElucHV0KCkgdHJlZURyYWdFbmFibGVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyLCBwcml2YXRlIHRyZWVEcmFnZ2VkRWxlbWVudDpUcmVlRHJhZ2dlZEVsZW1lbnQpIHtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZHJhZ2dhYmxlJywgdGhpcy50cmVlRHJhZ0VuYWJsZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnKSBvbkRyYWdTdGFydCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudHJlZURyYWdnZWRFbGVtZW50LnNldCh0aGlzLmRyYWdnZWRFbGVtZW50KSwgMzApO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VuZCcpIG9uRHJhZ0VuZCgpIHtcbiAgICB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5zZXQobnVsbCk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19
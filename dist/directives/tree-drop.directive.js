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
var DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';
var TreeDropDirective = (function () {
    function TreeDropDirective(el, renderer, treeDraggedElement) {
        this.el = el;
        this.renderer = renderer;
        this.treeDraggedElement = treeDraggedElement;
        this.onDropCallback = new core_1.EventEmitter();
        this._allowDrop = function (element) { return true; };
    }
    Object.defineProperty(TreeDropDirective.prototype, "treeAllowDrop", {
        set: function (allowDrop) {
            if (allowDrop instanceof Function) {
                this._allowDrop = allowDrop;
            }
            else
                this._allowDrop = function (element) { return allowDrop; };
        },
        enumerable: true,
        configurable: true
    });
    TreeDropDirective.prototype.allowDrop = function () {
        return this._allowDrop(this.treeDraggedElement.get());
    };
    TreeDropDirective.prototype.onDragOver = function ($event) {
        if (!this.allowDrop())
            return this.addDisabledClass();
        $event.preventDefault();
        this.addClass();
    };
    TreeDropDirective.prototype.onDragLeave = function ($event) {
        if (!this.allowDrop())
            return this.removeDisabledClass();
        this.removeClass();
    };
    TreeDropDirective.prototype.onDrop = function ($event) {
        if (!this.allowDrop())
            return;
        $event.preventDefault();
        this.onDropCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        this.removeClass();
    };
    TreeDropDirective.prototype.addClass = function () {
        this.renderer.setElementClass(this.el.nativeElement, DRAG_OVER_CLASS, true);
    };
    TreeDropDirective.prototype.removeClass = function () {
        this.renderer.setElementClass(this.el.nativeElement, DRAG_OVER_CLASS, false);
    };
    TreeDropDirective.prototype.addDisabledClass = function () {
        this.renderer.setElementClass(this.el.nativeElement, DRAG_DISABLED_CLASS, true);
    };
    TreeDropDirective.prototype.removeDisabledClass = function () {
        this.renderer.setElementClass(this.el.nativeElement, DRAG_DISABLED_CLASS, false);
    };
    return TreeDropDirective;
}());
__decorate([
    core_1.Output('treeDrop'),
    __metadata("design:type", Object)
], TreeDropDirective.prototype, "onDropCallback", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], TreeDropDirective.prototype, "treeAllowDrop", null);
__decorate([
    core_1.HostListener('dragover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeDropDirective.prototype, "onDragOver", null);
__decorate([
    core_1.HostListener('dragleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeDropDirective.prototype, "onDragLeave", null);
__decorate([
    core_1.HostListener('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeDropDirective.prototype, "onDrop", null);
TreeDropDirective = __decorate([
    core_1.Directive({
        selector: '[treeDrop]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, tree_dragged_element_model_1.TreeDraggedElement])
], TreeDropDirective);
exports.TreeDropDirective = TreeDropDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL3RyZWUtZHJvcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUEyRztBQUMzRyxtRkFBMEU7QUFFMUUsSUFBTSxlQUFlLEdBQUcsa0JBQWtCLENBQUM7QUFDM0MsSUFBTSxtQkFBbUIsR0FBRywyQkFBMkIsQ0FBQztBQUt4RCxJQUFhLGlCQUFpQjtJQWM1QiwyQkFBb0IsRUFBYyxFQUFVLFFBQWtCLEVBQVUsa0JBQXFDO1FBQXpGLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQWJ6RixtQkFBYyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRWhELGVBQVUsR0FBRyxVQUFDLE9BQU8sSUFBSyxPQUFBLElBQUksRUFBSixDQUFJLENBQUM7SUFZdkMsQ0FBQztJQVhRLHNCQUFJLDRDQUFhO2FBQWpCLFVBQWtCLFNBQVM7WUFDbEMsRUFBRSxDQUFDLENBQUMsU0FBUyxZQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzlCLENBQUM7WUFDRCxJQUFJO2dCQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBQyxPQUFPLElBQUssT0FBQSxTQUFTLEVBQVQsQ0FBUyxDQUFDO1FBQ2hELENBQUM7OztPQUFBO0lBQ0QscUNBQVMsR0FBVDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFLcUMsc0NBQVUsR0FBVixVQUFXLE1BQU07UUFDckQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFdEQsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRXNDLHVDQUFXLEdBQVgsVUFBWSxNQUFNO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXpELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRWlDLGtDQUFNLEdBQU4sVUFBTyxNQUFNO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRTlCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsRUFBQyxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTyxvQ0FBUSxHQUFoQjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU8sdUNBQVcsR0FBbkI7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVPLDRDQUFnQixHQUF4QjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFTywrQ0FBbUIsR0FBM0I7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBckRELElBcURDO0FBcERxQjtJQUFuQixhQUFNLENBQUMsVUFBVSxDQUFDOzt5REFBcUM7QUFHL0M7SUFBUixZQUFLLEVBQUU7OztzREFLUDtBQVFxQztJQUFyQyxtQkFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O21EQUtwQztBQUVzQztJQUF0QyxtQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O29EQUlyQztBQUVpQztJQUFqQyxtQkFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OytDQU1oQztBQXBDVSxpQkFBaUI7SUFIN0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxZQUFZO0tBQ3ZCLENBQUM7cUNBZXdCLGlCQUFVLEVBQW9CLGVBQVEsRUFBNkIsK0NBQWtCO0dBZGxHLGlCQUFpQixDQXFEN0I7QUFyRFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPdXRwdXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgUmVuZGVyZXIsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVEcmFnZ2VkRWxlbWVudCB9IGZyb20gJy4uL21vZGVscy90cmVlLWRyYWdnZWQtZWxlbWVudC5tb2RlbCc7XG5cbmNvbnN0IERSQUdfT1ZFUl9DTEFTUyA9ICdpcy1kcmFnZ2luZy1vdmVyJztcbmNvbnN0IERSQUdfRElTQUJMRURfQ0xBU1MgPSAnaXMtZHJhZ2dpbmctb3Zlci1kaXNhYmxlZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0cmVlRHJvcF0nXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVEcm9wRGlyZWN0aXZlIHtcbiAgQE91dHB1dCgndHJlZURyb3AnKSBvbkRyb3BDYWxsYmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF9hbGxvd0Ryb3AgPSAoZWxlbWVudCkgPT4gdHJ1ZTtcbiAgQElucHV0KCkgc2V0IHRyZWVBbGxvd0Ryb3AoYWxsb3dEcm9wKSB7XG4gICAgaWYgKGFsbG93RHJvcCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICB0aGlzLl9hbGxvd0Ryb3AgPSBhbGxvd0Ryb3A7XG4gICAgfVxuICAgIGVsc2UgdGhpcy5fYWxsb3dEcm9wID0gKGVsZW1lbnQpID0+IGFsbG93RHJvcDtcbiAgfVxuICBhbGxvd0Ryb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbG93RHJvcCh0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5nZXQoKSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlciwgcHJpdmF0ZSB0cmVlRHJhZ2dlZEVsZW1lbnQ6VHJlZURyYWdnZWRFbGVtZW50KSB7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pIG9uRHJhZ092ZXIoJGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmFsbG93RHJvcCgpKSByZXR1cm4gdGhpcy5hZGREaXNhYmxlZENsYXNzKCk7XG5cbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmFkZENsYXNzKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKSBvbkRyYWdMZWF2ZSgkZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuYWxsb3dEcm9wKCkpIHJldHVybiB0aGlzLnJlbW92ZURpc2FibGVkQ2xhc3MoKTtcblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKSBvbkRyb3AoJGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmFsbG93RHJvcCgpKSByZXR1cm47XG5cbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLm9uRHJvcENhbGxiYWNrLmVtaXQoe2V2ZW50OiRldmVudCwgZWxlbWVudDp0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5nZXQoKX0pO1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ2xhc3MoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50Q2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBEUkFHX09WRVJfQ0xBU1MsIHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDbGFzcygpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIERSQUdfT1ZFUl9DTEFTUywgZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGREaXNhYmxlZENsYXNzKCkge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgRFJBR19ESVNBQkxFRF9DTEFTUywgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZURpc2FibGVkQ2xhc3MoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50Q2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBEUkFHX0RJU0FCTEVEX0NMQVNTLCBmYWxzZSk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19
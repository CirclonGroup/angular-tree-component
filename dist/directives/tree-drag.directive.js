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
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  Renderer2
} from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
var DRAG_OVER_CLASS = 'is-dragging-over';
var TreeDragDirective = /** @class */ (function() {
  function TreeDragDirective(el, renderer, treeDraggedElement, ngZone) {
    this.el = el;
    this.renderer = renderer;
    this.treeDraggedElement = treeDraggedElement;
    this.ngZone = ngZone;
    this.dragEventHandler = this.onDrag.bind(this);
  }
  TreeDragDirective.prototype.ngAfterViewInit = function() {
    var _this = this;
    var el = this.el.nativeElement;
    this.ngZone.runOutsideAngular(function() {
      el.addEventListener('drag', _this.dragEventHandler);
    });
  };
  TreeDragDirective.prototype.ngDoCheck = function() {
    this.renderer.setAttribute(
      this.el.nativeElement,
      'draggable',
      this.treeDragEnabled ? 'true' : 'false'
    );
  };
  TreeDragDirective.prototype.ngOnDestroy = function() {
    var el = this.el.nativeElement;
    el.removeEventListener('drag', this.dragEventHandler);
  };
  TreeDragDirective.prototype.onDragStart = function(ev) {
    // setting the data is required by firefox
    ev.dataTransfer.setData('text', ev.target.id);
    this.treeDraggedElement.set(this.draggedElement);
    if (this.draggedElement.mouseAction) {
      this.draggedElement.mouseAction('dragStart', ev);
    }
  };
  TreeDragDirective.prototype.onDrag = function(ev) {
    if (this.draggedElement.mouseAction) {
      this.draggedElement.mouseAction('drag', ev);
    }
  };
  TreeDragDirective.prototype.onDragEnd = function() {
    if (this.draggedElement.mouseAction) {
      this.draggedElement.mouseAction('dragEnd');
    }
    this.treeDraggedElement.set(null);
  };
  __decorate(
    [Input('treeDrag'), __metadata('design:type', Object)],
    TreeDragDirective.prototype,
    'draggedElement',
    void 0
  );
  __decorate(
    [Input(), __metadata('design:type', Object)],
    TreeDragDirective.prototype,
    'treeDragEnabled',
    void 0
  );
  __decorate(
    [
      HostListener('dragstart', ['$event']),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeDragDirective.prototype,
    'onDragStart',
    null
  );
  __decorate(
    [
      HostListener('dragend'),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0)
    ],
    TreeDragDirective.prototype,
    'onDragEnd',
    null
  );
  TreeDragDirective = __decorate(
    [
      Directive({
        selector: '[treeDrag]'
      }),
      __metadata('design:paramtypes', [
        ElementRef,
        Renderer2,
        TreeDraggedElement,
        NgZone
      ])
    ],
    TreeDragDirective
  );
  return TreeDragDirective;
})();
export { TreeDragDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcmFnLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL3RyZWUtZHJhZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFpQixTQUFTLEVBQVcsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRSxJQUFNLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQztBQUszQztJQUtFLDJCQUFvQixFQUFjLEVBQVUsUUFBbUIsRUFBVSxrQkFBc0MsRUFBVSxNQUFjO1FBQW5ILE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDckksSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCwyQ0FBZSxHQUFmO1FBQUEsaUJBS0M7UUFKQyxJQUFJLEVBQUUsR0FBZ0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztZQUM1QixFQUFFLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQsdUNBQVcsR0FBWDtRQUNFLElBQUksRUFBRSxHQUFnQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUM1QyxFQUFFLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFc0MsdUNBQVcsR0FBWCxVQUFZLEVBQUU7UUFDbkQsMENBQTBDO1FBQzFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2pELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQztJQUVELGtDQUFNLEdBQU4sVUFBTyxFQUFFO1FBQ1AsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRTtZQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBRXdCLHFDQUFTLEdBQVQ7UUFDdkIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRTtZQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM1QztRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQTVDa0I7UUFBbEIsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7NkRBQWdCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFOzs4REFBaUI7SUF1QmM7UUFBdEMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O3dEQU9yQztJQVF3QjtRQUF4QixZQUFZLENBQUMsU0FBUyxDQUFDOzs7O3NEQUt2QjtJQTdDVSxpQkFBaUI7UUFIN0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFlBQVk7U0FDdkIsQ0FBQzt5Q0FNd0IsVUFBVSxFQUFvQixTQUFTLEVBQThCLGtCQUFrQixFQUFrQixNQUFNO09BTDVILGlCQUFpQixDQThDN0I7SUFBRCx3QkFBQztDQUFBLEFBOUNELElBOENDO1NBOUNZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRG9DaGVjaywgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcblxuY29uc3QgRFJBR19PVkVSX0NMQVNTID0gJ2lzLWRyYWdnaW5nLW92ZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdHJlZURyYWddJ1xufSlcbmV4cG9ydCBjbGFzcyBUcmVlRHJhZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIERvQ2hlY2ssIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgndHJlZURyYWcnKSBkcmFnZ2VkRWxlbWVudDtcbiAgQElucHV0KCkgdHJlZURyYWdFbmFibGVkO1xuICBwcml2YXRlIHJlYWRvbmx5IGRyYWdFdmVudEhhbmRsZXI6IChldjogRHJhZ0V2ZW50KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB0cmVlRHJhZ2dlZEVsZW1lbnQ6IFRyZWVEcmFnZ2VkRWxlbWVudCwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciA9IHRoaXMub25EcmFnLmJpbmQodGhpcyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgbGV0IGVsOiBIVE1MRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnJywgdGhpcy5kcmFnRXZlbnRIYW5kbGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkcmFnZ2FibGUnLCB0aGlzLnRyZWVEcmFnRW5hYmxlZCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgbGV0IGVsOiBIVE1MRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnJywgdGhpcy5kcmFnRXZlbnRIYW5kbGVyKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcsIFsnJGV2ZW50J10pIG9uRHJhZ1N0YXJ0KGV2KSB7XG4gICAgLy8gc2V0dGluZyB0aGUgZGF0YSBpcyByZXF1aXJlZCBieSBmaXJlZm94XG4gICAgZXYuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCBldi50YXJnZXQuaWQpO1xuICAgIHRoaXMudHJlZURyYWdnZWRFbGVtZW50LnNldCh0aGlzLmRyYWdnZWRFbGVtZW50KTtcbiAgICBpZiAodGhpcy5kcmFnZ2VkRWxlbWVudC5tb3VzZUFjdGlvbikge1xuICAgICAgdGhpcy5kcmFnZ2VkRWxlbWVudC5tb3VzZUFjdGlvbignZHJhZ1N0YXJ0JywgZXYpO1xuICAgIH1cbiAgfVxuXG4gIG9uRHJhZyhldikge1xuICAgIGlmICh0aGlzLmRyYWdnZWRFbGVtZW50Lm1vdXNlQWN0aW9uKSB7XG4gICAgICB0aGlzLmRyYWdnZWRFbGVtZW50Lm1vdXNlQWN0aW9uKCdkcmFnJywgZXYpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnKSBvbkRyYWdFbmQoKSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dlZEVsZW1lbnQubW91c2VBY3Rpb24pIHtcbiAgICAgIHRoaXMuZHJhZ2dlZEVsZW1lbnQubW91c2VBY3Rpb24oJ2RyYWdFbmQnKTtcbiAgICB9XG4gICAgdGhpcy50cmVlRHJhZ2dlZEVsZW1lbnQuc2V0KG51bGwpO1xuICB9XG59XG4iXX0=

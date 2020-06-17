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
import { Component, ElementRef, NgZone } from '@angular/core';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { TREE_EVENTS } from '../constants/events';
import throttle from 'lodash/throttle';
var TreeViewportComponent = /** @class */ (function() {
  function TreeViewportComponent(elementRef, ngZone, virtualScroll) {
    var _this = this;
    this.elementRef = elementRef;
    this.ngZone = ngZone;
    this.virtualScroll = virtualScroll;
    this.setViewport = throttle(function() {
      _this.virtualScroll.setViewport(_this.elementRef.nativeElement);
    }, 17);
    this.scrollEventHandler = this.setViewport.bind(this);
  }
  TreeViewportComponent.prototype.ngOnInit = function() {
    this.virtualScroll.init();
  };
  TreeViewportComponent.prototype.ngAfterViewInit = function() {
    var _this = this;
    setTimeout(function() {
      _this.setViewport();
      _this.virtualScroll.fireEvent({ eventName: TREE_EVENTS.initialized });
    });
    var el = this.elementRef.nativeElement;
    this.ngZone.runOutsideAngular(function() {
      el.addEventListener('scroll', _this.scrollEventHandler);
    });
  };
  TreeViewportComponent.prototype.ngOnDestroy = function() {
    this.virtualScroll.clear();
    var el = this.elementRef.nativeElement;
    el.removeEventListener('scroll', this.scrollEventHandler);
  };
  TreeViewportComponent.prototype.getTotalHeight = function() {
    return (
      (this.virtualScroll.isEnabled() &&
        this.virtualScroll.totalHeight + 'px') ||
      'auto'
    );
  };
  TreeViewportComponent = __decorate(
    [
      Component({
        selector: 'tree-viewport',
        styles: [],
        providers: [TreeVirtualScroll],
        template:
          '\n    <ng-container *treeMobxAutorun="{ dontDetach: true }">\n      <div [style.height]="getTotalHeight()">\n        <ng-content></ng-content>\n      </div>\n    </ng-container>\n  '
      }),
      __metadata('design:paramtypes', [ElementRef, NgZone, TreeVirtualScroll])
    ],
    TreeViewportComponent
  );
  return TreeViewportComponent;
})();
export { TreeViewportComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3cG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy90cmVlLXZpZXdwb3J0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFLVixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWxELE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBY3ZDO0lBTUUsK0JBQ1UsVUFBc0IsRUFDdEIsTUFBYyxFQUNmLGFBQWdDO1FBSHpDLGlCQU1DO1FBTFMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Ysa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBUnpDLGdCQUFXLEdBQUcsUUFBUSxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBUUwsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsK0NBQWUsR0FBZjtRQUFBLGlCQVNDO1FBUkMsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLEtBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxFQUFFLEdBQWdCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUM7WUFDNUIsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxLQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixJQUFJLEVBQUUsR0FBZ0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDcEQsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsOENBQWMsR0FBZDtRQUNFLE9BQU8sQ0FDTCxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFO1lBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QyxNQUFNLENBQ1AsQ0FBQztJQUNKLENBQUM7SUF6Q1UscUJBQXFCO1FBWmpDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxlQUFlO1lBQ3pCLE1BQU0sRUFBRSxFQUFFO1lBQ1YsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDOUIsUUFBUSxFQUFFLDJMQU1UO1NBQ0YsQ0FBQzt5Q0FRc0IsVUFBVTtZQUNkLE1BQU07WUFDQSxpQkFBaUI7T0FUOUIscUJBQXFCLENBMENqQztJQUFELDRCQUFDO0NBQUEsQUExQ0QsSUEwQ0M7U0ExQ1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIE5nWm9uZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVWaXJ0dWFsU2Nyb2xsIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtdmlydHVhbC1zY3JvbGwubW9kZWwnO1xuaW1wb3J0IHsgVFJFRV9FVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcbmltcG9ydCB7IENhbmNlbGFibGUgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHRocm90dGxlIGZyb20gJ2xvZGFzaC90aHJvdHRsZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RyZWUtdmlld3BvcnQnLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtUcmVlVmlydHVhbFNjcm9sbF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqdHJlZU1vYnhBdXRvcnVuPVwieyBkb250RGV0YWNoOiB0cnVlIH1cIj5cbiAgICAgIDxkaXYgW3N0eWxlLmhlaWdodF09XCJnZXRUb3RhbEhlaWdodCgpXCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVWaWV3cG9ydENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgc2V0Vmlld3BvcnQgPSB0aHJvdHRsZSgoKSA9PiB7XG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsLnNldFZpZXdwb3J0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfSwgMTcpO1xuICBwcml2YXRlIHJlYWRvbmx5IHNjcm9sbEV2ZW50SGFuZGxlcjogKCRldmVudDogRXZlbnQpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgcHVibGljIHZpcnR1YWxTY3JvbGw6IFRyZWVWaXJ0dWFsU2Nyb2xsXG4gICkge1xuICAgIHRoaXMuc2Nyb2xsRXZlbnRIYW5kbGVyID0gdGhpcy5zZXRWaWV3cG9ydC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsLmluaXQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0Vmlld3BvcnQoKTtcbiAgICAgIHRoaXMudmlydHVhbFNjcm9sbC5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmluaXRpYWxpemVkIH0pO1xuICAgIH0pO1xuICAgIGxldCBlbDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEV2ZW50SGFuZGxlcik7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnZpcnR1YWxTY3JvbGwuY2xlYXIoKTtcbiAgICBsZXQgZWw6IEhUTUxFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxFdmVudEhhbmRsZXIpO1xuICB9XG5cbiAgZ2V0VG90YWxIZWlnaHQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLnZpcnR1YWxTY3JvbGwuaXNFbmFibGVkKCkgJiZcbiAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsLnRvdGFsSGVpZ2h0ICsgJ3B4JykgfHxcbiAgICAgICdhdXRvJ1xuICAgICk7XG4gIH1cbn1cbiJdfQ==

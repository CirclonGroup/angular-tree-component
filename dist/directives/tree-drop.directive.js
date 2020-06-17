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
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  Output,
  Renderer2
} from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
var DRAG_OVER_CLASS = 'is-dragging-over';
var DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';
var TreeDropDirective = /** @class */ (function() {
  function TreeDropDirective(el, renderer, treeDraggedElement, ngZone) {
    this.el = el;
    this.renderer = renderer;
    this.treeDraggedElement = treeDraggedElement;
    this.ngZone = ngZone;
    this.allowDragoverStyling = true;
    this.onDropCallback = new EventEmitter();
    this.onDragOverCallback = new EventEmitter();
    this.onDragLeaveCallback = new EventEmitter();
    this.onDragEnterCallback = new EventEmitter();
    this._allowDrop = function(element, $event) {
      return true;
    };
    this.dragOverEventHandler = this.onDragOver.bind(this);
    this.dragEnterEventHandler = this.onDragEnter.bind(this);
    this.dragLeaveEventHandler = this.onDragLeave.bind(this);
  }
  Object.defineProperty(TreeDropDirective.prototype, 'treeAllowDrop', {
    set: function(allowDrop) {
      if (allowDrop instanceof Function) {
        this._allowDrop = allowDrop;
      } else
        this._allowDrop = function(element, $event) {
          return allowDrop;
        };
    },
    enumerable: true,
    configurable: true
  });
  TreeDropDirective.prototype.allowDrop = function($event) {
    return this._allowDrop(this.treeDraggedElement.get(), $event);
  };
  TreeDropDirective.prototype.ngAfterViewInit = function() {
    var _this = this;
    var el = this.el.nativeElement;
    this.ngZone.runOutsideAngular(function() {
      el.addEventListener('dragover', _this.dragOverEventHandler);
      el.addEventListener('dragenter', _this.dragEnterEventHandler);
      el.addEventListener('dragleave', _this.dragLeaveEventHandler);
    });
  };
  TreeDropDirective.prototype.ngOnDestroy = function() {
    var el = this.el.nativeElement;
    el.removeEventListener('dragover', this.dragOverEventHandler);
    el.removeEventListener('dragenter', this.dragEnterEventHandler);
    el.removeEventListener('dragleave', this.dragLeaveEventHandler);
  };
  TreeDropDirective.prototype.onDragOver = function($event) {
    if (!this.allowDrop($event)) {
      if (this.allowDragoverStyling) {
        return this.addDisabledClass();
      }
      return;
    }
    this.onDragOverCallback.emit({
      event: $event,
      element: this.treeDraggedElement.get()
    });
    $event.preventDefault();
    if (this.allowDragoverStyling) {
      this.addClass();
    }
  };
  TreeDropDirective.prototype.onDragEnter = function($event) {
    if (!this.allowDrop($event)) return;
    $event.preventDefault();
    this.onDragEnterCallback.emit({
      event: $event,
      element: this.treeDraggedElement.get()
    });
  };
  TreeDropDirective.prototype.onDragLeave = function($event) {
    if (!this.allowDrop($event)) {
      if (this.allowDragoverStyling) {
        return this.removeDisabledClass();
      }
      return;
    }
    this.onDragLeaveCallback.emit({
      event: $event,
      element: this.treeDraggedElement.get()
    });
    if (this.allowDragoverStyling) {
      this.removeClass();
    }
  };
  TreeDropDirective.prototype.onDrop = function($event) {
    if (!this.allowDrop($event)) return;
    $event.preventDefault();
    this.onDropCallback.emit({
      event: $event,
      element: this.treeDraggedElement.get()
    });
    if (this.allowDragoverStyling) {
      this.removeClass();
    }
    this.treeDraggedElement.set(null);
  };
  TreeDropDirective.prototype.addClass = function() {
    this.renderer.addClass(this.el.nativeElement, DRAG_OVER_CLASS);
  };
  TreeDropDirective.prototype.removeClass = function() {
    this.renderer.removeClass(this.el.nativeElement, DRAG_OVER_CLASS);
  };
  TreeDropDirective.prototype.addDisabledClass = function() {
    this.renderer.addClass(this.el.nativeElement, DRAG_DISABLED_CLASS);
  };
  TreeDropDirective.prototype.removeDisabledClass = function() {
    this.renderer.removeClass(this.el.nativeElement, DRAG_DISABLED_CLASS);
  };
  __decorate(
    [Input(), __metadata('design:type', Object)],
    TreeDropDirective.prototype,
    'allowDragoverStyling',
    void 0
  );
  __decorate(
    [Output('treeDrop'), __metadata('design:type', Object)],
    TreeDropDirective.prototype,
    'onDropCallback',
    void 0
  );
  __decorate(
    [Output('treeDropDragOver'), __metadata('design:type', Object)],
    TreeDropDirective.prototype,
    'onDragOverCallback',
    void 0
  );
  __decorate(
    [Output('treeDropDragLeave'), __metadata('design:type', Object)],
    TreeDropDirective.prototype,
    'onDragLeaveCallback',
    void 0
  );
  __decorate(
    [Output('treeDropDragEnter'), __metadata('design:type', Object)],
    TreeDropDirective.prototype,
    'onDragEnterCallback',
    void 0
  );
  __decorate(
    [
      Input(),
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [Object])
    ],
    TreeDropDirective.prototype,
    'treeAllowDrop',
    null
  );
  __decorate(
    [
      HostListener('drop', ['$event']),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeDropDirective.prototype,
    'onDrop',
    null
  );
  TreeDropDirective = __decorate(
    [
      Directive({
        selector: '[treeDrop]'
      }),
      __metadata('design:paramtypes', [
        ElementRef,
        Renderer2,
        TreeDraggedElement,
        NgZone
      ])
    ],
    TreeDropDirective
  );
  return TreeDropDirective;
})();
export { TreeDropDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL3RyZWUtZHJvcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFMUUsSUFBTSxlQUFlLEdBQUcsa0JBQWtCLENBQUM7QUFDM0MsSUFBTSxtQkFBbUIsR0FBRywyQkFBMkIsQ0FBQztBQUt4RDtJQXVCRSwyQkFBb0IsRUFBYyxFQUFVLFFBQW1CLEVBQVUsa0JBQXNDLEVBQVUsTUFBYztRQUFuSCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBdEI5SCx5QkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDakIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN6Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSzlELGVBQVUsR0FBRyxVQUFDLE9BQU8sRUFBRSxNQUFNLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO1FBYzdDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFdBQVcs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SSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRU8sK0NBQW1CLEdBQTNCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBM0dRO1FBQVIsS0FBSyxFQUFFOzttRUFBNkI7SUFDakI7UUFBbkIsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7NkRBQXFDO0lBQzVCO1FBQTNCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQzs7aUVBQXlDO0lBQ3ZDO1FBQTVCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQzs7a0VBQTBDO0lBQ3pDO1FBQTVCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQzs7a0VBQTBDO0lBTzdEO1FBQVIsS0FBSyxFQUFFOzs7MERBS1A7SUFpRWlDO1FBQWpDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OzttREFVaEM7SUE1RlUsaUJBQWlCO1FBSDdCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxZQUFZO1NBQ3ZCLENBQUM7eUNBd0J3QixVQUFVLEVBQW9CLFNBQVMsRUFBOEIsa0JBQWtCLEVBQWtCLE1BQU07T0F2QjVILGlCQUFpQixDQTZHN0I7SUFBRCx3QkFBQztDQUFBLEFBN0dELElBNkdDO1NBN0dZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlRHJhZ2dlZEVsZW1lbnQgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwnO1xuXG5jb25zdCBEUkFHX09WRVJfQ0xBU1MgPSAnaXMtZHJhZ2dpbmctb3Zlcic7XG5jb25zdCBEUkFHX0RJU0FCTEVEX0NMQVNTID0gJ2lzLWRyYWdnaW5nLW92ZXItZGlzYWJsZWQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdHJlZURyb3BdJ1xufSlcbmV4cG9ydCBjbGFzcyBUcmVlRHJvcERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGFsbG93RHJhZ292ZXJTdHlsaW5nID0gdHJ1ZTtcbiAgQE91dHB1dCgndHJlZURyb3AnKSBvbkRyb3BDYWxsYmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgndHJlZURyb3BEcmFnT3ZlcicpIG9uRHJhZ092ZXJDYWxsYmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgndHJlZURyb3BEcmFnTGVhdmUnKSBvbkRyYWdMZWF2ZUNhbGxiYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCd0cmVlRHJvcERyYWdFbnRlcicpIG9uRHJhZ0VudGVyQ2FsbGJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ092ZXJFdmVudEhhbmRsZXI6IChldjogRHJhZ0V2ZW50KSA9PiB2b2lkO1xuICBwcml2YXRlIHJlYWRvbmx5IGRyYWdFbnRlckV2ZW50SGFuZGxlcjogKGV2OiBEcmFnRXZlbnQpID0+IHZvaWQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0xlYXZlRXZlbnRIYW5kbGVyOiAoZXY6IERyYWdFdmVudCkgPT4gdm9pZDtcblxuICBwcml2YXRlIF9hbGxvd0Ryb3AgPSAoZWxlbWVudCwgJGV2ZW50KSA9PiB0cnVlO1xuXG4gIEBJbnB1dCgpIHNldCB0cmVlQWxsb3dEcm9wKGFsbG93RHJvcCkge1xuICAgIGlmIChhbGxvd0Ryb3AgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgdGhpcy5fYWxsb3dEcm9wID0gYWxsb3dEcm9wO1xuICAgIH1cbiAgICBlbHNlIHRoaXMuX2FsbG93RHJvcCA9IChlbGVtZW50LCAkZXZlbnQpID0+IGFsbG93RHJvcDtcbiAgfVxuXG4gIGFsbG93RHJvcCgkZXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5fYWxsb3dEcm9wKHRoaXMudHJlZURyYWdnZWRFbGVtZW50LmdldCgpLCAkZXZlbnQpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIHRyZWVEcmFnZ2VkRWxlbWVudDogVHJlZURyYWdnZWRFbGVtZW50LCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgdGhpcy5kcmFnT3ZlckV2ZW50SGFuZGxlciA9IHRoaXMub25EcmFnT3Zlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZHJhZ0VudGVyRXZlbnRIYW5kbGVyID0gdGhpcy5vbkRyYWdFbnRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZHJhZ0xlYXZlRXZlbnRIYW5kbGVyID0gdGhpcy5vbkRyYWdMZWF2ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGxldCBlbDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVyRXZlbnRIYW5kbGVyKTtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIHRoaXMuZHJhZ0VudGVyRXZlbnRIYW5kbGVyKTtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlRXZlbnRIYW5kbGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGxldCBlbDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVyRXZlbnRIYW5kbGVyKTtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCB0aGlzLmRyYWdFbnRlckV2ZW50SGFuZGxlcik7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5kcmFnTGVhdmVFdmVudEhhbmRsZXIpO1xuICB9XG5cbiAgb25EcmFnT3ZlcigkZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuYWxsb3dEcm9wKCRldmVudCkpIHtcbiAgICAgIGlmICh0aGlzLmFsbG93RHJhZ292ZXJTdHlsaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZERpc2FibGVkQ2xhc3MoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9uRHJhZ092ZXJDYWxsYmFjay5lbWl0KHtldmVudDogJGV2ZW50LCBlbGVtZW50OiB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5nZXQoKX0pO1xuXG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMuYWxsb3dEcmFnb3ZlclN0eWxpbmcpIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoKTtcbiAgICB9XG4gIH1cblxuICBvbkRyYWdFbnRlcigkZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuYWxsb3dEcm9wKCRldmVudCkpIHJldHVybjtcblxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMub25EcmFnRW50ZXJDYWxsYmFjay5lbWl0KHtldmVudDogJGV2ZW50LCBlbGVtZW50OiB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5nZXQoKX0pO1xuICB9XG5cbiAgb25EcmFnTGVhdmUoJGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmFsbG93RHJvcCgkZXZlbnQpKSB7XG4gICAgICBpZiAodGhpcy5hbGxvd0RyYWdvdmVyU3R5bGluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVEaXNhYmxlZENsYXNzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub25EcmFnTGVhdmVDYWxsYmFjay5lbWl0KHtldmVudDogJGV2ZW50LCBlbGVtZW50OiB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5nZXQoKX0pO1xuXG4gICAgaWYgKHRoaXMuYWxsb3dEcmFnb3ZlclN0eWxpbmcpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSkgb25Ecm9wKCRldmVudCkge1xuICAgIGlmICghdGhpcy5hbGxvd0Ryb3AoJGV2ZW50KSkgcmV0dXJuO1xuXG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5vbkRyb3BDYWxsYmFjay5lbWl0KHtldmVudDogJGV2ZW50LCBlbGVtZW50OiB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5nZXQoKX0pO1xuXG4gICAgaWYgKHRoaXMuYWxsb3dEcmFnb3ZlclN0eWxpbmcpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoKTtcbiAgICB9XG4gICAgdGhpcy50cmVlRHJhZ2dlZEVsZW1lbnQuc2V0KG51bGwpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDbGFzcygpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgRFJBR19PVkVSX0NMQVNTKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ2xhc3MoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIERSQUdfT1ZFUl9DTEFTUyk7XG4gIH1cblxuICBwcml2YXRlIGFkZERpc2FibGVkQ2xhc3MoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIERSQUdfRElTQUJMRURfQ0xBU1MpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVEaXNhYmxlZENsYXNzKCkge1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBEUkFHX0RJU0FCTEVEX0NMQVNTKTtcbiAgfVxufVxuIl19

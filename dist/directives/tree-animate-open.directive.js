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
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
var EASE_ACCELERATION = 1.005;
var TreeAnimateOpenDirective = /** @class */ (function() {
  function TreeAnimateOpenDirective(renderer, templateRef, viewContainerRef) {
    this.renderer = renderer;
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
  }
  Object.defineProperty(TreeAnimateOpenDirective.prototype, 'isOpen', {
    set: function(value) {
      if (value) {
        this._show();
        if (this.isEnabled && this._isOpen === false) {
          this._animateOpen();
        }
      } else {
        this.isEnabled ? this._animateClose() : this._hide();
      }
      this._isOpen = !!value;
    },
    enumerable: true,
    configurable: true
  });
  TreeAnimateOpenDirective.prototype._show = function() {
    if (this.innerElement) return;
    // create child view
    this.innerElement = this.viewContainerRef.createEmbeddedView(
      this.templateRef
    ).rootNodes[0];
  };
  TreeAnimateOpenDirective.prototype._hide = function() {
    this.viewContainerRef.clear();
    this.innerElement = null;
  };
  TreeAnimateOpenDirective.prototype._animateOpen = function() {
    var _this = this;
    var delta = this.animateSpeed;
    var ease = this.animateAcceleration;
    var maxHeight = 0;
    // set height to 0
    this.renderer.setStyle(this.innerElement, 'max-height', '0');
    // increase maxHeight until height doesn't change
    setTimeout(function() {
      var i = setInterval(function() {
        if (!_this._isOpen || !_this.innerElement) return clearInterval(i);
        maxHeight += delta;
        var roundedMaxHeight = Math.round(maxHeight);
        _this.renderer.setStyle(
          _this.innerElement,
          'max-height',
          roundedMaxHeight + 'px'
        );
        var height = _this.innerElement.getBoundingClientRect
          ? _this.innerElement.getBoundingClientRect().height
          : 0; // TBD use renderer
        delta *= ease;
        ease *= EASE_ACCELERATION;
        if (height < roundedMaxHeight) {
          // Make maxHeight auto because animation finished and container might change height later on
          _this.renderer.setStyle(_this.innerElement, 'max-height', null);
          clearInterval(i);
        }
      }, 17);
    });
  };
  TreeAnimateOpenDirective.prototype._animateClose = function() {
    var _this = this;
    if (!this.innerElement) return;
    var delta = this.animateSpeed;
    var ease = this.animateAcceleration;
    var height = this.innerElement.getBoundingClientRect().height; // TBD use renderer
    // slowly decrease maxHeight to 0, starting from current height
    var i = setInterval(function() {
      if (_this._isOpen || !_this.innerElement) return clearInterval(i);
      height -= delta;
      _this.renderer.setStyle(_this.innerElement, 'max-height', height + 'px');
      delta *= ease;
      ease *= EASE_ACCELERATION;
      if (height <= 0) {
        // after animation complete - remove child element
        _this.viewContainerRef.clear();
        _this.innerElement = null;
        clearInterval(i);
      }
    }, 17);
  };
  __decorate(
    [Input('treeAnimateOpenSpeed'), __metadata('design:type', Number)],
    TreeAnimateOpenDirective.prototype,
    'animateSpeed',
    void 0
  );
  __decorate(
    [Input('treeAnimateOpenAcceleration'), __metadata('design:type', Number)],
    TreeAnimateOpenDirective.prototype,
    'animateAcceleration',
    void 0
  );
  __decorate(
    [Input('treeAnimateOpenEnabled'), __metadata('design:type', Boolean)],
    TreeAnimateOpenDirective.prototype,
    'isEnabled',
    void 0
  );
  __decorate(
    [
      Input('treeAnimateOpen'),
      __metadata('design:type', Boolean),
      __metadata('design:paramtypes', [Boolean])
    ],
    TreeAnimateOpenDirective.prototype,
    'isOpen',
    null
  );
  TreeAnimateOpenDirective = __decorate(
    [
      Directive({
        selector: '[treeAnimateOpen]'
      }),
      __metadata('design:paramtypes', [
        Renderer2,
        TemplateRef,
        ViewContainerRef
      ])
    ],
    TreeAnimateOpenDirective
  );
  return TreeAnimateOpenDirective;
})();
export { TreeAnimateOpenDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1hbmltYXRlLW9wZW4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2RpcmVjdGl2ZXMvdHJlZS1hbmltYXRlLW9wZW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0YsSUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFLaEM7SUFzQkUsa0NBQ1UsUUFBbUIsRUFDbkIsV0FBNkIsRUFDN0IsZ0JBQWtDO1FBRmxDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFDNUMsQ0FBQztJQWxCRCxzQkFBSSw0Q0FBTTthQUFWLFVBQVcsS0FBYztZQUN2QixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO29CQUM1QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3JCO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDdEQ7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFBQSxDQUFDO0lBVU0sd0NBQUssR0FBYjtRQUNFLElBQUksSUFBSSxDQUFDLFlBQVk7WUFBRSxPQUFPO1FBRTlCLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxn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QkFDOUIsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQjtRQUNILENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7SUExRjhCO1FBQTlCLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzs7a0VBQXNCO0lBQ2Q7UUFBckMsS0FBSyxDQUFDLDZCQUE2QixDQUFDOzt5RUFBNkI7SUFDakM7UUFBaEMsS0FBSyxDQUFDLHdCQUF3QixDQUFDOzsrREFBb0I7SUFHcEQ7UUFEQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7OzswREFXeEI7SUFsQlUsd0JBQXdCO1FBSHBDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7U0FDOUIsQ0FBQzt5Q0F3Qm9CLFNBQVM7WUFDTixXQUFXO1lBQ04sZ0JBQWdCO09BekJqQyx3QkFBd0IsQ0E4RnBDO0lBQUQsK0JBQUM7Q0FBQSxBQTlGRCxJQThGQztTQTlGWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBSZW5kZXJlcjIsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IEVBU0VfQUNDRUxFUkFUSU9OID0gMS4wMDU7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0cmVlQW5pbWF0ZU9wZW5dJ1xufSlcbmV4cG9ydCBjbGFzcyBUcmVlQW5pbWF0ZU9wZW5EaXJlY3RpdmUge1xuICBwcml2YXRlIF9pc09wZW46IGJvb2xlYW47XG5cbiAgQElucHV0KCd0cmVlQW5pbWF0ZU9wZW5TcGVlZCcpIGFuaW1hdGVTcGVlZDogbnVtYmVyO1xuICBASW5wdXQoJ3RyZWVBbmltYXRlT3BlbkFjY2VsZXJhdGlvbicpIGFuaW1hdGVBY2NlbGVyYXRpb246IG51bWJlcjtcbiAgQElucHV0KCd0cmVlQW5pbWF0ZU9wZW5FbmFibGVkJykgaXNFbmFibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgndHJlZUFuaW1hdGVPcGVuJylcbiAgc2V0IGlzT3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fc2hvdygpO1xuICAgICAgaWYgKHRoaXMuaXNFbmFibGVkICYmIHRoaXMuX2lzT3BlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fYW5pbWF0ZU9wZW4oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0VuYWJsZWQgPyB0aGlzLl9hbmltYXRlQ2xvc2UoKSA6IHRoaXMuX2hpZGUoKTtcbiAgICB9XG4gICAgdGhpcy5faXNPcGVuID0gISF2YWx1ZTtcbiAgfTtcblxuICBwcml2YXRlIGlubmVyRWxlbWVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hvdygpIHtcbiAgICBpZiAodGhpcy5pbm5lckVsZW1lbnQpIHJldHVybjtcblxuICAgIC8vIGNyZWF0ZSBjaGlsZCB2aWV3XG4gICAgdGhpcy5pbm5lckVsZW1lbnQgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpLnJvb3ROb2Rlc1swXTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGUoKSB7XG4gICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgdGhpcy5pbm5lckVsZW1lbnQgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfYW5pbWF0ZU9wZW4oKSB7XG4gICAgbGV0IGRlbHRhID0gdGhpcy5hbmltYXRlU3BlZWQ7XG4gICAgbGV0IGVhc2UgPSB0aGlzLmFuaW1hdGVBY2NlbGVyYXRpb247XG4gICAgbGV0IG1heEhlaWdodCA9IDA7XG5cbiAgICAvLyBzZXQgaGVpZ2h0IHRvIDBcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW5uZXJFbGVtZW50LCAnbWF4LWhlaWdodCcsIGAwYCk7XG5cbiAgICAvLyBpbmNyZWFzZSBtYXhIZWlnaHQgdW50aWwgaGVpZ2h0IGRvZXNuJ3QgY2hhbmdlXG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIEFsbG93IGlubmVyIGVsZW1lbnQgdG8gY3JlYXRlIGl0cyBjb250ZW50XG4gICAgICBjb25zdCBpID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX2lzT3BlbiB8fCAhdGhpcy5pbm5lckVsZW1lbnQpIHJldHVybiBjbGVhckludGVydmFsKGkpO1xuXG4gICAgICAgIG1heEhlaWdodCArPSBkZWx0YTtcbiAgICAgICAgY29uc3Qgcm91bmRlZE1heEhlaWdodCA9IE1hdGgucm91bmQobWF4SGVpZ2h0KTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW5uZXJFbGVtZW50LCAnbWF4LWhlaWdodCcsIGAke3JvdW5kZWRNYXhIZWlnaHR9cHhgKTtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5pbm5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID8gdGhpcy5pbm5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IDogMDsgLy8gVEJEIHVzZSByZW5kZXJlclxuXG4gICAgICAgIGRlbHRhICo9IGVhc2U7XG4gICAgICAgIGVhc2UgKj0gRUFTRV9BQ0NFTEVSQVRJT047XG4gICAgICAgIGlmIChoZWlnaHQgPCByb3VuZGVkTWF4SGVpZ2h0KSB7XG4gICAgICAgICAgLy8gTWFrZSBtYXhIZWlnaHQgYXV0byBiZWNhdXNlIGFuaW1hdGlvbiBmaW5pc2hlZCBhbmQgY29udGFpbmVyIG1pZ2h0IGNoYW5nZSBoZWlnaHQgbGF0ZXIgb25cbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW5uZXJFbGVtZW50LCAnbWF4LWhlaWdodCcsIG51bGwpO1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDE3KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FuaW1hdGVDbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuaW5uZXJFbGVtZW50KSByZXR1cm47XG5cbiAgICBsZXQgZGVsdGEgPSB0aGlzLmFuaW1hdGVTcGVlZDtcbiAgICBsZXQgZWFzZSA9IHRoaXMuYW5pbWF0ZUFjY2VsZXJhdGlvbjtcbiAgICBsZXQgaGVpZ2h0ID0gdGhpcy5pbm5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0OyAvLyBUQkQgdXNlIHJlbmRlcmVyXG5cbiAgICAvLyBzbG93bHkgZGVjcmVhc2UgbWF4SGVpZ2h0IHRvIDAsIHN0YXJ0aW5nIGZyb20gY3VycmVudCBoZWlnaHRcbiAgICBjb25zdCBpID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2lzT3BlbiB8fCAhdGhpcy5pbm5lckVsZW1lbnQpIHJldHVybiBjbGVhckludGVydmFsKGkpO1xuXG4gICAgICBoZWlnaHQgLT0gZGVsdGE7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW5uZXJFbGVtZW50LCAnbWF4LWhlaWdodCcsIGAke2hlaWdodH1weGApO1xuICAgICAgZGVsdGEgKj0gZWFzZTtcbiAgICAgIGVhc2UgKj0gRUFTRV9BQ0NFTEVSQVRJT047XG5cbiAgICAgIGlmIChoZWlnaHQgPD0gMCkge1xuICAgICAgICAvLyBhZnRlciBhbmltYXRpb24gY29tcGxldGUgLSByZW1vdmUgY2hpbGQgZWxlbWVudFxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5pbm5lckVsZW1lbnQgPSBudWxsO1xuICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgfVxuICAgIH0sIDE3KTtcbiAgfVxufVxuIl19

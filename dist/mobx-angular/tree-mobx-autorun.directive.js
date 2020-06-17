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
import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { autorun } from 'mobx';
var TreeMobxAutorunDirective = /** @class */ (function() {
  function TreeMobxAutorunDirective(templateRef, viewContainer) {
    this.templateRef = templateRef;
    this.viewContainer = viewContainer;
    this.templateBindings = {};
  }
  TreeMobxAutorunDirective.prototype.ngOnInit = function() {
    this.view = this.viewContainer.createEmbeddedView(this.templateRef);
    if (this.dispose) {
      this.dispose();
    }
    if (this.shouldDetach()) {
      this.view.detach();
    }
    this.autoDetect(this.view);
  };
  TreeMobxAutorunDirective.prototype.shouldDetach = function() {
    return this.treeMobxAutorun && this.treeMobxAutorun.detach;
  };
  TreeMobxAutorunDirective.prototype.autoDetect = function(view) {
    this.dispose = autorun(function() {
      return view.detectChanges();
    });
  };
  TreeMobxAutorunDirective.prototype.ngOnDestroy = function() {
    if (this.dispose) {
      this.dispose();
    }
  };
  __decorate(
    [Input(), __metadata('design:type', Object)],
    TreeMobxAutorunDirective.prototype,
    'treeMobxAutorun',
    void 0
  );
  TreeMobxAutorunDirective = __decorate(
    [
      Directive({ selector: '[treeMobxAutorun]' }),
      __metadata('design:paramtypes', [TemplateRef, ViewContainerRef])
    ],
    TreeMobxAutorunDirective
  );
  return TreeMobxAutorunDirective;
})();
export { TreeMobxAutorunDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tb2J4LWF1dG9ydW4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21vYngtYW5ndWxhci90cmVlLW1vYngtYXV0b3J1bi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsV0FBVyxFQUdYLEtBQUssRUFFTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CO0lBTUUsa0NBQ1ksV0FBNkIsRUFDN0IsYUFBK0I7UUFEL0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQVBqQyxxQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFRN0IsQ0FBQztJQUVKLDJDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXBFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEI7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELCtDQUFZLEdBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7SUFDN0QsQ0FBQztJQUVELDZDQUFVLEdBQVYsVUFBVyxJQUEwQjtRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELDhDQUFXLEdBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQztJQWhDUTtRQUFSLEtBQUssRUFBRTs7cUVBQWlCO0lBSmQsd0JBQXdCO1FBRHBDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxDQUFDO3lDQVFsQixXQUFXO1lBQ1QsZ0JBQWdCO09BUmhDLHdCQUF3QixDQXFDcEM7SUFBRCwrQkFBQztDQUFBLEFBckNELElBcUNDO1NBckNZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVGVtcGxhdGVSZWYsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBJbnB1dCxcbiAgRW1iZWRkZWRWaWV3UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYXV0b3J1biB9IGZyb20gJ21vYngnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdHJlZU1vYnhBdXRvcnVuXScgfSlcbmV4cG9ydCBjbGFzcyBUcmVlTW9ieEF1dG9ydW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCB0ZW1wbGF0ZUJpbmRpbmdzID0ge307XG4gIHByb3RlY3RlZCBkaXNwb3NlOiBhbnk7XG4gIHByb3RlY3RlZCB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgQElucHV0KCkgdHJlZU1vYnhBdXRvcnVuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICBwcm90ZWN0ZWQgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy52aWV3ID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcblxuICAgIGlmICh0aGlzLmRpc3Bvc2UpIHtcbiAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNob3VsZERldGFjaCgpKSB7XG4gICAgICB0aGlzLnZpZXcuZGV0YWNoKCk7XG4gICAgfVxuICAgIHRoaXMuYXV0b0RldGVjdCh0aGlzLnZpZXcpO1xuICB9XG5cbiAgc2hvdWxkRGV0YWNoKCkge1xuICAgIHJldHVybiB0aGlzLnRyZWVNb2J4QXV0b3J1biAmJiB0aGlzLnRyZWVNb2J4QXV0b3J1bi5kZXRhY2g7XG4gIH1cblxuICBhdXRvRGV0ZWN0KHZpZXc6IEVtYmVkZGVkVmlld1JlZjxhbnk+KSB7XG4gICAgdGhpcy5kaXNwb3NlID0gYXV0b3J1bigoKSA9PiB2aWV3LmRldGVjdENoYW5nZXMoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5kaXNwb3NlKSB7XG4gICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==

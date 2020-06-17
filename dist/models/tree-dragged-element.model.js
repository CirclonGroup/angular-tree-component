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
import { Injectable } from '@angular/core';
var TreeDraggedElement = /** @class */ (function() {
  function TreeDraggedElement() {
    this._draggedElement = null;
  }
  TreeDraggedElement.prototype.set = function(draggedElement) {
    this._draggedElement = draggedElement;
  };
  TreeDraggedElement.prototype.get = function() {
    return this._draggedElement;
  };
  TreeDraggedElement.prototype.isDragging = function() {
    return !!this.get();
  };
  TreeDraggedElement = __decorate([Injectable()], TreeDraggedElement);
  return TreeDraggedElement;
})();
export { TreeDraggedElement };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0M7SUFEQTtRQUVFLG9CQUFlLEdBQVEsSUFBSSxDQUFDO0lBYTlCLENBQUM7SUFYQyxnQ0FBRyxHQUFILFVBQUksY0FBbUI7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7SUFDeEMsQ0FBQztJQUVELGdDQUFHLEdBQUg7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELHVDQUFVLEdBQVY7UUFDRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQWJVLGtCQUFrQjtRQUQ5QixVQUFVLEVBQUU7T0FDQSxrQkFBa0IsQ0FjOUI7SUFBRCx5QkFBQztDQUFBLEFBZEQsSUFjQztTQWRZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyZWVEcmFnZ2VkRWxlbWVudCB7XG4gIF9kcmFnZ2VkRWxlbWVudDogYW55ID0gbnVsbDtcblxuICBzZXQoZHJhZ2dlZEVsZW1lbnQ6IGFueSkge1xuICAgIHRoaXMuX2RyYWdnZWRFbGVtZW50ID0gZHJhZ2dlZEVsZW1lbnQ7XG4gIH1cblxuICBnZXQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fZHJhZ2dlZEVsZW1lbnQ7XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIHJldHVybiAhIXRoaXMuZ2V0KCk7XG4gIH1cbn1cbiJdfQ==

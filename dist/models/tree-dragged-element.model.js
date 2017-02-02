"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var TreeDraggedElement = (function () {
    function TreeDraggedElement() {
        this._draggedElement = null;
    }
    TreeDraggedElement.prototype.set = function (draggedElement) {
        this._draggedElement = draggedElement;
    };
    TreeDraggedElement.prototype.get = function () {
        return this._draggedElement;
    };
    TreeDraggedElement.prototype.isDragging = function () {
        return !!this.get();
    };
    return TreeDraggedElement;
}());
TreeDraggedElement = __decorate([
    core_1.Injectable()
], TreeDraggedElement);
exports.TreeDraggedElement = TreeDraggedElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFHM0MsSUFBYSxrQkFBa0I7SUFEL0I7UUFFRSxvQkFBZSxHQUFRLElBQUksQ0FBQztJQWE5QixDQUFDO0lBWEMsZ0NBQUcsR0FBSCxVQUFJLGNBQWtCO1FBQ3BCLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxnQ0FBRyxHQUFIO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELHVDQUFVLEdBQVY7UUFDRSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQWRZLGtCQUFrQjtJQUQ5QixpQkFBVSxFQUFFO0dBQ0Esa0JBQWtCLENBYzlCO0FBZFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJlZURyYWdnZWRFbGVtZW50IHtcbiAgX2RyYWdnZWRFbGVtZW50OiBhbnkgPSBudWxsO1xuXG4gIHNldChkcmFnZ2VkRWxlbWVudDphbnkpIHtcbiAgICB0aGlzLl9kcmFnZ2VkRWxlbWVudCA9IGRyYWdnZWRFbGVtZW50O1xuICB9XG5cbiAgZ2V0KCk6YW55IHtcbiAgICByZXR1cm4gdGhpcy5fZHJhZ2dlZEVsZW1lbnQ7XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIHJldHVybiAhIXRoaXMuZ2V0KCk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19
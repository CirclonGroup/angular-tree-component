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
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
var TreeNodeExpanderComponent = /** @class */ (function() {
  function TreeNodeExpanderComponent() {}
  __decorate(
    [Input(), __metadata('design:type', TreeNode)],
    TreeNodeExpanderComponent.prototype,
    'node',
    void 0
  );
  TreeNodeExpanderComponent = __decorate(
    [
      Component({
        selector: 'tree-node-expander',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        template:
          '\n    <ng-container *treeMobxAutorun="{ dontDetach: true }">\n      <span\n        *ngIf="node.hasChildren"\n        [class.toggle-children-wrapper-expanded]="node.isExpanded"\n        [class.toggle-children-wrapper-collapsed]="node.isCollapsed"\n        class="toggle-children-wrapper"\n        (click)="node.mouseAction(\'expanderClick\', $event)"\n      >\n        <span class="toggle-children"></span>\n      </span>\n      <span *ngIf="!node.hasChildren" class="toggle-children-placeholder">\n      </span>\n    </ng-container>\n  '
      })
    ],
    TreeNodeExpanderComponent
  );
  return TreeNodeExpanderComponent;
})();
export { TreeNodeExpanderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWV4cGFuZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1leHBhbmRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBc0JyRDtJQUFBO0lBRUEsQ0FBQztJQURVO1FBQVIsS0FBSyxFQUFFO2tDQUFPLFFBQVE7MkRBQUM7SUFEYix5QkFBeUI7UUFwQnJDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsTUFBTSxFQUFFLEVBQUU7WUFDVixRQUFRLEVBQUUsMGlCQWNUO1NBQ0YsQ0FBQztPQUNXLHlCQUF5QixDQUVyQztJQUFELGdDQUFDO0NBQUEsQUFGRCxJQUVDO1NBRlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RyZWUtbm9kZS1leHBhbmRlcicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlczogW10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqdHJlZU1vYnhBdXRvcnVuPVwieyBkb250RGV0YWNoOiB0cnVlIH1cIj5cbiAgICAgIDxzcGFuXG4gICAgICAgICpuZ0lmPVwibm9kZS5oYXNDaGlsZHJlblwiXG4gICAgICAgIFtjbGFzcy50b2dnbGUtY2hpbGRyZW4td3JhcHBlci1leHBhbmRlZF09XCJub2RlLmlzRXhwYW5kZWRcIlxuICAgICAgICBbY2xhc3MudG9nZ2xlLWNoaWxkcmVuLXdyYXBwZXItY29sbGFwc2VkXT1cIm5vZGUuaXNDb2xsYXBzZWRcIlxuICAgICAgICBjbGFzcz1cInRvZ2dsZS1jaGlsZHJlbi13cmFwcGVyXCJcbiAgICAgICAgKGNsaWNrKT1cIm5vZGUubW91c2VBY3Rpb24oJ2V4cGFuZGVyQ2xpY2snLCAkZXZlbnQpXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b2dnbGUtY2hpbGRyZW5cIj48L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiAqbmdJZj1cIiFub2RlLmhhc0NoaWxkcmVuXCIgY2xhc3M9XCJ0b2dnbGUtY2hpbGRyZW4tcGxhY2Vob2xkZXJcIj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZUV4cGFuZGVyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XG59XG4iXX0=

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
var TreeNodeDropSlot = /** @class */ (function() {
  function TreeNodeDropSlot() {}
  TreeNodeDropSlot.prototype.onDrop = function($event) {
    this.node.mouseAction('drop', $event.event, {
      from: $event.element,
      to: { parent: this.node, index: this.dropIndex }
    });
  };
  TreeNodeDropSlot.prototype.allowDrop = function(element, $event) {
    return this.node.options.allowDrop(
      element,
      { parent: this.node, index: this.dropIndex },
      $event
    );
  };
  __decorate(
    [Input(), __metadata('design:type', TreeNode)],
    TreeNodeDropSlot.prototype,
    'node',
    void 0
  );
  __decorate(
    [Input(), __metadata('design:type', Number)],
    TreeNodeDropSlot.prototype,
    'dropIndex',
    void 0
  );
  TreeNodeDropSlot = __decorate(
    [
      Component({
        selector: 'TreeNodeDropSlot, tree-node-drop-slot',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        template:
          '\n    <div\n      class="node-drop-slot"\n      (treeDrop)="onDrop($event)"\n      [treeAllowDrop]="allowDrop.bind(this)"\n      [allowDragoverStyling]="true">\n    </div>\n  '
      })
    ],
    TreeNodeDropSlot
  );
  return TreeNodeDropSlot;
})();
export { TreeNodeDropSlot };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWRyb3Atc2xvdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy90cmVlLW5vZGUtZHJvcC1zbG90LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFlckQ7SUFBQTtJQWNBLENBQUM7SUFWQyxpQ0FBTSxHQUFOLFVBQU8sTUFBTTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQzFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTztZQUNwQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRTtTQUNqRCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0NBQVMsR0FBVCxVQUFVLE9BQU8sRUFBRSxNQUFNO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQVpRO1FBQVIsS0FBSyxFQUFFO2tDQUFPLFFBQVE7a0RBQUM7SUFDZjtRQUFSLEtBQUssRUFBRTs7dURBQW1CO0lBRmhCLGdCQUFnQjtRQWI1QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsdUNBQXVDO1lBQ2pELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLE1BQU0sRUFBRSxFQUFFO1lBQ1YsUUFBUSxFQUFFLHlMQU9UO1NBQ0YsQ0FBQztPQUNXLGdCQUFnQixDQWM1QjtJQUFELHVCQUFDO0NBQUEsQUFkRCxJQWNDO1NBZFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1RyZWVOb2RlRHJvcFNsb3QsIHRyZWUtbm9kZS1kcm9wLXNsb3QnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZXM6IFtdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwibm9kZS1kcm9wLXNsb3RcIlxuICAgICAgKHRyZWVEcm9wKT1cIm9uRHJvcCgkZXZlbnQpXCJcbiAgICAgIFt0cmVlQWxsb3dEcm9wXT1cImFsbG93RHJvcC5iaW5kKHRoaXMpXCJcbiAgICAgIFthbGxvd0RyYWdvdmVyU3R5bGluZ109XCJ0cnVlXCI+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVEcm9wU2xvdCB7XG4gIEBJbnB1dCgpIG5vZGU6IFRyZWVOb2RlO1xuICBASW5wdXQoKSBkcm9wSW5kZXg6IG51bWJlcjtcblxuICBvbkRyb3AoJGV2ZW50KSB7XG4gICAgdGhpcy5ub2RlLm1vdXNlQWN0aW9uKCdkcm9wJywgJGV2ZW50LmV2ZW50LCB7XG4gICAgICBmcm9tOiAkZXZlbnQuZWxlbWVudCxcbiAgICAgIHRvOiB7IHBhcmVudDogdGhpcy5ub2RlLCBpbmRleDogdGhpcy5kcm9wSW5kZXggfVxuICAgIH0pO1xuICB9XG5cbiAgYWxsb3dEcm9wKGVsZW1lbnQsICRldmVudCkge1xuICAgIHJldHVybiB0aGlzLm5vZGUub3B0aW9ucy5hbGxvd0Ryb3AoZWxlbWVudCwgeyBwYXJlbnQ6IHRoaXMubm9kZSwgaW5kZXg6IHRoaXMuZHJvcEluZGV4IH0sICRldmVudCk7XG4gIH1cbn1cbiJdfQ==

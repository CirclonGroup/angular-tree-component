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
var TreeNodeChildrenComponent = /** @class */ (function() {
  function TreeNodeChildrenComponent() {}
  __decorate(
    [Input(), __metadata('design:type', TreeNode)],
    TreeNodeChildrenComponent.prototype,
    'node',
    void 0
  );
  __decorate(
    [Input(), __metadata('design:type', Object)],
    TreeNodeChildrenComponent.prototype,
    'templates',
    void 0
  );
  TreeNodeChildrenComponent = __decorate(
    [
      Component({
        selector: 'tree-node-children',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        template:
          '\n    <ng-container *treeMobxAutorun="{ dontDetach: true }">\n      <div\n        [class.tree-children]="true"\n        [class.tree-children-no-padding]="node.options.levelPadding"\n        *treeAnimateOpen="\n          node.isExpanded;\n          speed: node.options.animateSpeed;\n          acceleration: node.options.animateAcceleration;\n          enabled: node.options.animateExpand\n        "\n      >\n        <tree-node-collection\n          *ngIf="node.children"\n          [nodes]="node.children"\n          [templates]="templates"\n          [treeModel]="node.treeModel"\n        >\n        </tree-node-collection>\n        <tree-loading-component\n          [style.padding-left]="node.getNodePadding()"\n          class="tree-node-loading"\n          *ngIf="!node.children"\n          [template]="templates.loadingTemplate"\n          [node]="node"\n        ></tree-loading-component>\n      </div>\n    </ng-container>\n  '
      })
    ],
    TreeNodeChildrenComponent
  );
  return TreeNodeChildrenComponent;
})();
export { TreeNodeChildrenComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNoaWxkcmVuLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1jaGlsZHJlbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBb0NyRDtJQUFBO0lBR0EsQ0FBQztJQUZVO1FBQVIsS0FBSyxFQUFFO2tDQUFPLFFBQVE7MkRBQUM7SUFDZjtRQUFSLEtBQUssRUFBRTs7Z0VBQWdCO0lBRmIseUJBQXlCO1FBbENyQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLE1BQU0sRUFBRSxFQUFFO1lBQ1YsUUFBUSxFQUFFLG04QkE0QlQ7U0FDRixDQUFDO09BQ1cseUJBQXlCLENBR3JDO0lBQUQsZ0NBQUM7Q0FBQSxBQUhELElBR0M7U0FIWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHJlZS1ub2RlLWNoaWxkcmVuJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVzOiBbXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICp0cmVlTW9ieEF1dG9ydW49XCJ7IGRvbnREZXRhY2g6IHRydWUgfVwiPlxuICAgICAgPGRpdlxuICAgICAgICBbY2xhc3MudHJlZS1jaGlsZHJlbl09XCJ0cnVlXCJcbiAgICAgICAgW2NsYXNzLnRyZWUtY2hpbGRyZW4tbm8tcGFkZGluZ109XCJub2RlLm9wdGlvbnMubGV2ZWxQYWRkaW5nXCJcbiAgICAgICAgKnRyZWVBbmltYXRlT3Blbj1cIlxuICAgICAgICAgIG5vZGUuaXNFeHBhbmRlZDtcbiAgICAgICAgICBzcGVlZDogbm9kZS5vcHRpb25zLmFuaW1hdGVTcGVlZDtcbiAgICAgICAgICBhY2NlbGVyYXRpb246IG5vZGUub3B0aW9ucy5hbmltYXRlQWNjZWxlcmF0aW9uO1xuICAgICAgICAgIGVuYWJsZWQ6IG5vZGUub3B0aW9ucy5hbmltYXRlRXhwYW5kXG4gICAgICAgIFwiXG4gICAgICA+XG4gICAgICAgIDx0cmVlLW5vZGUtY29sbGVjdGlvblxuICAgICAgICAgICpuZ0lmPVwibm9kZS5jaGlsZHJlblwiXG4gICAgICAgICAgW25vZGVzXT1cIm5vZGUuY2hpbGRyZW5cIlxuICAgICAgICAgIFt0ZW1wbGF0ZXNdPVwidGVtcGxhdGVzXCJcbiAgICAgICAgICBbdHJlZU1vZGVsXT1cIm5vZGUudHJlZU1vZGVsXCJcbiAgICAgICAgPlxuICAgICAgICA8L3RyZWUtbm9kZS1jb2xsZWN0aW9uPlxuICAgICAgICA8dHJlZS1sb2FkaW5nLWNvbXBvbmVudFxuICAgICAgICAgIFtzdHlsZS5wYWRkaW5nLWxlZnRdPVwibm9kZS5nZXROb2RlUGFkZGluZygpXCJcbiAgICAgICAgICBjbGFzcz1cInRyZWUtbm9kZS1sb2FkaW5nXCJcbiAgICAgICAgICAqbmdJZj1cIiFub2RlLmNoaWxkcmVuXCJcbiAgICAgICAgICBbdGVtcGxhdGVdPVwidGVtcGxhdGVzLmxvYWRpbmdUZW1wbGF0ZVwiXG4gICAgICAgICAgW25vZGVdPVwibm9kZVwiXG4gICAgICAgID48L3RyZWUtbG9hZGluZy1jb21wb25lbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZUNoaWxkcmVuQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XG4gIEBJbnB1dCgpIHRlbXBsYXRlczogYW55O1xufVxuIl19

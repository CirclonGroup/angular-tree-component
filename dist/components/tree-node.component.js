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
var TreeNodeComponent = /** @class */ (function() {
  function TreeNodeComponent() {}
  __decorate(
    [Input(), __metadata('design:type', TreeNode)],
    TreeNodeComponent.prototype,
    'node',
    void 0
  );
  __decorate(
    [Input(), __metadata('design:type', Number)],
    TreeNodeComponent.prototype,
    'index',
    void 0
  );
  __decorate(
    [Input(), __metadata('design:type', Object)],
    TreeNodeComponent.prototype,
    'templates',
    void 0
  );
  TreeNodeComponent = __decorate(
    [
      Component({
        selector: 'TreeNode, tree-node',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        template:
          '\n    <ng-container *treeMobxAutorun="{ dontDetach: true }">\n      <div\n        *ngIf="!templates.treeNodeFullTemplate"\n        [class]="node.getClass()"\n        [class.tree-node]="true"\n        [class.tree-node-expanded]="node.isExpanded && node.hasChildren"\n        [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"\n        [class.tree-node-leaf]="node.isLeaf"\n        [class.tree-node-active]="node.isActive"\n        [class.tree-node-focused]="node.isFocused"\n      >\n        <tree-node-drop-slot\n          *ngIf="index === 0"\n          [dropIndex]="node.index"\n          [node]="node.parent"\n        ></tree-node-drop-slot>\n\n        <tree-node-wrapper\n          [node]="node"\n          [index]="index"\n          [templates]="templates"\n        ></tree-node-wrapper>\n\n        <tree-node-children\n          [node]="node"\n          [templates]="templates"\n        ></tree-node-children>\n        <tree-node-drop-slot\n          [dropIndex]="node.index + 1"\n          [node]="node.parent"\n        ></tree-node-drop-slot>\n      </div>\n      <ng-container\n        [ngTemplateOutlet]="templates.treeNodeFullTemplate"\n        [ngTemplateOutletContext]="{\n          $implicit: node,\n          node: node,\n          index: index,\n          templates: templates\n        }"\n      >\n      </ng-container>\n    </ng-container>\n  '
      })
    ],
    TreeNodeComponent
  );
  return TreeNodeComponent;
})();
export { TreeNodeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsaUJBQWlCLEVBRWxCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQW9EckQ7SUFBQTtJQUlBLENBQUM7SUFIVTtRQUFSLEtBQUssRUFBRTtrQ0FBTyxRQUFRO21EQUFDO0lBQ2Y7UUFBUixLQUFLLEVBQUU7O29EQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7O3dEQUFnQjtJQUhiLGlCQUFpQjtRQWxEN0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxNQUFNLEVBQUUsRUFBRTtZQUNWLFFBQVEsRUFBRSw0NENBNENUO1NBQ0YsQ0FBQztPQUNXLGlCQUFpQixDQUk3QjtJQUFELHdCQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnVHJlZU5vZGUsIHRyZWUtbm9kZScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlczogW10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqdHJlZU1vYnhBdXRvcnVuPVwieyBkb250RGV0YWNoOiB0cnVlIH1cIj5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nSWY9XCIhdGVtcGxhdGVzLnRyZWVOb2RlRnVsbFRlbXBsYXRlXCJcbiAgICAgICAgW2NsYXNzXT1cIm5vZGUuZ2V0Q2xhc3MoKVwiXG4gICAgICAgIFtjbGFzcy50cmVlLW5vZGVdPVwidHJ1ZVwiXG4gICAgICAgIFtjbGFzcy50cmVlLW5vZGUtZXhwYW5kZWRdPVwibm9kZS5pc0V4cGFuZGVkICYmIG5vZGUuaGFzQ2hpbGRyZW5cIlxuICAgICAgICBbY2xhc3MudHJlZS1ub2RlLWNvbGxhcHNlZF09XCJub2RlLmlzQ29sbGFwc2VkICYmIG5vZGUuaGFzQ2hpbGRyZW5cIlxuICAgICAgICBbY2xhc3MudHJlZS1ub2RlLWxlYWZdPVwibm9kZS5pc0xlYWZcIlxuICAgICAgICBbY2xhc3MudHJlZS1ub2RlLWFjdGl2ZV09XCJub2RlLmlzQWN0aXZlXCJcbiAgICAgICAgW2NsYXNzLnRyZWUtbm9kZS1mb2N1c2VkXT1cIm5vZGUuaXNGb2N1c2VkXCJcbiAgICAgID5cbiAgICAgICAgPHRyZWUtbm9kZS1kcm9wLXNsb3RcbiAgICAgICAgICAqbmdJZj1cImluZGV4ID09PSAwXCJcbiAgICAgICAgICBbZHJvcEluZGV4XT1cIm5vZGUuaW5kZXhcIlxuICAgICAgICAgIFtub2RlXT1cIm5vZGUucGFyZW50XCJcbiAgICAgICAgPjwvdHJlZS1ub2RlLWRyb3Atc2xvdD5cblxuICAgICAgICA8dHJlZS1ub2RlLXdyYXBwZXJcbiAgICAgICAgICBbbm9kZV09XCJub2RlXCJcbiAgICAgICAgICBbaW5kZXhdPVwiaW5kZXhcIlxuICAgICAgICAgIFt0ZW1wbGF0ZXNdPVwidGVtcGxhdGVzXCJcbiAgICAgICAgPjwvdHJlZS1ub2RlLXdyYXBwZXI+XG5cbiAgICAgICAgPHRyZWUtbm9kZS1jaGlsZHJlblxuICAgICAgICAgIFtub2RlXT1cIm5vZGVcIlxuICAgICAgICAgIFt0ZW1wbGF0ZXNdPVwidGVtcGxhdGVzXCJcbiAgICAgICAgPjwvdHJlZS1ub2RlLWNoaWxkcmVuPlxuICAgICAgICA8dHJlZS1ub2RlLWRyb3Atc2xvdFxuICAgICAgICAgIFtkcm9wSW5kZXhdPVwibm9kZS5pbmRleCArIDFcIlxuICAgICAgICAgIFtub2RlXT1cIm5vZGUucGFyZW50XCJcbiAgICAgICAgPjwvdHJlZS1ub2RlLWRyb3Atc2xvdD5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZXMudHJlZU5vZGVGdWxsVGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICAgICRpbXBsaWNpdDogbm9kZSxcbiAgICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICB0ZW1wbGF0ZXM6IHRlbXBsYXRlc1xuICAgICAgICB9XCJcbiAgICAgID5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XG4gIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7XG4gIEBJbnB1dCgpIHRlbXBsYXRlczogYW55O1xufVxuIl19

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
var TreeNodeWrapperComponent = /** @class */ (function() {
  function TreeNodeWrapperComponent() {}
  __decorate(
    [Input(), __metadata('design:type', TreeNode)],
    TreeNodeWrapperComponent.prototype,
    'node',
    void 0
  );
  __decorate(
    [Input(), __metadata('design:type', Number)],
    TreeNodeWrapperComponent.prototype,
    'index',
    void 0
  );
  __decorate(
    [Input(), __metadata('design:type', Object)],
    TreeNodeWrapperComponent.prototype,
    'templates',
    void 0
  );
  TreeNodeWrapperComponent = __decorate(
    [
      Component({
        selector: 'tree-node-wrapper',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        template:
          '\n      <div *ngIf="!templates.treeNodeWrapperTemplate" class="node-wrapper" [style.padding-left]="node.getNodePadding()">\n          <tree-node-checkbox *ngIf="node.options.useCheckbox" [node]="node"></tree-node-checkbox>\n          <tree-node-expander [node]="node"></tree-node-expander>\n          <div class="node-content-wrapper"\n               [class.node-content-wrapper-active]="node.isActive"\n               [class.node-content-wrapper-focused]="node.isFocused"\n               (click)="node.mouseAction(\'click\', $event)"\n               (dblclick)="node.mouseAction(\'dblClick\', $event)"\n               (mouseover)="node.mouseAction(\'mouseOver\', $event)"\n               (mouseout)="node.mouseAction(\'mouseOut\', $event)"\n               (contextmenu)="node.mouseAction(\'contextMenu\', $event)"\n               (treeDrop)="node.onDrop($event)"\n               (treeDropDragOver)="node.mouseAction(\'dragOver\', $event)"\n               (treeDropDragLeave)="node.mouseAction(\'dragLeave\', $event)"\n               (treeDropDragEnter)="node.mouseAction(\'dragEnter\', $event)"\n               [treeAllowDrop]="node.allowDrop"\n               [allowDragoverStyling]="node.allowDragoverStyling()"\n               [treeDrag]="node"\n               [treeDragEnabled]="node.allowDrag()">\n\n              <tree-node-content [node]="node" [index]="index" [template]="templates.treeNodeTemplate">\n              </tree-node-content>\n          </div>\n      </div>\n      <ng-container\n              [ngTemplateOutlet]="templates.treeNodeWrapperTemplate"\n              [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index, templates: templates }">\n      </ng-container>\n  '
      }),
      __metadata('design:paramtypes', [])
    ],
    TreeNodeWrapperComponent
  );
  return TreeNodeWrapperComponent;
})();
export { TreeNodeWrapperComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLXdyYXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvdHJlZS1ub2RlLXdyYXBwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUcsS0FBSyxFQUFHLGlCQUFpQixFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFzQ3JEO0lBTUU7SUFDQSxDQUFDO0lBTFE7UUFBUixLQUFLLEVBQUU7a0NBQU8sUUFBUTswREFBQztJQUNmO1FBQVIsS0FBSyxFQUFFOzsyREFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOzsrREFBZ0I7SUFKYix3QkFBd0I7UUFwQ3BDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsTUFBTSxFQUFFLEVBQUU7WUFDVixRQUFRLEVBQUUsa3REQTZCVDtTQUNGLENBQUM7O09BRVcsd0JBQXdCLENBU3BDO0lBQUQsK0JBQUM7Q0FBQSxBQVRELElBU0M7U0FUWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgLCBJbnB1dCAsIFZpZXdFbmNhcHN1bGF0aW9uICwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RyZWUtbm9kZS13cmFwcGVyJyAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUgLFxuICBzdHlsZXM6IFtdICxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgKm5nSWY9XCIhdGVtcGxhdGVzLnRyZWVOb2RlV3JhcHBlclRlbXBsYXRlXCIgY2xhc3M9XCJub2RlLXdyYXBwZXJcIiBbc3R5bGUucGFkZGluZy1sZWZ0XT1cIm5vZGUuZ2V0Tm9kZVBhZGRpbmcoKVwiPlxuICAgICAgICAgIDx0cmVlLW5vZGUtY2hlY2tib3ggKm5nSWY9XCJub2RlLm9wdGlvbnMudXNlQ2hlY2tib3hcIiBbbm9kZV09XCJub2RlXCI+PC90cmVlLW5vZGUtY2hlY2tib3g+XG4gICAgICAgICAgPHRyZWUtbm9kZS1leHBhbmRlciBbbm9kZV09XCJub2RlXCI+PC90cmVlLW5vZGUtZXhwYW5kZXI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5vZGUtY29udGVudC13cmFwcGVyXCJcbiAgICAgICAgICAgICAgIFtjbGFzcy5ub2RlLWNvbnRlbnQtd3JhcHBlci1hY3RpdmVdPVwibm9kZS5pc0FjdGl2ZVwiXG4gICAgICAgICAgICAgICBbY2xhc3Mubm9kZS1jb250ZW50LXdyYXBwZXItZm9jdXNlZF09XCJub2RlLmlzRm9jdXNlZFwiXG4gICAgICAgICAgICAgICAoY2xpY2spPVwibm9kZS5tb3VzZUFjdGlvbignY2xpY2snLCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgIChkYmxjbGljayk9XCJub2RlLm1vdXNlQWN0aW9uKCdkYmxDbGljaycsICRldmVudClcIlxuICAgICAgICAgICAgICAgKG1vdXNlb3Zlcik9XCJub2RlLm1vdXNlQWN0aW9uKCdtb3VzZU92ZXInLCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgIChtb3VzZW91dCk9XCJub2RlLm1vdXNlQWN0aW9uKCdtb3VzZU91dCcsICRldmVudClcIlxuICAgICAgICAgICAgICAgKGNvbnRleHRtZW51KT1cIm5vZGUubW91c2VBY3Rpb24oJ2NvbnRleHRNZW51JywgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAodHJlZURyb3ApPVwibm9kZS5vbkRyb3AoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAodHJlZURyb3BEcmFnT3Zlcik9XCJub2RlLm1vdXNlQWN0aW9uKCdkcmFnT3ZlcicsICRldmVudClcIlxuICAgICAgICAgICAgICAgKHRyZWVEcm9wRHJhZ0xlYXZlKT1cIm5vZGUubW91c2VBY3Rpb24oJ2RyYWdMZWF2ZScsICRldmVudClcIlxuICAgICAgICAgICAgICAgKHRyZWVEcm9wRHJhZ0VudGVyKT1cIm5vZGUubW91c2VBY3Rpb24oJ2RyYWdFbnRlcicsICRldmVudClcIlxuICAgICAgICAgICAgICAgW3RyZWVBbGxvd0Ryb3BdPVwibm9kZS5hbGxvd0Ryb3BcIlxuICAgICAgICAgICAgICAgW2FsbG93RHJhZ292ZXJTdHlsaW5nXT1cIm5vZGUuYWxsb3dEcmFnb3ZlclN0eWxpbmcoKVwiXG4gICAgICAgICAgICAgICBbdHJlZURyYWddPVwibm9kZVwiXG4gICAgICAgICAgICAgICBbdHJlZURyYWdFbmFibGVkXT1cIm5vZGUuYWxsb3dEcmFnKClcIj5cblxuICAgICAgICAgICAgICA8dHJlZS1ub2RlLWNvbnRlbnQgW25vZGVdPVwibm9kZVwiIFtpbmRleF09XCJpbmRleFwiIFt0ZW1wbGF0ZV09XCJ0ZW1wbGF0ZXMudHJlZU5vZGVUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICA8L3RyZWUtbm9kZS1jb250ZW50PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlcy50cmVlTm9kZVdyYXBwZXJUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogbm9kZSwgbm9kZTogbm9kZSwgaW5kZXg6IGluZGV4LCB0ZW1wbGF0ZXM6IHRlbXBsYXRlcyB9XCI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlV3JhcHBlckNvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XG4gIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7XG4gIEBJbnB1dCgpIHRlbXBsYXRlczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbn1cbiJdfQ==

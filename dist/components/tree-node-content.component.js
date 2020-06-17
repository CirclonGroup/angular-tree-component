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
  Component,
  Input,
  ViewEncapsulation,
  TemplateRef
} from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
var TreeNodeContent = /** @class */ (function() {
  function TreeNodeContent() {}
  __decorate(
    [Input(), __metadata('design:type', TreeNode)],
    TreeNodeContent.prototype,
    'node',
    void 0
  );
  __decorate(
    [Input(), __metadata('design:type', Number)],
    TreeNodeContent.prototype,
    'index',
    void 0
  );
  __decorate(
    [Input(), __metadata('design:type', TemplateRef)],
    TreeNodeContent.prototype,
    'template',
    void 0
  );
  TreeNodeContent = __decorate(
    [
      Component({
        selector: 'tree-node-content',
        encapsulation: ViewEncapsulation.None,
        template:
          '\n  <span *ngIf="!template">{{ node.displayField }}</span>\n  <ng-container\n    [ngTemplateOutlet]="template"\n    [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index }">\n  </ng-container>'
      })
    ],
    TreeNodeContent
  );
  return TreeNodeContent;
})();
export { TreeNodeContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFZckQ7SUFBQTtJQUlBLENBQUM7SUFIVTtRQUFSLEtBQUssRUFBRTtrQ0FBTyxRQUFRO2lEQUFDO0lBQ2Y7UUFBUixLQUFLLEVBQUU7O2tEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7a0NBQVcsV0FBVztxREFBTTtJQUh6QixlQUFlO1FBVjNCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsUUFBUSxFQUFFLHlOQUtNO1NBQ2pCLENBQUM7T0FDVyxlQUFlLENBSTNCO0lBQUQsc0JBQUM7Q0FBQSxBQUpELElBSUM7U0FKWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24sIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0cmVlLW5vZGUtY29udGVudCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gIDxzcGFuICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3sgbm9kZS5kaXNwbGF5RmllbGQgfX08L3NwYW4+XG4gIDxuZy1jb250YWluZXJcbiAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiXG4gICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBub2RlLCBub2RlOiBub2RlLCBpbmRleDogaW5kZXggfVwiPlxuICA8L25nLWNvbnRhaW5lcj5gLFxufSlcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZUNvbnRlbnQge1xuICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcbiAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG59XG4iXX0=

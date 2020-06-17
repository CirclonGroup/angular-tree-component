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
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
var LoadingComponent = /** @class */ (function() {
  function LoadingComponent() {}
  __decorate(
    [Input(), __metadata('design:type', TemplateRef)],
    LoadingComponent.prototype,
    'template',
    void 0
  );
  __decorate(
    [Input(), __metadata('design:type', TreeNode)],
    LoadingComponent.prototype,
    'node',
    void 0
  );
  LoadingComponent = __decorate(
    [
      Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'tree-loading-component',
        template:
          '\n    <span *ngIf="!template">loading...</span>\n    <ng-container\n      [ngTemplateOutlet]="template"\n      [ngTemplateOutletContext]="{ $implicit: node }">\n    </ng-container>\n  '
      })
    ],
    LoadingComponent
  );
  return LoadingComponent;
})();
export { LoadingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy9sb2FkaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBYXJEO0lBQUE7SUFHQSxDQUFDO0lBRlU7UUFBUixLQUFLLEVBQUU7a0NBQVcsV0FBVztzREFBTTtJQUMzQjtRQUFSLEtBQUssRUFBRTtrQ0FBTyxRQUFRO2tEQUFDO0lBRmIsZ0JBQWdCO1FBWDVCLFNBQVMsQ0FBQztZQUNULGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsUUFBUSxFQUFFLGdNQU1UO1NBQ0YsQ0FBQztPQUNXLGdCQUFnQixDQUc1QjtJQUFELHVCQUFDO0NBQUEsQUFIRCxJQUdDO1NBSFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICd0cmVlLWxvYWRpbmctY29tcG9uZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiAqbmdJZj1cIiF0ZW1wbGF0ZVwiPmxvYWRpbmcuLi48L3NwYW4+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBub2RlIH1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcbn1cbiJdfQ==

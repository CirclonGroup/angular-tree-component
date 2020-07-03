import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'tree-loading-component',
  template: `
    <span *ngIf="!template">loading...</span>
    <ng-container
      [ngTemplateOutlet]="template"
      [ngTemplateOutletContext]="{ $implicit: node }">
    </ng-container>
  `,
})
export class LoadingComponent {
  @Input() template: TemplateRef<any>;
  @Input() node: TreeNode;
}

import { Component, Input, ViewEncapsulation, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

interface Context<T> {
  node: TreeNode<T>;
  index: number;
}

@Component({
  selector: 'tree-node-content',
  encapsulation: ViewEncapsulation.None,
  template: `
  <span *ngIf="!template">{{ node.displayField }}</span>
  <ng-container
    [ngTemplateOutlet]="template"
    [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index }">
  </ng-container>`,
})
export class TreeNodeContent<T> {
  @Input() node: TreeNode<T>;
  @Input() index: number;
  @Input() template: TemplateRef<Context<T>>;
}

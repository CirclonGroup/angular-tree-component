import { Component, Input, ViewEncapsulation, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

@Component({
  selector: 'tree-node-wrapper',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
      <div *ngIf="!templates.treeNodeWrapperTemplate" class="node-wrapper" [style.padding-left]="node.getNodePadding()">
        <tree-node-expander [node]="node"></tree-node-expander>
        <div class="node-content-wrapper"
          [class.node-content-wrapper-active]="node.isActive"
          [class.node-content-wrapper-focused]="node.isFocused"
          (click)="node.mouseAction('click', $event)"
          (dblclick)="node.mouseAction('dblClick', $event)"
          (contextmenu)="node.mouseAction('contextMenu', $event)"
          (treeDrop)="node.onDrop($event)"
          (treeDropDragOver)="node.mouseAction('dragOver', $event)"
          (treeDropDragLeave)="node.mouseAction('dragLeave', $event)"
          (treeDropDragEnter)="node.mouseAction('dragEnter', $event)"
          [treeAllowDrop]="node.allowDrop"
          [treeDrag]="node"
          [treeDragEnabled]="node.allowDrag()">

          <tree-node-content [node]="node" [index]="index" [template]="templates.treeNodeTemplate">
          </tree-node-content>
        </div>
      </div>
      <ng-container 
        [ngTemplateOutlet]="templates.treeNodeWrapperTemplate" 
        [ngOutletContext]="{ $implicit: node, node: node, index: index }">
      </ng-container>
    `
})

export class TreeNodeWrapperComponent {

  @Input() node: TreeNode;
  @Input() index: number;
  @Input() templates: any;

  constructor() { }

}

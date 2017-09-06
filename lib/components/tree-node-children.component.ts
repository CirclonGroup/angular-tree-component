import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

@Component({
  selector: 'tree-node-children',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <ng-container *mobxAutorun>
      <div [class.tree-children]="true"
          [class.tree-children-no-padding]="node.options.levelPadding"
          *treeAnimateOpen="
            node.isExpanded;
            speed:node.options.animateExpand;
            acceleration:node.options.animateAcceleration;
            enabled:node.options.animateExpand">
        <tree-node-collection
          *ngIf="node.children"
          [nodes]="node.children"
          [templates]="templates"
          [treeModel]="node.treeModel">
        </tree-node-collection>
        <tree-loading-component
          [style.padding-left]="node.getNodePadding()"
          class="tree-node-loading"
          *ngIf="!node.children"
          [template]="templates.loadingTemplate"
          [node]="node"
        ></tree-loading-component>
      </div>
    </ng-container>
  `
})
export class TreeNodeChildrenComponent {
  @Input() node: TreeNode;
  @Input() templates: any;
}

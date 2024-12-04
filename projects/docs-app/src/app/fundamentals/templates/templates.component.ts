import { Component } from '@angular/core';

@Component({
    selector: 'app-templates',
    templateUrl: './templates.component.html',
    styleUrls: ['./templates.component.scss'],
    standalone: false
})
export class TemplatesComponent {
  template = `
<tree-root [nodes]="nodes">
  <ng-template #treeNodeTemplate let-node let-index="index">
    <span>{{ node.data.name }}</span>
    <button (click)="go($event)">Custom Action</button>
  </ng-template>
</tree-root>
`;

  treeNodeWrapper = `
<tree-root [nodes]="nodes">
  <ng-template #treeNodeWrapperTemplate let-node let-index="index">
    <div class="node-wrapper" [style.padding-left]="node.getNodePadding()">
      <tree-node-expander [node]="node"></tree-node-expander>
      <div class="node-content-wrapper"
        [class.node-content-wrapper-active]="node.isActive"
        [class.node-content-wrapper-focused]="node.isFocused"
        (click)="node.mouseAction('click', $event)"
        (dblclick)="node.mouseAction('dblClick', $event)"
        (contextmenu)="node.mouseAction('contextMenu', $event)"
        (treeDrop)="node.onDrop($event)"
        [treeAllowDrop]="node.allowDrop"
        [treeDrag]="node"
        [treeDragEnabled]="node.allowDrag()">

        <tree-node-content [node]="node" [index]="index"></tree-node-content>
      </div>
    </div>
  </ng-template>
</tree-root>
`;

  treeLoading = `
<tree-root [nodes]="nodes">
  <template #loadingTemplate>Loading, please hold....</template>
</tree-root>
`;

  fullTemplate = `
<ng-template #treeNodeFullTemplate
          let-node
          let-index="index"
          let-templates="templates">
  <div
    [class]="node.getClass()"
    [class.tree-node]="true"
    [class.tree-node-expanded]="node.isExpanded && node.hasChildren"
    [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"
    [class.tree-node-leaf]="node.isLeaf"
    [class.tree-node-active]="node.isActive"
    [class.tree-node-focused]="node.isFocused">

    <tree-node-drop-slot
                         *ngIf="index === 0"
                         [dropIndex]="node.index"
                         [node]="node.parent">
    </tree-node-drop-slot>

    <tree-node-wrapper [node]="node" [index]="index" [templates]="templates">
    </tree-node-wrapper>

    <tree-node-children [node]="node" [templates]="templates">
    </tree-node-children>
    <tree-node-drop-slot [dropIndex]="node.index + 1" [node]="node.parent">
    </tree-node-drop-slot>
  </div>
</ng-template>
`;
}

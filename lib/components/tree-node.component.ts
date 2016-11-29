import { Component, Input, ElementRef, AfterViewInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { ITreeNodeTemplate } from './tree-node-content.component';

@Component({
  selector: 'TreeNode',
  encapsulation: ViewEncapsulation.None,
  styles: [
    '.tree-children.tree-children-no-padding { padding-left: 0 }',
    '.tree-children { padding-left: 20px }',
    `.node-content-wrapper {
      display: inline-block;
      padding: 2px 5px;
      border-radius: 2px;
      transition: background-color .15s,box-shadow .15s;
    }`,
    '.node-wrapper {display: flex; align-items: flex-start;}',
    '.tree-node-active > .node-wrapper > .node-content-wrapper { background: #beebff }',
    '.tree-node-active.tree-node-focused > .node-wrapper > .node-content-wrapper { background: #beebff }',
    '.tree-node-focused > .node-wrapper > .node-content-wrapper { background: #e7f4f9 }',
    '.node-content-wrapper:hover { background: #f7fbff }',
    '.tree-node-active > .node-wrapper > .node-content-wrapper, .tree-node-focused > .node-content-wrapper, .node-content-wrapper:hover { box-shadow: inset 0 0 1px #999; }',
    '.node-content-wrapper.is-dragging-over { background: #ddffee; box-shadow: inset 0 0 1px #999; }',
    '.tree-node-expanded > .node-wrapper > .toggle-children-wrapper > .toggle-children { transform: rotate(90deg) }',
    '.tree-node-collapsed > .node-wrapper > .toggle-children-wrapper > .toggle-children { transform: rotate(0); }',
    `.toggle-children-wrapper, .toggle-children-placeholder-wrapper {
      padding: 2px 3px 5px 1px;
    }`,
    `.toggle-children {
        background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABAhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjY1RTYzOTA2ODZDRjExREJBNkUyRDg4N0NFQUNCNDA3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYzRkRFQjcxODUzNTExRTU4RTQwRkQwODFEOUZEMEE3IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYzRkRFQjcwODUzNTExRTU4RTQwRkQwODFEOUZEMEE3IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTk5NzA1OGEtZDI3OC00NDZkLWE4ODgtNGM4MGQ4YWI1NzNmIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzRkZmQxMGMtY2NlNS0xMTc4LWE5OGQtY2NkZmM5ODk5YWYwIi8+IDxkYzp0aXRsZT4gPHJkZjpBbHQ+IDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Z2x5cGhpY29uczwvcmRmOmxpPiA8L3JkZjpBbHQ+IDwvZGM6dGl0bGU+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5iogFwAAAGhJREFUeNpiYGBgKABigf///zOQg0EARH4A4gZyDIIZ8B/JoAJKDIDhB0CcQIkBRBtEyABkgxwoMQCGD6AbRKoBGAYxQgXIBRuZGKgAKPIC3QLxArnRSHZCIjspk52ZKMrOFBUoAAEGAKnq593MQAZtAAAAAElFTkSuQmCC\');
        height: 8px;
        width: 9px;
        background-size: contain;
        display: inline-block;
        position: relative;
        background-repeat: no-repeat;
        background-position: center;
    }`,
    `.toggle-children-placeholder {
        display: inline-block;
        height: 10px;
        width: 10px;
        position: relative;
        top: 1px;
        padding-right: 3px;
    }`
  ],
  template: `
    <div
      *ngIf="!node.isHidden"
      class="tree-node tree-node-level-{{ node.level }}"
      [class.tree-node-expanded]="node.isExpanded && node.hasChildren"
      [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"
      [class.tree-node-leaf]="node.isLeaf"
      [class.tree-node-active]="node.isActive"
      [class.tree-node-focused]="node.isFocused">

      <TreeNodeDropSlot
        *ngIf="nodeIndex === 0"
        [dropIndex]="nodeIndex"
        [node]="node.parent"
        ></TreeNodeDropSlot>

        <div class="node-wrapper" [style.padding-left]="getNodePadding()">
          <span
            *ngIf="node.hasChildren"
            class="toggle-children-wrapper"
            (click)="node.mouseAction('expanderClick', $event)">

            <span class="toggle-children"></span>
          </span>
          <span
            *ngIf="!node.hasChildren"
            class="toggle-children-placeholder-wrapper">
            <span class="toggle-children-placeholder"></span>
          </span>

          <div class="node-content-wrapper"
            #nodeContentWrapper
            (click)="node.mouseAction('click', $event)"
            (dblclick)="node.mouseAction('dblClick', $event)"
            (contextmenu)="node.mouseAction('contextMenu', $event)"
            (treeDrop)="onDrop($event)"
            [treeDrag]="node"
            [treeDragEnabled]="node.allowDrag()">

            <TreeNodeContent [node]="node" [treeNodeContentTemplate]="treeNodeContentTemplate"></TreeNodeContent>
          </div>
        </div>

      <div [class.tree-children]="true"
           [class.tree-children-no-padding]="node.options.levelPadding"
           *ngIf="node.isExpanded">
        <div *ngIf="node.children">
          <TreeNode
            *ngFor="let node of node.children; let i = index"
            [node]="node"
            [nodeIndex]="i"
            [treeNodeContentTemplate]="treeNodeContentTemplate"
            [loadingTemplate]="loadingTemplate">
          </TreeNode>
        </div>
        <LoadingComponent
          [style.padding-left]="getNodePadding()"
          class="tree-node-loading"
          *ngIf="!node.children"
          [loadingTemplate]="loadingTemplate"
        ></LoadingComponent>
      </div>
      <TreeNodeDropSlot
        [dropIndex]="nodeIndex + 1"
        [node]="node.parent"
        ></TreeNodeDropSlot>
    </div>
  `
})

export class TreeNodeComponent implements AfterViewInit {
  @Input() node:TreeNode;
  @Input() nodeIndex:number;
  @Input() treeNodeContentTemplate: TemplateRef<ITreeNodeTemplate>;
  @Input() loadingTemplate: TemplateRef<any>;

  constructor(private elementRef: ElementRef) {
  }

  onDrop($event) {
    this.node.mouseAction('drop', $event.event, {
      from: $event.element,
      to: { parent: this.node, index: 0 }
    });
  }

  getNodePadding() {
    return this.node.options.levelPadding * (this.node.level - 1) + 'px';
  }

  ngAfterViewInit() {
    this.node.elementRef = this.elementRef;
  }
}

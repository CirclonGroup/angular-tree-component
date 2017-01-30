import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, ViewEncapsulation, ContentChild, TemplateRef } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { TreeOptions } from '../models/tree-options.model';
import { KEYS } from '../constants/keys';

import * as _ from 'lodash'

@Component({
  selector: 'Tree',
  encapsulation: ViewEncapsulation.None,
  host: {
    '(body: keydown)': "onKeydown($event)",
    '(body: mousedown)': "onMousedown($event)"
  },
  providers: [TreeModel],
  styles: [
    '.tree-children { padding-left: 20px }',
    '.empty-tree-drop-slot .node-drop-slot { height: 20px; min-width: 100px }',
    `.tree {
      display: inline-block;
      cursor: pointer;
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none;   /* Chrome/Safari/Opera */
      -khtml-user-select: none;    /* Konqueror */
      -moz-user-select: none;      /* Firefox */
      -ms-user-select: none;       /* IE/Edge */
      user-select: none;           /* non-prefixed version, currently not supported by any browser */
    }`
  ],
  template: `
    <div class="tree" [class.node-dragging]="treeDraggedElement.isDragging()">
      <TreeNode
        *ngFor="let node of treeModel.roots; let i = index"
        [node]="node"
        [index]="i"
        [templates]="{
          loadingTemplate: loadingTemplate,
          treeNodeTemplate: treeNodeTemplate,
          treeNodeFullTemplate: treeNodeFullTemplate
        }">
      </TreeNode>
      <TreeNodeDropSlot
        class="empty-tree-drop-slot"
        *ngIf="treeModel.isEmptyTree()"
        [dropIndex]="0"
        [node]="treeModel.virtualRoot">
      </TreeNodeDropSlot>
    </div>
  `
})
export class TreeComponent implements OnChanges {
  constructor(public treeModel:TreeModel, public treeDraggedElement:TreeDraggedElement) {
    treeModel.eventNames.forEach((name) => this[name] = new EventEmitter());
  }

  _nodes:any[];
  _options:TreeOptions;

  @ContentChild('loadingTemplate') loadingTemplate: TemplateRef<any>;
  @ContentChild('treeNodeTemplate') treeNodeTemplate: TemplateRef<any>;
  @ContentChild('treeNodeFullTemplate') treeNodeFullTemplate: TemplateRef<any>;

  // Will be handled in ngOnChanges
  @Input()
  get nodes(): any[] {
    return this.treeModel.nodes;
  }
  set nodes(nodes:any[]) { };
  @Input()
  get options(): TreeOptions {
    return this.treeModel.options;
  }
  set options(options:TreeOptions) { };

  @Input()
  get focused(): boolean {
    return TreeModel.focusedTree === this.treeModel;
  }
  set focused(value:boolean) {
    this.treeModel.setFocus(value);
  }

  @Output() onToggle;
  @Output() onToggleExpanded;
  @Output() onActiveChanged;
  @Output() onActivate;
  @Output() onDeactivate;
  @Output() onFocus;
  @Output() onBlur;
  @Output() onDoubleClick;
  @Output() onContextMenu;
  @Output() onUpdateData;
  @Output() onInitialized;
  @Output() onMoveNode;
  @Output() onEvent;

  onKeydown($event) {
    if (!this.treeModel.isFocused) return;
    if (_.includes(['input', 'textarea'],
        document.activeElement.tagName.toLowerCase())) return;

    const focusedNode = this.treeModel.getFocusedNode();

    this.treeModel.performKeyAction(focusedNode, $event);
  }

  onMousedown($event) {
    let insideClick = $event.target.closest('Tree');
    if (!insideClick) {
      this.treeModel.setFocus(false);
    }
  }

  ngOnChanges(changes) {
    this.treeModel.setData({
      options: changes.options && changes.options.currentValue,
      nodes: changes.nodes && changes.nodes.currentValue,
      events: _.pick(this, this.treeModel.eventNames)
    });
  }
}

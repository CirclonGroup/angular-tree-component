import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, ViewEncapsulation } from '@angular/core';
import { TreeNodeComponent } from './tree-node.component';
import { TreeModel } from '../models/tree.model';
import { TreeNode } from '../models/tree-node.model';
import { TreeOptions } from '../models/tree-options.model';
import { KEYS } from '../constants/keys';

import * as _ from 'lodash'

@Component({
  selector: 'Tree',
  directives: [TreeNodeComponent],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(body: keydown)': "onKeydown($event)",
    '(body: mousedown)': "onMousedown($event)"
  },
  providers: [TreeModel],
  styles: [
    '.tree-children { padding-left: 20px }',
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
    <div class="tree">
      <TreeNode
        *ngFor="let node of treeModel.roots"
        [node]="node">
      </TreeNode>
    </div>
  `
})
export class TreeComponent implements OnChanges {
  constructor(public treeModel:TreeModel) {
    treeModel.eventNames.forEach((name) => this[name] = new EventEmitter());
  }

  _nodes:any[];
  _options:TreeOptions;
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
  @Output() onActiveChanged;
  @Output() onActivate;
  @Output() onDeactivate;
  @Output() onFocus;
  @Output() onBlur;
  @Output() onDoubleClick;
  @Output() onContextMenu;
  @Output() onInitialized;

  onKeydown($event) {
    if (!this.treeModel.isFocused) return;

    const focusedNode = this.treeModel.getFocusedNode();
    if (this.treeModel.performKeyAction(focusedNode, $event)) {
      $event.preventDefault();
    }
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

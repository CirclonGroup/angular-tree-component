import {
  Component, Input, ViewEncapsulation, OnInit, OnDestroy, ElementRef
} from '@angular/core';
import { reaction, autorun } from 'mobx';
import { observable, computed } from 'mobx-angular';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { TreeNode } from '../models/tree-node.model';
import { TreeModel } from '../models/tree.model';
import { deprecatedSelector } from '../deprecated-selector';

@Component({
  selector: 'tree-node-collection, TreeNodeCollection',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *mobxAutorun>
      <div
        [style.margin-top]="marginTop">
        <tree-node
          *ngFor="let node of viewportNodes; let i = index; trackBy: trackNode"
          [node]="node"
          [index]="i"
          [templates]="templates">
        </tree-node>
      </div>
    </ng-container>
  `
})
export class TreeNodeCollectionComponent implements OnInit, OnDestroy {
  @Input() @observable nodes: TreeNode[];

  @Input() treeModel: TreeModel;

  private virtualScroll: TreeVirtualScroll; // Cannot inject this, because we might be inside treeNodeTemplateFull
  @Input() templates;

  @observable viewportNodes: TreeNode[];

  @computed get marginTop(): string {
    const firstNode = this.viewportNodes && this.viewportNodes.length && this.viewportNodes[0];
    const relativePosition = firstNode ? firstNode.position - firstNode.parent.position - firstNode.parent.getSelfHeight() : 0;

    return `${relativePosition}px`;
  }

  _dispose = [];

  constructor(private elementRef: ElementRef) {
    deprecatedSelector('TreeNodeCollection', 'tree-node-collection', elementRef);
  }

  ngOnInit() {
    this.virtualScroll = this.treeModel.virtualScroll;
    this._dispose = [
      // return node indexes so we can compare structurally,
      reaction(() => {
        return this.virtualScroll.getViewportNodes(this.nodes).map(n => n.index);
      }, (nodeIndexes) => {
          this.viewportNodes = nodeIndexes.map((i) => this.nodes[i]);
        }, { compareStructural: true, fireImmediately: true }
      ),
      reaction(() => this.nodes, (nodes) => {
        this.viewportNodes = this.virtualScroll.getViewportNodes(nodes);
      })
    ];
  }

  ngOnDestroy() {
    this._dispose.forEach(d => d());
  }

  trackNode(index, node) {
    return node.id;
  }

}

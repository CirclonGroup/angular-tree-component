import { IDType } from './../defs/api';
import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  OnDestroy
} from '@angular/core';
import { comparer, IReactionDisposer, reaction } from 'mobx';
import { observable, computed, action } from '../mobx-angular/mobx-proxy';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { TreeNode } from '../models/tree-node.model';
import { TreeModel } from '../models/tree.model';

@Component({
  selector: 'tree-node-collection',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div [style.margin-top]="marginTop">
        <tree-node
          *ngFor="let node of viewportNodes; let i = index; trackBy: trackNode"
          [node]="node"
          [index]="i"
          [templates]="templates"
        >
        </tree-node>
      </div>
    </ng-container>
  `
})
export class TreeNodeCollectionComponent implements OnInit, OnDestroy {
  @Input()
  get nodes() {
    return this._nodes;
  }
  set nodes(nodes) {
    this.setNodes(nodes);
  }

  @Input() treeModel: TreeModel;

  @observable _nodes: TreeNode[];
  private virtualScroll: TreeVirtualScroll; // Cannot inject this, because we might be inside treeNodeTemplateFull
  @Input() templates;

  @observable viewportNodes: TreeNode[];

  @computed get marginTop(): string {
    const firstNode =
      this.viewportNodes && this.viewportNodes.length && this.viewportNodes[0];
    const relativePosition =
      firstNode && firstNode.parent
        ? firstNode.position -
        firstNode.parent.position -
        firstNode.parent.getSelfHeight()
        : 0;

    return `${relativePosition}px`;
  }

  _dispose: IReactionDisposer[] = [];

  @action setNodes(nodes: TreeNode[]) {
    this._nodes = nodes;
  }

  ngOnInit(): void {
    this.virtualScroll = this.treeModel.virtualScroll;
    this._dispose = [
      // return node indexes so we can compare structurally,
      reaction(
        () => {
          return this.virtualScroll
            .getViewportNodes(this.nodes)
            .map((node: TreeNode) => node.index);
        },
        nodeIndexes => {
          this.viewportNodes = nodeIndexes.map((index: number) => this.nodes[index]);
        },
        { equals: comparer.structural, fireImmediately: true }
      ),
      reaction(
        () => this.nodes,
        nodes => {
          this.viewportNodes = this.virtualScroll.getViewportNodes(nodes);
        }
      )
    ];
  }

  ngOnDestroy(): void {
    this._dispose.forEach(dispose => dispose());
  }

  trackNode(index: number, node: TreeNode): IDType {
    return node.id;
  }
}

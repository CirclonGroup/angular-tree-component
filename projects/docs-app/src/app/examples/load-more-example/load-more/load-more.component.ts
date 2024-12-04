import { Component, ViewChild } from '@angular/core';
import { delay, map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ITreeOptions, TREE_ACTIONS, TreeComponent, TreeNode } from 'angular-tree-component';

enum NodeType {
  LoadMore
}

interface NodeSkip {
  [key: string]: {
    skip: number;
  };
}

interface ServiceResult {
  nodes: any;
  total: number;
}

@Component({
    selector: 'app-load-more',
    templateUrl: './load-more.component.html',
    styleUrls: ['./load-more.component.scss'],
    standalone: false
})
export class LoadMoreComponent {

  @ViewChild('tree') tree: TreeComponent;

  nodes: any[];

  options: ITreeOptions = {
    nodeHeight: 23,
    useVirtualScroll: false,
    getChildren: node => {
      return this.fakeDataService(node.id, this.getCurrentSkip(node.id)).pipe(
        map(res => {
          return this.createNodes(res.nodes, res.total, node.id);
        })
      ).toPromise();
    },
    actionMapping: {
      mouse: {
        click: (tree, node, $event) => {
          this.onClickNode(node);
          TREE_ACTIONS.ACTIVATE(tree, node, $event);
        }
      }
    }
  };

  private nodesToSkip: NodeSkip = {};
  private loadMoreId = 'loadMore';
  private numberOfNodesToLoad = 100;

  constructor() {
    this.nodes = new Array(10).fill(null).map((item, i) => ({
      id: `${i}`,
      name: `loadMoreRoot${i}`,
      hasChildren: true
    }));
  }

  private getCurrentSkip(parentNodeId?: number | string): number {
    let currentSkip = 0;
    if (
      this.nodesToSkip &&
      parentNodeId !== undefined &&
      this.nodesToSkip[parentNodeId]
    ) {
      currentSkip = this.nodesToSkip[parentNodeId].skip;
    }
    return currentSkip;
  }

  private createNodes(
    nodes: any[],
    total: number,
    parentNodeId: number | string
  ): any[] {
    const currentSkip = this.getCurrentSkip(parentNodeId);

    // If there are more nodes to load, update skip and add a load-more node to nodes
    if (currentSkip + nodes.length < total) {
      this.addOrUpdateNodeSkip(parentNodeId, nodes.length);
      nodes.push(
        this.getLoadMoreNode(
          parentNodeId,
          this.nodesToSkip[parentNodeId].skip,
          total
        )
      );
    }

    return nodes;
  }

  onClickNode(node: TreeNode) {
    if (node.data.type === NodeType.LoadMore) {
      this.loadMoreClicked(node);
    }
  }

  private loadMoreClicked(node: TreeNode) {
    node.data.name = 'Loading more nodes';

    const parentNodeId = node.parent.id;
    this.fakeDataService(parentNodeId, this.getCurrentSkip(parentNodeId))
      .pipe(
        take(1),
        map(response => this.createNodes(response.nodes, response.total, parentNodeId))
      )
      .subscribe(nodes => {
        // remove load node
        // try fast way of popping last entry before slow filter
        if (
          node.parent.data.children[node.parent.data.children.length - 1].id ===
          node.data.id
        ) {
          node.parent.data.children.pop();
        } else {
          node.parent.data.children = node.parent.data.children.filter(
            child => child.id !== node.data.id
          );
        }

        node.parent.data.children = [...node.parent.data.children, ...nodes];

        this.tree.treeModel.update();

        if (this.tree.treeModel.getActiveNode()) {
          this.tree.treeModel.getActiveNode().toggleActivated();
          if (this.tree.treeModel.getFocusedNode()) {
            this.tree.treeModel.getFocusedNode().blur();
          }
        }
      });
  }

  // this would be your api data call
  private fakeDataService(
    parentId: number,
    skipNodes: number
  ): Observable<ServiceResult> {
    const nodes = new Array(this.numberOfNodesToLoad).fill(null).map((item, i) => ({
      id: `no-id`,
      name: `node-${parentId}-${skipNodes + i}`,
      hasChildren: false
    }));

    return of({
      nodes,
      total: 1000
    }).pipe(delay(3000));
  }

  private addOrUpdateNodeSkip(nodeId: number | string, skip: number) {
    if (this.nodesToSkip[nodeId]) {
      this.nodesToSkip[nodeId].skip += skip;
    } else {
      this.nodesToSkip[nodeId] = { skip };
    }
  }

  private getLoadMoreNode(
    parentId: number | string,
    loaded: number,
    totalItems: number
  ): any {
    const remaining = totalItems - loaded;

    return {
      type: NodeType.LoadMore,
      name: `Load more (${remaining} remaining)`,
      id: this.loadMoreId + parentId,
      hasChildren: false
    };
  }

}

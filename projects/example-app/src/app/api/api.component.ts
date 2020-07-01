import { Component, Input } from '@angular/core';
import { TreeNode, TreeModel, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-api',
  styles: [
  ],
  template: `
  <tree-root
    #tree
    [nodes]="nodes"
    [options]="options"
    [focused]="true"
  >
  </tree-root>
  <p>API:</p>
  <button (click)="tree.treeModel.focusNextNode()">next node</button>
  <button (click)="tree.treeModel.focusPreviousNode()">previous node</button>
  <button (click)="tree.treeModel.focusDrillDown()">drill down</button>
  <button (click)="tree.treeModel.focusDrillUp()">drill up</button>
  <button (click)="options.allowDrag = true">allowDrag</button>
  <p></p>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().toggleActivated()">
    {{ tree.treeModel.getFocusedNode()?.isActive ? 'deactivate' : 'activate' }}
  </button>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().toggleExpanded()">
    {{ tree.treeModel.getFocusedNode()?.isExpanded ? 'collapse' : 'expand' }}
  </button>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().blur()">
    blur
  </button>
  <button
    (click)="addNode(tree)">
    Add Node
  </button>
  <button
    (click)="activateSubSub(tree)">
    Activate inner node
  </button>
  <button
    (click)="tree.treeModel.expandAll()">
    Expand All
  </button>
  <button
    (click)="tree.treeModel.collapseAll()">
    Collapse All
  </button>
  <button
    (click)="activeNodes(tree.treeModel)">
    getActiveNodes()
  </button>
  `
})
export class ApiComponent {
  options: ITreeOptions = {

  };
  nodes = [
    {
      name: 'root1',
      children: [
        {
          name: 'child1'
        }, {
          name: 'child2'
        }
      ]
    },
    {
      name: 'root2',
      children: [
        {
          name: 'child2.1'
        }, {
          name: 'child2.2',
          children: [
            {
              id: 1001,
              name: 'subsub'
            }
          ]
        }
      ]
    }
  ];

  addNode(tree: any) {
    this.nodes[0].children.push({
      name: 'a new child'
    });
    tree.treeModel.update();
  }

  activateSubSub(tree: any) {
    // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
    tree.treeModel.getNodeById(1001)
      .setActiveAndVisible();
  }

  activeNodes(treeModel: any) {
    console.log(treeModel.activeNodes);
  }
}

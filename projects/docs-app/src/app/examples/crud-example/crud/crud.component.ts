import { Component, ViewChild } from '@angular/core';
import { ITreeOptions, TreeComponent, TreeNode } from 'angular-tree-component';

@Component({
    selector: 'app-crud',
    templateUrl: './crud.component.html',
    styleUrls: ['./crud.component.scss'],
    standalone: false
})
export class CrudComponent {

  @ViewChild('tree') tree: TreeComponent;

  nodes = [
    {
      name: 'root1',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'root2',
      children: [
        { name: 'child2.1', children: [] },
        { name: 'child2.2', children: [
            {name: 'grandchild2.2.1'}
          ] }
      ]
    },
    { name: 'root3' },
    { name: 'root4', children: [] },
    { name: 'root5', children: null }
  ];

  options: ITreeOptions = {
    displayField: 'name',
    useVirtualScroll: false,
    nodeHeight: 25,
    allowDrag: false,
    allowDrop: false
  };

  selectedNode;

  onActivateNode(event: any) {
    this.selectedNode = event.node.data;
    // Do stuff with selected node
  }

  copyNode(node: any, tree) {
    const parentNode = node.realParent ? node.realParent : node.treeModel.virtualRoot;
    const copyNode = JSON.stringify(node.data);
    const newNode = JSON.parse(copyNode);
    this.deleteIds(newNode);
    parentNode.data.children.push(newNode);
    tree.treeModel.update();
  }

  deleteIds(node: TreeNode) {
    node.id = null;
    if (node.children) {
      node.children.forEach(child => this.deleteIds(child));
    }
  }

  addNode(node: any) {
    const newNode = {name: 'new item'};
    if (!node.data.children) {
      node.data.children = [];
    }
    node.data.children.push(newNode);
    this.tree.treeModel.update();

    const someNode = this.tree.treeModel.getNodeById(node.id);
    someNode.expand();
  }

  deleteNode(node, tree) {
    const parentNode = node.realParent ? node.realParent : node.treeModel.virtualRoot;
    parentNode.data.children = parentNode.data.children.filter(child => {
      return child !== node.data;
    });
    tree.treeModel.update();
    if (node && node.parent && node.parent.data && node.parent.data.children.length === 0) {
      node.parent.data.hasChildren = false;
    }

    if (this.selectedNode?.id === node.data.id) {
      this.selectedNode = null;
    }
  }

}

import { Component } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';


let id = 10;

@Component({
  selector: 'app-async',
  template: `
    <tree-root #tree [options]="options" [nodes]="nodes"></tree-root>
    <button (click)="addNodes()">add nodes</button>
 `,
  styles: []
})
export class AsyncTreeComponent {
  options: ITreeOptions = {
    getChildren: this.getChildren.bind(this)
  };

  nodes = [];

  asyncChildren = [
    {
      name: 'child1',
      hasChildren: true
    }, {
      name: 'child2'
    }
  ];

  constructor() {
    this.nodes = [
      {
        name: 'root1',
        children: [
          { name: 'child1' }
        ]
      },
      {
        name: 'root2',
        hasChildren: true
      },
      {
        name: 'root3'
      }
    ];
  }

  addNodes() {
    this.nodes[1].children.push({
      id: ++id,
      name: `node ${id}`
    });
    this.nodes = [...this.nodes];
  }

  getChildren(node: any) {
    const newNodes = this.asyncChildren.map((c) => Object.assign({}, c));

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(newNodes), 1000);
    });
  }
}

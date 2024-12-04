import { Component } from '@angular/core';
import { ITreeOptions, TreeNode} from 'angular-tree-component';

@Component({
    selector: 'app-async',
    template: `
    <tree-root #tree [options]="options" [nodes]="nodes"></tree-root>
 `,
    styles: [],
    standalone: false
})
export class AsyncTreeComponent {
  options: ITreeOptions = {
    getChildren: this.getChildren.bind(this),
    useCheckbox: true
  };

  nodes: any[] = [];

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

  getChildren(node: any) {
    const newNodes = this.asyncChildren.map((c) => Object.assign({}, c));

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(newNodes), 1000);
    });
  }
}

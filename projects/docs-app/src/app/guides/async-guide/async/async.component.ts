import { Component, OnInit } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';

@Component({
    selector: 'app-async',
    templateUrl: './async.component.html',
    styleUrls: ['./async.component.scss'],
    standalone: false
})
export class AsyncComponent {

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

import { Component } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-fields',
  template: `
    <h3>Overriding displayField & nodeClass</h3>
    <tree-root id="tree1" [focused]="true" [nodes]="nodes" [options]="options"></tree-root>
  `,
  styles: [
  ]
})
export class FieldsComponent {
  nodes = [
    {
      _id: '1',
      title: 'root1',
      className: 'root1Class',
      nodes: [{_id: '3', title: 'child1', className: 'root1Class'}]
    },
    {
      _id: '2',
      title: 'root2',
      className: 'root2Class'
    }
  ];

  options: ITreeOptions = {
    displayField: 'title',
    idField: '_id',
    childrenField: 'nodes',
    nodeClass: (node) => node.data.className
  };
}

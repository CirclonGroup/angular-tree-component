import { Component } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-field-functions',
  template: `
    <h3>Overriding displayField and childrenField with functions</h3>
    <tree-root id="tree1" [focused]="true" [nodes]="nodes" [options]="options"></tree-root>
  `,
  styles: [
  ]
})
export class FieldFunctionsComponent {
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
    displayField: (node) => node.data.title + ' Function Suffix',
    idField: (node) => {console.log(node); return node.data._id},
    childrenField: (node) => node.data.nodes ?? [],
    nodeClass: (node) => node.data.className
  };
}

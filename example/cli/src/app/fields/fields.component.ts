import { Component } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-fields',
  template: `
    <h3>Overriding displayField & nodeClass</h3>
    <tree-root id="tree1" [focused]="true" [nodes]="nodes1" [options]="options1"></tree-root>
  `,
  styles: [
    '.root1Class { color: blue }',
    '.root2Class { color: red }'
  ]
})
export class FieldsComponent {
  nodes1 = [
    {
      title: 'root1',
      className: 'root1Class'
    },
    {
      title: 'root2',
      className: 'root2Class'
    }
  ];

  options1: ITreeOptions = {
    displayField: 'title',
    nodeClass: (node) => node.data.className
  };
}

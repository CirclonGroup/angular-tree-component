import { Component } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';

@Component({
    selector: 'app-templates-demo',
    templateUrl: './templates-demo.component.html',
    styleUrls: ['./templates-demo.component.scss'],
    standalone: false
})
export class TemplatesDemoComponent {

  nodes1 = [
    {
      title: 'root1',
      className: 'root1Class'
    },
    {
      title: 'root2',
      className: 'root2Class',
      hasChildren: true
    }
  ];

  nodes2 = [
    {
      title: 'root1',
      className: 'root1Class'
    },
    {
      title: 'root2',
      className: 'root2Class',
      children: [
        { title: 'child1', className: 'child1Class' }
      ]
    }
  ];

  options1: ITreeOptions = {
    getChildren: () => new Promise((resolve, reject) => { })
  };

  options0: ITreeOptions = {
    displayField: 'title',
    nodeClass: (node) => `${node.data.title}Class`
  };

}

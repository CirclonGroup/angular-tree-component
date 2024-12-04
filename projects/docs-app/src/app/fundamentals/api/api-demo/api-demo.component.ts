import { Component } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';

@Component({
    selector: 'app-api-demo',
    templateUrl: './api-demo.component.html',
    styleUrls: ['./api-demo.component.scss'],
    standalone: false
})
export class ApiDemoComponent {

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

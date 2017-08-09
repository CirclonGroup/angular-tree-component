import { Component } from '@angular/core';

@Component({
  selector: 'app-saverestore',
  template: `
    <input id="filter" #filter (keyup)="tree.treeModel.filterNodes(filter.value)" placeholder="filter nodes"/>
    <tree-root [state]="state" (stateChange)="setState($event)" #tree [focused]="true" [nodes]="nodes"></tree-root>
  `,
  styles: []
})
export class SaveRestoreComponent {
  state = localStorage.treeState && JSON.parse(localStorage.treeState);
  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1', children: [] },
        { id: 6, name: 'child2.2', children: [
          { id: 7, name: 'grandchild2.2.1' }
        ] }
      ]
    }
  ];

  setState(state) {
    localStorage.treeState = JSON.stringify(state);
  }
}

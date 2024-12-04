import { Component } from '@angular/core';
import { ITreeState } from 'angular-tree-component';

const getChildren = () => new Promise((resolve) => {
  setTimeout(() => resolve([
    { id: 5, name: 'child2.1', children: [] },
    { id: 6, name: 'child2.2', children: [
      { id: 7, name: 'grandchild2.2.1' }
    ] }
  ]), 2000);
});

@Component({
    selector: 'app-saverestore',
    template: `
    <input id="filter" #filter (keyup)="tree.treeModel.filterNodes(filter.value)" placeholder="filter nodes"/>
    <tree-root [options]="options" [(state)]="state" #tree [focused]="true" [nodes]="nodes"></tree-root>
  `,
    styles: [],
    standalone: false
})
export class SaveRestoreComponent {
  get state(): ITreeState {
    return localStorage.treeState && JSON.parse(localStorage.treeState);
  }
  set state(state: ITreeState) {
    localStorage.treeState = JSON.stringify(state);
  }

  options = {
    getChildren
  };

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
      hasChildren: true
    }
  ];

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-state-binding',
  templateUrl: './state-binding.component.html',
  styleUrls: ['./state-binding.component.scss']
})
export class StateBindingComponent {
  example = `
import \{ Component \} from \'@angular/core\';
import \{ ITreeState \} from \'angular-tree-component\';

@Component(\{
  selector: \'app-saverestore\',
  template: \`
    <tree-root [(state)]="state" [nodes]="nodes"></tree-root>
    <button (click)="collapseAll()">collapse all</button>
    <button (click)="hideFolders()">hide folders</button>
  \`,
  styles: []
\})
export class MyComponent \{
  state: ITreeState;
  nodes = [
    { id: 1, isFolder: true, name: 'folder1', children: [
      { id: 2, name: 'file1', isFolder: false },
      { id: 3, name: 'file2', isFolder: false }
    ] },
    { id: 4, isFolder: false, name: 'flatfile1' },
    { id: 5, isFolder: false, name: 'flatfile2' }
  ];

  collapseAll() {
    this.state = {
      ...this.state,
      expandedNodeIds: {}
    };
  }

  hideFolders() {
    const hiddenNodeIds = {};

    this.nodes.forEach((node) => {
      if (node.isFolder) {
        hiddenNodeIds[node.id] = true;
      }
    });

    this.state = {
      ...this.state,
      hiddenNodeIds
    };
  }
}
`;

  localStorage = `
<tree-root
  [(state)]="state"
  [nodes]="nodes">
</tree-root>

class MyComponent {
  get state() {
    return localStorage.treeState && JSON.parse(localStorage.treeState);
  }
  set state(state) {
    localStorage.treeState = JSON.stringify(state);
  }
}
`;

  api = `
<tree-root
  (initialize)="onInit($event)"
  [nodes]="nodes">
</tree-root>

class MyComponent {
  onInit({treeModel}: { eventName: 'initialized'; treeModel: TreeModel }) {
    if (localStorage.treeState) {
      treeModel.setState(JSON.parse(localStorage.treeState);
    }
    treeModel.subscribeToState((treeState: ITreeState) => {
      localStorage.treeState = JSON.stringify(treeState);
    });
  }
}
`;
}

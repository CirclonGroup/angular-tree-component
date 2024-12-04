import { Component } from '@angular/core';

@Component({
    selector: 'app-redux-guide',
    templateUrl: './redux-guide.component.html',
    styleUrls: ['./redux-guide.component.scss'],
    standalone: false
})
export class ReduxGuideComponent {
  options = `
options = {
  actionMapping: {
    mouse: {
      drop: (tree: TreeModel, node: TreeNode, $event: any, {from , to}: {from: any, to: any}) => {
        // custom action. parameters: from = node, to = {parent, index}
      }
    }
  }
}`;
}

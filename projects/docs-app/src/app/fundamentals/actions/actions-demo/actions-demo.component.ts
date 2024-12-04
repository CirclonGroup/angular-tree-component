import { Component } from '@angular/core';
import { IActionMapping, ITreeOptions, KEYS, TREE_ACTIONS } from 'angular-tree-component';

@Component({
    selector: 'app-actions-demo',
    templateUrl: './actions-demo.component.html',
    styleUrls: ['./actions-demo.component.scss'],
    standalone: false
})
export class ActionsDemoComponent {

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

  actionMapping: IActionMapping = {
    mouse: {
      contextMenu: (tree, node, $event) => {
        $event.preventDefault();
        alert(`context menu for ${node.data.name}`);
      },
      dblClick: (tree, node, $event) => {
        if (node.hasChildren) {
          TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        }
      },
      click: (tree, node, $event) => {
        $event.shiftKey
          ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
          : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);
      },
      mouseOver: (tree, node, $event) => {
        $event.preventDefault();
        console.log(`mouseOver ${node.data.name}`);
      },
      mouseOut: (tree, node, $event) => {
        $event.preventDefault();
        console.log(`mouseOut ${node.data.name}`);
      }
    },
    keys: {
      [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
    }
  };

  options: ITreeOptions = {
    actionMapping: this.actionMapping
  };

}

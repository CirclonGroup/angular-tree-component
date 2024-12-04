import { Component } from '@angular/core';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss'],
    standalone: false
})
export class ActionsComponent {

  actionMapping = `
import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';

const actionMapping: IActionMapping = {
  mouse: {
    click: TREE_ACTIONS.TOGGLE_SELECTED_MULTI
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(\`This is \${node.data.name\}\`)
  }
}
`;

  mouseActions = `
import { TREE_ACTIONS, IActionMapping } from 'angular-tree-component';

actionMapping: IActionMapping = {
  mouse: {
    dblClick: (tree, node, $event) => // Open a modal with node content,
    click: TREE_ACTIONS.TOGGLE_SELECTED_MULTI,
  }
}
`;

  keys = `
KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13,
  SPACE: 32
}
`;

  keysExample = `
import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';

actionMapping:IActionMapping = {
  keys: {
    127: (tree, node, $event) => // do something to delete the node,
    [KEYS.ENTER]: TREE_ACTIONS.EXPAND
  }
}
`;

  defaultMapping = `
const defaultActionMapping: IActionMapping = {
  mouse: {
    click: TREE_ACTIONS.TOGGLE_ACTIVE,
    dblClick: null,
    contextMenu: null,
    expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,
    checkboxClick: TREE_ACTIONS.TOGGLE_SELECTED,
    drop: TREE_ACTIONS.MOVE_NODE
  },
  keys: {
    [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,
    [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,
    [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,
    [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,
    [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_ACTIVE,
    [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_ACTIVE
  }
};
`;

}

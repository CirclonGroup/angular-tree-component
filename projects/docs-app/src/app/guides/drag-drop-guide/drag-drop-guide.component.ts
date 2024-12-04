import { Component } from '@angular/core';

@Component({
    selector: 'app-drag-drop-guide',
    templateUrl: './drag-drop-guide.component.html',
    styleUrls: ['./drag-drop-guide.component.scss'],
    standalone: false
})
export class DragDropGuideComponent {
  options =
`
options = {
  allowDrag: (node) => node.isLeaf,
  allowDrop: (element, { parent, index }) {
    // return true / false based on element, to.parent, to.index. e.g.
    return parent.hasChildren;
  },
  getNodeClone: (node) => ({
    ...node.data,
    id: uuid.v4(),
    name: \`copy of \${node.data.name}\`
  })
};

options2 = {
  allowDrag: true,
  allowDrop: false
};
`;

  htmlOptions = `
<tree-root
    [nodes]="nodes"
    [options]="options"></tree-root>`;

  event = `
  options = {
  allowDrag: true
}

onMoveNode($event) {
  console.log(
    "Moved",
    $event.node.name,
    "to",
    $event.to.parent.name,
    "at index",
    $event.to.index);
}`;

  eventHtml = `
<tree-root
  (moveNode)="onMoveNode($event)"
  [nodes]="nodes"
  [options]="options"></tree-root>`;

  override = `
options = {
  allowDrag: true,
  actionMapping: {
    mouse: {
      drop: (tree:TreeModel, node:TreeNode, $event:any, {from, to}) => {
        // use from to get the dragged node.
        // use to.parent and to.index to get the drop location
        // use TREE_ACTIONS.MOVE_NODE to invoke the original action
      },
      dragStart?: IActionHandler,
      drag?: IActionHandler,
      dragEnd?: IActionHandler,
      dragOver?: IActionHandler,
      dragLeave?: IActionHandler,
      dragEnter?: IActionHandler
    }
  }
}`;

  overrideHtml = `
<tree-root
    [nodes]="nodes"
    [options]="options"></tree-root>`;

  dragOutside = `
onDrop($event) {
  // Dropped $event.element
}

allowDrop(element) {
  // Return true/false based on element
}`;

  dragOutsideHtml = `
<div (treeDrop)="onDrop($event)"
     [treeAllowDrop]="allowDrop.bind(this)"></div>`;

  dragExternal = `
options = {
  actionMapping: {
    mouse: {
      drop: (tree, node, $event, {from, to}) => {
        console.log('drag', from, to); // from === {name: 'first'}
        // Add a node to \`to.parent\` at \`to.index\` based on the data in \`from\`
        // Then call tree.update()
      }
    }
  }
}`;

  dragExternalHtml = `
<p [treeDrag]="{name: 'first'}" [treeDragEnabled]="true">Drag me!</p>
<p [treeDrag]="{name: 'second'}">Drag me as well!</p>`;

  performance = `
// use private cdr: ChangeDetectorRef in constructor

let treeOptions: ITreeOptions = {
  actionMapping: {
    mouse: {
      dragStart: () => { this.cdr.detach(); },
      dragEnd: () => { this.cdr.reattach(); },
    }
  }
};`;
}

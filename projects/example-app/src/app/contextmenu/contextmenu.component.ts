import { Component, HostListener } from '@angular/core';
import { ITreeOptions, TREE_ACTIONS, TreeNode, TreeModel } from 'angular-tree-component';

@Component({
    selector: 'app-contextmenu',
    template: `
    <tree-root [focused]="true" [options]="options" [nodes]="nodes">
      <ng-template #treeNodeTemplate let-node="node">
        <span *ngIf="node === editNode">
          <input
            autofocus
            [(ngModel)]="node.data.name"
            (blur)="stopEdit()"
            (keyup.enter)="stopEdit()"/>
        </span>
        <span *ngIf="node !== editNode">{{ node.data.name }}</span>
      </ng-template>
    </tree-root>
    <div class="menu" *ngIf="contextMenu" [style.left.px]="contextMenu.x" [style.top.px]="contextMenu.y">
      <div>Menu for {{ contextMenu.node.data.name }}</div>
      <hr>
      <ul>
        <li (click)="edit()"><a>Edit</a></li>
        <li (click)="copy()"><a>Copy</a></li>
        <li (click)="cut()"><a>Cut</a></li>
        <li (click)="paste()"><a [style.opacity]="canPaste() && 1 || 0.3">Paste</a></li>
      </ul>
    </div>
    <br>
    <p>Keys:</p>
    down | up | left | right | space | enter
  `,
    styles: [
        `.menu {
      position: absolute;
      background: rgba(255, 255, 255, 0.9);
      padding: 7px;
      border-radius: 5px;
      box-shadow: 0 0 2px 2px rgba(0,0,0,0.2);
    }`,
        `ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }`,
        `li {
      padding: 7px;
      border-radius: 3px;
      cursor: pointer;
    }`,
        `li:hover {
      background-color: aliceblue;
    }`,
    ],
    standalone: false
})
export class ContextmenuComponent {
  contextMenu: {node: TreeNode, x: number, y: number} = null;
  sourceNode: TreeNode = null;
  editNode: TreeNode = null;
  doCut = false;
  nodes = [
    {
      name: 'root1',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'root2',
      children: [
        { name: 'child2.1', children: [] },
        { name: 'child2.2', children: [
          {name: 'grandchild2.2.1'}
        ] }
      ]
    },
    { name: 'root3' },
    { name: 'root4', children: [] },
    { name: 'root5', children: null }
  ];

  options: ITreeOptions = {
    actionMapping: {
      mouse: {
        contextMenu: (treeModel: TreeModel, treeNode: TreeNode, e: MouseEvent) => {
          e.preventDefault();
          if (this.contextMenu && treeNode === this.contextMenu.node) {
            return this.closeMenu();
          }
          this.contextMenu = {
            node: treeNode,
            x: e.pageX,
            y: e.pageY
          };
        },
        click: (treeModel: TreeModel, treeNode: TreeNode, e: MouseEvent) => {
          this.closeMenu();
          TREE_ACTIONS.TOGGLE_ACTIVE(treeModel, treeNode, e);
        }
      }
    }
  };

  closeMenu = () => {
    this.contextMenu = null;
  }

  edit = () => {
    this.editNode = this.contextMenu.node;
    this.closeMenu();
  }

  stopEdit = () => {
    this.editNode = null;
  }

  copy = () => {
    this.sourceNode = this.contextMenu.node;
    this.doCut = false;
    this.closeMenu();
  }

  cut = () => {
    this.sourceNode = this.contextMenu.node;
    this.doCut = true;
    this.closeMenu();
  }

  paste = () => {
    if (!this.canPaste()) {
      return;
    }
    this.doCut
      ? this.sourceNode.treeModel.moveNode(this.sourceNode, { parent: this.contextMenu.node, index: 0 })
      : this.sourceNode.treeModel.copyNode(this.sourceNode, { parent: this.contextMenu.node, index: 0 });

    this.sourceNode = null;
    this.closeMenu();
  }

  canPaste = () => {
    if (!this.sourceNode) {
      return false;
    }
    return this.sourceNode.treeModel.canMoveNode(this.sourceNode, { parent: this.contextMenu.node, index: 0 });
  }
}

function uuid() {
  return Math.floor(Math.random() * 10000000000000);
}

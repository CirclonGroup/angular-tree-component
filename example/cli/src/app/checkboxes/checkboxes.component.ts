import { ITreeOptions, IActionMapping } from 'angular-tree-component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-checkboxes',
  template: `
    <h3>tri-state checkboxes</h3>
    <tree-root
      #tree
      [nodes]="nodes"
      [options]="options">

      <ng-template #treeNodeTemplate let-node="node" let-index="index" >
        <input
          (change)="check(node, !node.data.checked)"
          type="checkbox"
          [indeterminate]="node.data.indeterminate"
          [checked]="node.data.checked">

          {{ node.data.name }}
      </ng-template>
    </tree-root>
  `,
  styles: []
})
export class CheckboxesComponent {
  nodes = [
    {
      name: 'root1',
      checked: true,
    },
    {
      name: 'root2',
      checked: false,
      children: [
        { name: 'child1', checked: false },
        { name: 'child2', checked: false, children: [
          { name: 'grandchild1', checked: false },
          { name: 'grandchild2', checked: false }
        ] }
      ]
    }
  ];

  actionMapping: IActionMapping = {
    mouse: {
      click: (tree, node) => this.check(node, !node.data.checked)
    }
  };

  options: ITreeOptions = {
    actionMapping: this.actionMapping
  };

  public check(node, checked) {
    this.updateChildNodeCheckbox(node, checked);
    this.updateParentNodeCheckbox(node.realParent);
  }
  public updateChildNodeCheckbox(node, checked) {
    node.data.checked = checked;
    if (node.children) {
      node.children.forEach((child) => this.updateChildNodeCheckbox(child, checked));
    }
  }
  public updateParentNodeCheckbox(node) {
    if (!node) {
      return;
    }

    let allChildrenChecked = true;
    let noChildChecked = true;

    for (const child of node.children) {
      if (!child.data.checked || child.data.indeterminate) {
        allChildrenChecked = false;
      }
      if (child.data.checked) {
        noChildChecked = false;
      }
    }

    if (allChildrenChecked) {
      node.data.checked = true;
      node.data.indeterminate = false;
    } else if (noChildChecked) {
      node.data.checked = false;
      node.data.indeterminate = false;
    } else {
      node.data.checked = true;
      node.data.indeterminate = true;
    }
    this.updateParentNodeCheckbox(node.parent);
  }
}

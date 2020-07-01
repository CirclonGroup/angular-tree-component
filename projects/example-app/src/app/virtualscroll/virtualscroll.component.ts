import { Component, Input } from '@angular/core';
import { TreeNode, TreeModel, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-virtualscroll',
  styles: [
  ],
  template: `
  <div style="height: 800px; width: 500px; overflow: hidden;">

    <tree-root
      #tree
      [nodes]="nodes"
      [options]="options"
      [focused]="true"
    >
    </tree-root>
  </div>
  `
})
export class VirtualscrollComponent {
  nodes: any[];

  options: ITreeOptions = {
    nodeHeight: 23,
    useVirtualScroll: true
  };

  constructor() {
    this.nodes = new Array(1000).fill(null).map((item, i) => ({
      id: `${i}`,
      name: `rootDynamic${i}`,
      children: new Array(100).fill(null).map((item, n) => ({
        id: `${i}.${n}`,
        name: `rootChildDynamic${i}.${n}`
      }))
    }));
  }
}

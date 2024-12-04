import { Component, Input, OnInit } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

@Component({
    selector: 'app-scrollcontainer',
    styles: [],
    template: `
  <div style="height: 300px; width: 200px;border: 1px solid grey">Padding</div>
  <div>
    <tree-root
      #tree
      [nodes]="nodes"
      [options]="options"
      [focused]="true"
    ></tree-root>
  </div>
  `,
    standalone: false
})
export class ScrollContainerComponent implements OnInit {
  nodes: any[] = [];
  options: ITreeOptions = {
    scrollContainer: <HTMLElement>document.body.parentElement
  };
  constructor() {
  }
  ngOnInit() {
    for (let i = 0; i < 200; i++) {
      this.nodes.push({
        name: `rootDynamic${i}`,
        subTitle: `root created dynamically ${i}`
      });
    }
  }

}

import { Component } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';

@Component({
    selector: 'app-large-tree',
    templateUrl: './large-tree.component.html',
    styleUrls: ['./large-tree.component.scss'],
    standalone: false
})
export class LargeTreeComponent {
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

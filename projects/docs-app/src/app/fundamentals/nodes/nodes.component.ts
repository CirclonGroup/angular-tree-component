import { Component } from '@angular/core';

@Component({
    selector: 'app-nodes',
    templateUrl: './nodes.component.html',
    styleUrls: ['./nodes.component.scss'],
    standalone: false
})
export class NodesComponent {

  nodes = `[
  {
    id: 1,
    name: 'root1',
    children: [
      { id: 2, name: 'child1' },
      { id: 3, name: 'child2' }
    ]
  }
]`;
}

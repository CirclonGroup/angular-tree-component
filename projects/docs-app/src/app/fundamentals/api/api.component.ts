import { Component } from '@angular/core';

@Component({
    selector: 'app-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
    standalone: false
})
export class ApiComponent {
  html = `
<tree-root #tree [nodes]="nodes"></tree-root>

<button (click)="tree.treeModel.focusNextNode()">next node</button>
<button (click)="tree.treeModel.focusPreviousNode()">previous node</button>
<button (click)="tree.treeModel.focusDrillDown()">drill down</button>
<button (click)="tree.treeModel.focusDrillUp()">drill up</button>
`;
}

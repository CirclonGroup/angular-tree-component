import { Component } from '@angular/core';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
    standalone: false
})
export class EventsComponent {
  event = `
<tree-root [nodes]="nodes"
    (toggleExpanded)="onEvent($event)"
    (activate)="onEvent($event)"
    (focus)="onEvent($event)"
    (blur)="onEvent($event)">
</tree-root>

onEvent = ($event) => console.log($event);
`;

  toggleExpanded = `
{
  eventName: string;
  node: ITreeNode;
  isActive: boolean;
}
`;

  basicEvent = `
{
  eventName: string;
  node: ITreeNode;
}
`;

  eventName = `
{
  eventName: string;
}
`;

  move = `
{
  eventName: string;
  node: ITreeNode; // The node that was moved
  to: {
    parent: ITreeNode; // The parent node that contains the moved node
    index: number; // Index in the parent where the node was moved
  }
}
`;

  copy = `
{
  eventName: string;
  node: ITreeNode; // The node that was copied
  to: {
    parent: ITreeNode; // The parent node that contains the copied node
    index: number; // Index in the parent where the node was copied
  }
}
`;

  baseEvent = `
{
  eventName: string;
  ...rest: corresponding to the original event
}`;

  // TODO: add stateChange
}

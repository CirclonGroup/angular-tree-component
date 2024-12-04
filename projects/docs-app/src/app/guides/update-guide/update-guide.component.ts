import { Component } from '@angular/core';

@Component({
    selector: 'app-update-guide',
    templateUrl: './update-guide.component.html',
    styleUrls: ['./update-guide.component.scss'],
    standalone: false
})
export class UpdateGuideComponent {

  adding =
`
<tree-root #tree nodes="nodes"></tree-root>

class MyComponent {
  nodes = [{ name: 'node' }];

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  addNode() {
    this.nodes.push({ name: 'another node' });
    this.tree.treeModel.update();
  }
}
`;

  immutable =
`
<tree-root nodes="nodes"></tree-root>

nodes = [...]

addNode(newNode) {
  // Just add node and replace nodes variable:
  this.nodes = [...this.nodes, newNode];
}
`;

}

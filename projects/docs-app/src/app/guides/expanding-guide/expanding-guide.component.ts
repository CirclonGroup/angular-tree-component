import { Component } from '@angular/core';

@Component({
    selector: 'app-expanding-guide',
    templateUrl: './expanding-guide.component.html',
    styleUrls: ['./expanding-guide.component.scss'],
    standalone: false
})
export class ExpandingGuideComponent {

  allNodes = `
<tree-root #tree [nodes]="nodes"></tree-root>

@Component {
  nodes = [...];
  @ViewChild('tree') tree;

  ngAfterViewInit() {
    this.tree.treeModel.expandAll();
  }
}`;

  specific = `
<tree-root #tree [nodes]="nodes"></tree-root>

@Component {
  nodes = [...];
  @ViewChild('tree') tree;

  ngAfterViewInit() {
    const someNode = this.tree.treeModel.getNodeById('someId');
    someNode.expand();

    const firstRoot = this.tree.treeModel.roots[0];
    firstRoot.setActiveAndVisible();
  }
}`;

}

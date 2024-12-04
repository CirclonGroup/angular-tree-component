import { Component, Input, OnChanges } from '@angular/core';
import { NavigationNode } from '../../navigation/navigation.model';

@Component({
    selector: 'app-nav-item',
    templateUrl: './nav-item.component.html',
    styleUrls: ['./nav-item.component.scss'],
    standalone: false
})
export class NavItemComponent implements OnChanges {

  @Input() isWide = false;
  @Input() level = 1;
  @Input() node: NavigationNode;
  @Input() isParentExpanded = true;
  @Input() selectedNodes: NavigationNode[] | undefined;

  isExpanded = false;
  isSelected = false;
  classes: {[index: string]: boolean };
  nodeChildren: NavigationNode[];

  ngOnChanges() {
    this.nodeChildren = this.node && this.node.children ? this.node.children.filter(n => !n.hidden) : [];

    if (this.selectedNodes) {
      const ix = this.selectedNodes.find(node => node.title === this.node.title);
      this.isSelected = ix !== undefined; // this node is the selected node or its ancestor
      // TODO: build this nice
      /*
      this.isExpanded = this.isParentExpanded &&
        (this.isSelected || // expand if selected or ...
          // preserve expanded state when display is wide; collapse in mobile.
          (this.isWide && this.isExpanded));
      */
      if (!this.isSelected && this.nodeChildren && this.nodeChildren.length) {
        const selectedChild = this.selectedNodes.find(node => this.nodeChildren.some(child => child.title === node.title));
        this.isSelected = selectedChild !== undefined;
      }
    } else {
      this.isSelected = false;
    }

    this.setClasses();
  }

  setClasses() {
    this.classes = {
      ['level-' + this.level]: true,
      collapsed: !this.isExpanded,
      expanded: this.isExpanded,
      selected: this.isSelected
    };
  }

  headerClicked() {
    this.isExpanded = !this.isExpanded;
    this.setClasses();
  }

}

import { Component } from '@angular/core';

@Component({
    selector: 'app-filter-guide',
    templateUrl: './filter-guide.component.html',
    styleUrls: ['./filter-guide.component.scss'],
    standalone: false
})
export class FilterGuideComponent {
  functionFilter =
`
tree.treeModel.filterNodes((node) => {
  return !node.data.name.startsWith(text);
});
`;
}

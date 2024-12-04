import { Component } from '@angular/core';

@Component({
    selector: 'app-async-guide',
    templateUrl: './async-guide.component.html',
    styleUrls: ['./async-guide.component.scss'],
    standalone: false
})
export class AsyncGuideComponent {

  javascript =
`
options = {
  getChildren: (node:TreeNode) => {
    return request('/api/children/' + node.id);
  }
}

nodes = [
  {
    name: 'asyncRoot',
    hasChildren: true
  },
  {
    name: 'root2',
    children: [
      {
        name: 'leaf',
        hasChildren: false
      }
    ]
  }
]
`;

}

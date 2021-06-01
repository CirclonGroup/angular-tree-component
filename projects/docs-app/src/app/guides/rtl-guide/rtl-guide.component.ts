import { Component } from '@angular/core';

@Component({
  selector: 'app-rtl-guide',
  templateUrl: './rtl-guide.component.html',
  styleUrls: ['./rtl-guide.component.scss']
})
export class RtlGuideComponent {
  html = `<tree-root [focused]="true" [nodes]="nodes" [options]="options"></tree-root>`;
  javascript = `
options = {
  rtl: true
};
`;
}

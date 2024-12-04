import { Component, OnInit } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';

@Component({
    selector: 'app-auto-scroll',
    templateUrl: './auto-scroll.component.html',
    styleUrls: ['./auto-scroll.component.scss'],
    standalone: false
})
export class AutoScrollComponent implements OnInit {

  nodes: any[] = [];
  options: ITreeOptions = {
    scrollContainer: <HTMLElement>document.body.parentElement
  };

  ngOnInit() {
    for (let i = 0; i < 200; i++) {
      this.nodes.push({
        name: `rootDynamic${i}`,
        subTitle: `root created dynamically ${i}`
      });
    }
  }

}

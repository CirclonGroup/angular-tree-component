import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { NavigationNode } from './navigation/navigation.model';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  baseTitle = 'Angular Tree Component';

  nav: NavigationNode[] = [
    { title: 'Getting Started', children: null, link: [''] },
    { title: 'Fundamentals', children:
        [
          { title: 'Nodes', url: 'fundamentals/nodes', children: null, link: ['fundamentals', 'nodes'] },
          { title: 'Options', url: 'fundamentals/options', children: null, link: ['fundamentals', 'options'] },
          { title: 'Customize Actions', url: 'fundamentals/actions', children: null, link: ['fundamentals', 'actions'] },
          { title: 'Custom Templates', url: 'fundamentals/templates', children: null, link: ['fundamentals', 'templates'] },
          { title: 'Events', url: 'fundamentals/events', children: null, link: ['fundamentals', 'events'] },
          { title: '2-way binding to state', url: 'fundamentals/state', children: null, link: ['fundamentals', 'state'] },
          { title: 'Calling API Methods', url: 'fundamentals/api', children: null, link: ['fundamentals', 'api'] },
          { title: 'Styling', url: 'fundamentals/styling', children: null, link: ['fundamentals', 'styling'] },
          { title: 'Focused', url: 'fundamentals/focus', children: null, link: ['fundamentals', 'focus'] },
          { title: 'Common issues', url: 'fundamentals/issues', children: null, link: ['fundamentals', 'issues'] },
        ]
    },
    { title: 'Guides', children:
        [
          { title: 'Async Data', url: 'guides/async', children: null, link: ['guides', 'async'] },
          { title: 'Filtering', url: 'guides/filter', children: null, link: ['guides', 'filter'] },
          { title: 'Updating the tree', url: 'guides/update', children: null, link: ['guides', 'update'] },
          { title: 'Drag & Drop', url: 'guides/dragdrop', children: null, link: ['guides', 'dragdrop'] },
          { title: 'Checkboxes', url: 'guides/checkboxes', children: null, link: ['guides', 'checkboxes'] },
          { title: 'Large Trees & Virtual Scroll', url: 'guides/largetree', children: null, link: ['guides', 'largetree'] },
          { title: 'Redux / Immutable Data', url: 'guides/redux', children: null, link: ['guides', 'redux'] },
          { title: 'RTL', url: 'guides/rtl', children: null, link: ['guides', 'rtl'] },
          { title: 'Custom Fields', url: 'guides/customfields', children: null, link: ['guides', 'customfields'] },
          { title: 'Expanding nodes on init', url: 'guides/expanding', children: null, link: ['guides', 'expanding'] },
          { title: 'Auto Scrolling', url: 'guides/autoscroll', children: null, link: ['guides', 'autoscroll'] },
        ]
    },
    { title: 'Examples', children:
        [
          { title: 'Basic', url: 'examples/basic', children: null, link: ['examples', 'basic'] },
          { title: 'Columns', url: 'examples/columns', children: null, link: ['examples', 'columns'] },
          { title: 'CRUD', url: 'examples/crud', children: null, link: ['examples', 'crud'] },
          { title: 'Load more', url: 'examples/loadmore', children: null, link: ['examples', 'loadmore'] },
        ]
    },
  ];
  currentNodes = [];

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router,
    private titleService: Title,
  ) {
    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/github-icon.svg')
    );
    iconRegistry.addSvgIcon(
      'tree-logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/tree-logo.svg')
    );

    // TODO: build this nice
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        let newCurrent = [];
        this.nav.forEach(navNode => {
          if (navNode.link && this.router.isActive(this.router.createUrlTree(navNode.link), false)) {
            newCurrent.push({...navNode});
          }
          if (navNode.children) {
            navNode.children.forEach(childNode => {
              if (childNode.link && this.router.isActive(this.router.createUrlTree(childNode.link), false)) {
                newCurrent.push({...childNode});
              }
            });
          }
        });
        if (newCurrent.length >= 2 && newCurrent.find(n => n.title === this.nav[0].title) !== undefined) {
          newCurrent = newCurrent.filter(n => n.title !== this.nav[0].title);
        }

        // set title on all but landing page
        if (newCurrent?.length && newCurrent[0].title !== 'Getting Started') {
          this.titleService.setTitle(`${this.baseTitle} - ${newCurrent[0].title}`);
        } else {
          this.titleService.setTitle(this.baseTitle);
        }

        this.currentNodes = newCurrent;
      });
  }
}

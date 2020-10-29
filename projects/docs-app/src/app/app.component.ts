import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationNode } from './navigation/navigation.model';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'docs-app';

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
    { title: 'Examples', children:
        [
          { title: 'Basic', url: 'examples/basic', children: null, link: ['examples', 'basic'] },
        ]
    },
  ];
  currentNodes = [];

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router
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
        this.currentNodes = newCurrent;
      });
  }
}

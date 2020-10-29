import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { BasicUsageComponent } from './examples/basic-usage/basic-usage.component';
import { NodesComponent } from './fundamentals/nodes/nodes.component';
import { OptionsComponent } from './fundamentals/options/options.component';
import { ActionsComponent } from './fundamentals/actions/actions.component';
import { TemplatesComponent } from './fundamentals/templates/templates.component';
import { EventsComponent } from './fundamentals/events/events.component';
import { StateBindingComponent } from './fundamentals/state-binding/state-binding.component';
import { ApiComponent } from './fundamentals/api/api.component';
import { StylingComponent } from './fundamentals/styling/styling.component';
import { FocusComponent } from './fundamentals/focus/focus.component';
import { IssuesComponent } from './fundamentals/issues/issues.component';

const routes: Routes = [
  {
    path: '',
    component: GettingStartedComponent,
    pathMatch: 'full',
  },
  {
    path: 'examples',
    children: [
      { path: 'basic', component: BasicUsageComponent }
    ]
  },
  {
    path: 'fundamentals',
    children: [
      { path: 'nodes', component: NodesComponent },
      { path: 'options', component: OptionsComponent },
      { path: 'actions', component: ActionsComponent },
      { path: 'templates', component: TemplatesComponent },
      { path: 'events', component: EventsComponent },
      { path: 'state', component: StateBindingComponent },
      { path: 'api', component: ApiComponent },
      { path: 'styling', component: StylingComponent },
      { path: 'focus', component: FocusComponent },
      { path: 'issues', component: IssuesComponent },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        scrollPositionRestoration: 'enabled'
      }
    ),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}

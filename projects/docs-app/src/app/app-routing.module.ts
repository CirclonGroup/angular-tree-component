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
import { ColumnsExampleComponent } from './examples/columns-example/columns-example.component';
import { CrudExampleComponent } from './examples/crud-example/crud-example.component';
import { LoadMoreExampleComponent } from './examples/load-more-example/load-more-example.component';
import { AsyncGuideComponent } from './guides/async-guide/async-guide.component';
import { FilterGuideComponent } from './guides/filter-guide/filter-guide.component';
import { UpdateGuideComponent } from './guides/update-guide/update-guide.component';
import { DragDropGuideComponent } from './guides/drag-drop-guide/drag-drop-guide.component';
import { CheckboxesGuideComponent } from './guides/checkboxes-guide/checkboxes-guide.component';
import { LargeTreeGuideComponent } from './guides/large-tree-guide/large-tree-guide.component';
import { ReduxGuideComponent } from './guides/redux-guide/redux-guide.component';
import { RtlGuideComponent } from './guides/rtl-guide/rtl-guide.component';
import { CustomFieldsGuideComponent } from './guides/custom-fields-guide/custom-fields-guide.component';
import { ExpandingGuideComponent } from './guides/expanding-guide/expanding-guide.component';
import { AutoScrollGuideComponent } from './guides/auto-scroll-guide/auto-scroll-guide.component';

const routes: Routes = [
  {
    path: '',
    component: GettingStartedComponent,
    pathMatch: 'full',
  },
  {
    path: 'examples',
    children: [
      { path: 'basic', component: BasicUsageComponent },
      { path: 'columns', component: ColumnsExampleComponent },
      { path: 'crud', component: CrudExampleComponent },
      { path: 'loadmore', component: LoadMoreExampleComponent },
    ]
  },
  {
    path: 'guides',
    children: [
      { path: 'async', component: AsyncGuideComponent },
      { path: 'filter', component: FilterGuideComponent },
      { path: 'update', component: UpdateGuideComponent },
      { path: 'dragdrop', component: DragDropGuideComponent },
      { path: 'checkboxes', component: CheckboxesGuideComponent },
      { path: 'largetree', component: LargeTreeGuideComponent },
      { path: 'redux', component: ReduxGuideComponent },
      { path: 'rtl', component: RtlGuideComponent },
      { path: 'customfields', component: CustomFieldsGuideComponent },
      { path: 'expanding', component: ExpandingGuideComponent },
      { path: 'autoscroll', component: AutoScrollGuideComponent },
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

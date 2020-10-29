import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesComponent } from './nodes/nodes.component';
import { CodeExampleModule } from '../custom-elements/code/code-example.module';
import { OptionsComponent } from './options/options.component';
import { ActionsComponent } from './actions/actions.component';
import { TemplatesComponent } from './templates/templates.component';
import { ActionsDemoComponent } from './actions/actions-demo/actions-demo.component';
import { TreeModule } from 'angular-tree-component';
import { TemplatesDemoComponent } from './templates/templates-demo/templates-demo.component';
import { EventsComponent } from './events/events.component';
import { StateBindingComponent } from './state-binding/state-binding.component';
import { StateBindingDemoComponent } from './state-binding/state-binding-demo/state-binding-demo.component';
import { ApiComponent } from './api/api.component';
import { RouterModule } from '@angular/router';
import { ApiDemoComponent } from './api/api-demo/api-demo.component';
import { StylingComponent } from './styling/styling.component';
import { FocusComponent } from './focus/focus.component';
import { IssuesComponent } from './issues/issues.component';


@NgModule({
  declarations: [
    NodesComponent,
    OptionsComponent,
    ActionsComponent,
    TemplatesComponent,
    ActionsDemoComponent,
    TemplatesDemoComponent,
    EventsComponent,
    StateBindingComponent,
    StateBindingDemoComponent,
    ApiComponent,
    ApiDemoComponent,
    StylingComponent,
    FocusComponent,
    IssuesComponent
  ],
  imports: [
    CommonModule,
    CodeExampleModule,
    TreeModule,
    RouterModule
  ]
})
export class FundamentalsModule { }

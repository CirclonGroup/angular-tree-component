import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreeModule } from 'angular-tree-component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicTreeComponent } from './basictree/basictree.component';
import { FullTreeComponent } from './fulltree/fulltree.component';
import { TemplatesComponent } from './templates/templates.component';
import { FieldsComponent } from './fields/fields.component';
import { FilterComponent } from './filter/filter.component';
import { EmptyComponent } from './empty/empty.component';
import { RtlTreeComponent } from './rtl/rtl-tree.component';
import { AsyncTreeComponent } from './async/async.component';
import { SaveRestoreComponent } from './save-restore/save-restore.component';
import { CheckboxesComponent } from './checkboxes/checkboxes.component';
import { DragComponent } from './drag/drag.component';
import { VirtualscrollComponent } from './virtualscroll/virtualscroll.component';
import { ApiComponent } from './api/api.component';
import { ActionsComponent } from './actions/actions.component';
import { ScrollContainerComponent } from './scrollcontainer/scrollcontainer.component';
import { ContextmenuComponent } from './contextmenu/contextmenu.component';
import { DragOverStylingComponent } from './dragover-styling/dragover-styling.component';
import { DragOverStylingFullTreeComponent } from './dragover-styling/dragover-styling-full-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicTreeComponent,
    FullTreeComponent,
    TemplatesComponent,
    FieldsComponent,
    FilterComponent,
    EmptyComponent,
    RtlTreeComponent,
    AsyncTreeComponent,
    SaveRestoreComponent,
    CheckboxesComponent,
    DragComponent,
    DragOverStylingComponent,
    DragOverStylingFullTreeComponent,
    VirtualscrollComponent,
    ApiComponent,
    ActionsComponent,
    ScrollContainerComponent,
    ContextmenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TreeModule.forRoot(),
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

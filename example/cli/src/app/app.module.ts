import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TreeModule } from 'angular-tree-component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicTreeComponent } from './basictree/basictree.component';
import { FullTreeComponent } from './fulltree/fulltree.component';
import { TemplatesComponent } from './templates/templates.component';
import { FilterComponent } from './filter/filter.component';
import { FieldsComponent } from './fields/fields.component';
import { RtlTreeComponent } from './rtl/rtl-tree.component';
import { AsyncTreeComponent } from './async/async.component';
import { SaveRestoreComponent } from './save-restore/save-restore.component';
import { CheckboxesComponent } from './checkboxes/checkboxes.component';
import { DragComponent } from './drag/drag.component';

/*
  Turn on to check if tree supports strict mode in MobX.
  But remember to turn off (to allow users of MobX not to use strict mode in their apps)
*/
import { useStrict } from 'mobx';
import { EmptyComponent } from './empty/empty.component';
useStrict(true);


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
    DragComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TreeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

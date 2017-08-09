import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  {
    path: '',
    component: FullTreeComponent
  },
  {
    path: 'basic',
    component: BasicTreeComponent
  },
  {
    path: 'fields',
    component: FieldsComponent
  },
  {
    path: 'templates',
    component: TemplatesComponent
  },
  {
    path: 'filter',
    component: FilterComponent
  },
  {
    path: 'empty',
    component: EmptyComponent
  },
  {
    path: 'rtl',
    component: RtlTreeComponent
  },
  {
    path: 'async',
    component: AsyncTreeComponent
  },
  {
    path: 'save-restore',
    component: SaveRestoreComponent
  },
  {
    path: 'checkboxes',
    component: CheckboxesComponent
  },
  {
    path: 'drag',
    component: DragComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

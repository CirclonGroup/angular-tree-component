import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicUsageComponent } from './basic-usage/basic-usage.component';
import { TreeModule } from 'angular-tree-component';
import { BasicTreeComponent } from './basic-usage/basic-tree/basic-tree.component';
import { RouterModule } from '@angular/router';
import { ColumnsExampleComponent } from './columns-example/columns-example.component';
import { ColumnsComponent } from './columns-example/columns/columns.component';
import { CrudExampleComponent } from './crud-example/crud-example.component';
import { CrudComponent } from './crud-example/crud/crud.component';
import { LoadMoreExampleComponent } from './load-more-example/load-more-example.component';
import { LoadMoreComponent } from './load-more-example/load-more/load-more.component';

@NgModule({
  declarations: [BasicUsageComponent, BasicTreeComponent, ColumnsExampleComponent, ColumnsComponent, CrudExampleComponent, CrudComponent, LoadMoreExampleComponent, LoadMoreComponent],
  imports: [
    CommonModule,
    TreeModule,
    RouterModule,
  ]
})
export class ExamplesModule { }

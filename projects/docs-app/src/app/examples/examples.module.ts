import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicUsageComponent } from './basic-usage/basic-usage.component';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  declarations: [BasicUsageComponent],
  imports: [
    CommonModule,
    TreeModule
  ]
})
export class ExamplesModule { }

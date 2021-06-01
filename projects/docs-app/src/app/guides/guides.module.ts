import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncGuideComponent } from './async-guide/async-guide.component';
import { CodeExampleModule } from '../custom-elements/code/code-example.module';
import { TreeModule } from 'angular-tree-component';
import { RouterModule } from '@angular/router';
import { AsyncComponent } from './async-guide/async/async.component';
import { FilterGuideComponent } from './filter-guide/filter-guide.component';
import { FilterComponent } from './filter-guide/filter/filter.component';
import { UpdateGuideComponent } from './update-guide/update-guide.component';
import { DragDropGuideComponent } from './drag-drop-guide/drag-drop-guide.component';
import { DragDropComponent } from './drag-drop-guide/drag-drop/drag-drop.component';
import { CheckboxesGuideComponent } from './checkboxes-guide/checkboxes-guide.component';
import { CheckboxesComponent } from './checkboxes-guide/checkboxes/checkboxes.component';
import { LargeTreeGuideComponent } from './large-tree-guide/large-tree-guide.component';
import { LargeTreeComponent } from './large-tree-guide/large-tree/large-tree.component';
import { ReduxGuideComponent } from './redux-guide/redux-guide.component';
import { RtlGuideComponent } from './rtl-guide/rtl-guide.component';
import { RtlComponent } from './rtl-guide/rtl/rtl.component';
import { CustomFieldsGuideComponent } from './custom-fields-guide/custom-fields-guide.component';
import { ExpandingGuideComponent } from './expanding-guide/expanding-guide.component';
import { AutoScrollGuideComponent } from './auto-scroll-guide/auto-scroll-guide.component';
import { AutoScrollComponent } from './auto-scroll-guide/auto-scroll/auto-scroll.component';

@NgModule({
  declarations: [AsyncGuideComponent, AsyncComponent, FilterGuideComponent, FilterComponent, UpdateGuideComponent, DragDropGuideComponent, DragDropComponent, CheckboxesGuideComponent, CheckboxesComponent, LargeTreeGuideComponent, LargeTreeComponent, ReduxGuideComponent, RtlGuideComponent, RtlComponent, CustomFieldsGuideComponent, ExpandingGuideComponent, AutoScrollGuideComponent, AutoScrollComponent],
  imports: [
    CommonModule,
    CodeExampleModule,
    TreeModule,
    RouterModule
  ]
})
export class GuidesModule { }

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeMobxAutorunDirective } from './mobx-angular/tree-mobx-autorun.directive';

import {
  IActionHandler,
  IActionMapping,
  TREE_ACTIONS
} from './models/tree-options.model';
import {
  IAllowDragFn,
  IAllowDropFn,
  ITreeOptions,
  ITreeState
} from './defs/api';
import { KEYS } from './constants/keys';
import { TreeModel } from './models/tree.model';
import { TreeNode } from './models/tree-node.model';
import { TreeDraggedElement } from './models/tree-dragged-element.model';
import { TreeVirtualScroll } from './models/tree-virtual-scroll.model';
import { LoadingComponent } from './components/loading.component';
import { TreeComponent } from './components/tree.component';
import { TreeNodeComponent } from './components/tree-node.component';
import { TreeNodeContent } from './components/tree-node-content.component';
import { TreeNodeDropSlot } from './components/tree-node-drop-slot.component';
import { TreeNodeExpanderComponent } from './components/tree-node-expander.component';
import { TreeNodeChildrenComponent } from './components/tree-node-children.component';
import { TreeNodeCollectionComponent } from './components/tree-node-collection.component';
import { TreeNodeWrapperComponent } from './components/tree-node-wrapper.component';
import { TreeViewportComponent } from './components/tree-viewport.component';
import { TreeNodeCheckboxComponent } from './components/tree-node-checkbox.component';
import { TreeDropDirective } from './directives/tree-drop.directive';
import { TreeDragDirective } from './directives/tree-drag.directive';
import { TreeAnimateOpenDirective } from './directives/tree-animate-open.directive';

import './polyfills';

@NgModule({
  declarations: [
    TreeComponent,
    TreeNodeComponent,
    TreeNodeContent,
    LoadingComponent,
    TreeDropDirective,
    TreeDragDirective,
    TreeNodeExpanderComponent,
    TreeNodeChildrenComponent,
    TreeNodeDropSlot,
    TreeNodeCollectionComponent,
    TreeViewportComponent,
    TreeNodeWrapperComponent,
    TreeNodeCheckboxComponent,
    TreeAnimateOpenDirective,
    TreeMobxAutorunDirective
  ],
  exports: [
    TreeComponent,
    TreeNodeComponent,
    TreeNodeContent,
    LoadingComponent,
    TreeDropDirective,
    TreeDragDirective,
    TreeNodeExpanderComponent,
    TreeNodeChildrenComponent,
    TreeNodeDropSlot,
    TreeNodeCollectionComponent,
    TreeViewportComponent,
    TreeNodeWrapperComponent,
    TreeNodeCheckboxComponent,
    TreeAnimateOpenDirective,
    TreeMobxAutorunDirective
  ],
  imports: [CommonModule],
  providers: []
})
export class TreeModule {
  static forRoot(): ModuleWithProviders<TreeModule> {
    return {
      ngModule: TreeModule,
      providers: [TreeDraggedElement]
    };
  }
}

export {
  TreeModel,
  TreeNode,
  TreeDraggedElement,
  TreeVirtualScroll,
  ITreeOptions,
  TREE_ACTIONS,
  KEYS,
  IActionMapping,
  IActionHandler,
  IAllowDropFn,
  IAllowDragFn,
  LoadingComponent,
  TreeAnimateOpenDirective,
  TreeComponent,
  TreeNodeComponent,
  TreeNodeWrapperComponent,
  TreeNodeContent,
  TreeDropDirective,
  TreeDragDirective,
  TreeNodeExpanderComponent,
  TreeNodeChildrenComponent,
  TreeNodeDropSlot,
  TreeNodeCollectionComponent,
  TreeViewportComponent,
  TreeNodeCheckboxComponent,
  ITreeState
};

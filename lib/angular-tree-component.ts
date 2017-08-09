import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobxAngularModule } from 'mobx-angular';

import { TREE_ACTIONS, IActionMapping, IActionHandler } from './models/tree-options.model';
import { ITreeOptions, IAllowDropFn, IAllowDragFn, ITreeState } from './defs/api';
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
import { TreeDropDirective } from './directives/tree-drop.directive';
import { TreeDragDirective } from './directives/tree-drag.directive';
import { TreeAnimateOpenDirective } from './directives/tree-animate-open.directive';

import './polyfills';

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
  TreeComponent,
  TreeNodeComponent,
  TreeNodeContent,
  TreeDropDirective,
  TreeDragDirective,
  TreeNodeExpanderComponent,
  TreeNodeChildrenComponent,
  TreeNodeDropSlot,
  TreeNodeCollectionComponent,
  TreeViewportComponent,
  ITreeState
};

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
    TreeAnimateOpenDirective
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
    TreeAnimateOpenDirective
  ],
  imports: [
    CommonModule,
    MobxAngularModule
  ],
  providers: [
    TreeDraggedElement
  ]
})
export class TreeModule {}

export default TreeModule;

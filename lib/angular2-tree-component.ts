import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { BrowserModule} from '@angular/platform-browser';

import { TREE_ACTIONS, IActionMapping, IActionHandler } from './models/tree-options.model';
import { ITreeOptions, IAllowDropFn } from './defs/api';
import { IAllowEditFn } from './defs/api';
import { KEYS } from './constants/keys';
import { TreeModel } from './models/tree.model';
import { TreeNode } from './models/tree-node.model';
import { TreeDraggedElement } from './models/tree-dragged-element.model';
import { LoadingComponent } from './components/loading.component';
import { LoadingComponent as DeprecatedLoadingComponent } from './components/deprecated-loading.component';
import { TreeComponent } from './components/tree.component';
import { TreeNodeComponent } from './components/tree-node.component';
import { TreeNodeContent } from './components/tree-node-content.component';
import { TreeNodeContent as DeprecatedTreeNodeContent } from './components/deprecated-tree-node-content.component';
import { TreeNodeDropSlot } from './components/tree-node-drop-slot.component';
import { TreeNodeExpanderComponent } from './components/tree-node-expander.component';
import { TreeNodeChildrenComponent } from './components/tree-node-children.component';
import { TreeDropDirective } from './directives/tree-drop.directive';
import { TreeDragDirective } from './directives/tree-drag.directive';
import { FocusInputDirective } from './directives/focus-input.directive';
import { AdHocComponentFactoryCreator } from './components/adhoc-component-factory.service';

import './polyfills';
import { deprecated } from './deprecated';

const exportedDirectives = [
  TreeComponent,
  TreeNodeComponent,
  TreeNodeContent,
  TreeDropDirective,
  TreeDragDirective,
  FocusInputDirective,
  TreeNodeExpanderComponent,
  TreeNodeChildrenComponent,
  TreeNodeDropSlot
];

export {
  TreeModel,
  TreeNode,
  TreeDraggedElement,
  ITreeOptions,
  TREE_ACTIONS,
  KEYS,
  IActionMapping,
  IActionHandler,
  IAllowDropFn,
  IAllowEditFn,
  LoadingComponent,
  TreeComponent,
  TreeNodeComponent,
  TreeNodeContent,
  TreeDropDirective,
  TreeDragDirective,
  FocusInputDirective,
  TreeNodeExpanderComponent,
  TreeNodeChildrenComponent,
  TreeNodeDropSlot
};

@NgModule({
  declarations: [
    LoadingComponent,
    ...exportedDirectives
  ],
  exports: [
    ...exportedDirectives
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  providers: [
    TreeDraggedElement
  ]
})
export class TreeModule {}
@NgModule({
  declarations: [
    DeprecatedLoadingComponent,
    DeprecatedTreeNodeContent
  ],
  exports: [
    TreeComponent,
    TreeDropDirective,
    TreeDragDirective,
    FocusInputDirective
  ],
  imports: [
    CommonModule,
    TreeModule
  ],
  providers: [
    AdHocComponentFactoryCreator
  ]
})
export class DeprecatedTreeModule {
  constructor() {
    deprecated('DeprecatedTreeModule', 'TreeModule for AoT compilation');
  }
}
export default TreeModule;

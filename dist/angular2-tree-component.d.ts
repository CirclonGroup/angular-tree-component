import { TREE_ACTIONS, IActionMapping, IActionHandler } from './models/tree-options.model';
import { ITreeOptions, IAllowDropFn } from './defs/api';
import { KEYS } from './constants/keys';
import { TreeModel } from './models/tree.model';
import { TreeNode } from './models/tree-node.model';
import { TreeDraggedElement } from './models/tree-dragged-element.model';
import { LoadingComponent } from './components/loading.component';
import { TreeComponent } from './components/tree.component';
import { TreeNodeComponent } from './components/tree-node.component';
import { TreeNodeContent } from './components/tree-node-content.component';
import { TreeNodeDropSlot } from './components/tree-node-drop-slot.component';
import { TreeNodeExpanderComponent } from './components/tree-node-expander.component';
import { TreeNodeChildrenComponent } from './components/tree-node-children.component';
import { TreeDropDirective } from './directives/tree-drop.directive';
import { TreeDragDirective } from './directives/tree-drag.directive';
import './polyfills';
export { TreeModel, TreeNode, TreeDraggedElement, ITreeOptions, TREE_ACTIONS, KEYS, IActionMapping, IActionHandler, IAllowDropFn, LoadingComponent, TreeComponent, TreeNodeComponent, TreeNodeContent, TreeDropDirective, TreeDragDirective, TreeNodeExpanderComponent, TreeNodeChildrenComponent, TreeNodeDropSlot };
export declare class TreeModule {
}
export declare class DeprecatedTreeModule {
    constructor();
}
export default TreeModule;

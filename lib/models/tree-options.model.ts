import { TreeNode } from './tree-node.model';
import { TreeModel } from './tree.model';
import { KEYS } from '../constants/keys';
import { deprecated } from '../deprecated';
import { ITreeOptions } from '../defs/api';

import { defaultsDeep, get } from 'lodash';

export interface IActionHandler {
  (tree: TreeModel, node: TreeNode, $event: any, ...rest);
}

export const TREE_ACTIONS = {
  TOGGLE_SELECTED: (tree: TreeModel, node: TreeNode, $event: any) => node.toggleActivated(),
  TOGGLE_SELECTED_MULTI: (tree: TreeModel, node: TreeNode, $event: any) => node.toggleActivated(true),
  SELECT: (tree: TreeModel, node: TreeNode, $event: any) => node.setIsActive(true),
  DESELECT: (tree: TreeModel, node: TreeNode, $event: any) => node.setIsActive(false),
  FOCUS: (tree: TreeModel, node: TreeNode, $event: any) => node.focus(),
  TOGGLE_EXPANDED: (tree: TreeModel, node: TreeNode, $event: any) => node.hasChildren && node.toggleExpanded(),
  EXPAND: (tree: TreeModel, node: TreeNode, $event: any) => node.expand(),
  COLLAPSE: (tree: TreeModel, node: TreeNode, $event: any) => node.collapse(),
  DRILL_DOWN: (tree: TreeModel, node: TreeNode, $event: any) => tree.focusDrillDown(),
  DRILL_UP: (tree: TreeModel, node: TreeNode, $event: any) => tree.focusDrillUp(),
  NEXT_NODE: (tree: TreeModel, node: TreeNode, $event: any) =>  tree.focusNextNode(),
  PREVIOUS_NODE: (tree: TreeModel, node: TreeNode, $event: any) =>  tree.focusPreviousNode(),
  MOVE_NODE: (tree: TreeModel, node: TreeNode, $event: any, {from , to}: {from: any, to: any}) => {
    // default action assumes from = node, to = {parent, index}
    tree.moveNode(from, to);
  }
};

const defaultActionMapping: IActionMapping = {
  mouse: {
    click: TREE_ACTIONS.TOGGLE_SELECTED,
    dblClick: null,
    contextMenu: null,
    expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,
    drop: TREE_ACTIONS.MOVE_NODE
  },
  keys: {
    [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,
    [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,
    [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,
    [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,
    [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_SELECTED,
    [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_SELECTED
  }
};

export interface IActionMapping {
  mouse?: {
    click?: IActionHandler,
    dblClick?: IActionHandler,
    contextMenu?: IActionHandler,
    expanderClick?: IActionHandler,
    dragStart?: IActionHandler,
    drag?: IActionHandler,
    dragEnd?: IActionHandler,
    dragOver?: IActionHandler,
    drop?: IActionHandler
  };
  keys?: {
    [key: number]: IActionHandler
  };
}

export class TreeOptions {
  get childrenField(): string { return this.options.childrenField || 'children'; }
  get displayField(): string { return this.options.displayField || 'name'; }
  get idField(): string { return this.options.idField || 'id'; }
  get isExpandedField(): string { return this.options.isExpandedField || 'isExpanded'; }
  get isHiddenField(): string { return this.options.isHiddenField || 'isHidden'; }
  get treeNodeTemplate(): any { return this.options.treeNodeTemplate; }
  get loadingComponent(): any { return this.options.loadingComponent; }
  get getChildren(): any { return this.options.getChildren; }
  get hasCustomContextMenu(): boolean { return this.options.hasCustomContextMenu; }
  get context(): any { return this.options.context; }
  get allowDrag(): boolean { return this.options.allowDrag; }
  get levelPadding(): number { return this.options.levelPadding || 0; }
  actionMapping: IActionMapping;

  constructor(private options: ITreeOptions = {}) {
    this.actionMapping = defaultsDeep(this.options.actionMapping, defaultActionMapping);

    if (options.hasCustomContextMenu) {
      deprecated('hasCustomContextMenu', 'actionMapping: mouse: contextMenu');
    }

    if (options.context) {
      deprecated('context', `
        values directly in a template in the content of the <Tree> component like this:
        <Tree><template #treeNodeTemplate let-node>{{ outsideValue }}</template></Tree>.
        If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule
      `);
    }

    if (options.treeNodeTemplate) {
      deprecated('treeNodeTemplate', `
        a template in the content of the <Tree> component like this:
        <Tree><template #treeNodeTemplate let-node>...</template></Tree>.
        If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule`
      );
    }

    if (options.loadingComponent) {
      deprecated('loadingComponent', `a template in the content of the <Tree> component like this:
        <Tree><template #loadingTemplate>...</template></Tree>.
        If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule`
      );
    }

    if (get(options, 'mouse.shift')) {
      deprecated('mouse.shift', '$event.shiftKey in click action instead');
    }

    if (get(options, 'mouse.ctrl')) {
      deprecated('mouse.ctrl', '$event.ctrlKey in click action instead');
    }

    if (get(options, 'mouse.alt')) {
      deprecated('mouse.alt', '$event.altKey in click action instead');
    }
  }
  allowDrop(element, to): boolean {
    if (this.options.allowDrop instanceof Function) {
      return this.options.allowDrop(element, to);
    }
    else {
      return this.options.allowDrop === undefined ? true : this.options.allowDrop;
    }
  }
  allowEdit(node): boolean {
    if (this.options.allowEdit instanceof Function) {
      return this.options.allowEdit(node);
    }
    else {
      return this.options.allowEdit === undefined ? true : this.options.allowEdit;
    }
  }
  nodeClass(node: TreeNode): string {
    return this.options.nodeClass ? this.options.nodeClass(node) : '';
  }
}

import { TreeNode } from './tree-node.model';
import { TreeModel } from './tree.model';
import { ITreeOptions } from '../defs/api';
export interface IActionHandler {
  (tree: TreeModel, node: TreeNode, $event: any, ...rest: any[]): any;
}
export declare const TREE_ACTIONS: {
  TOGGLE_ACTIVE: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
  TOGGLE_ACTIVE_MULTI: (
    tree: TreeModel,
    node: TreeNode,
    $event: any
  ) => TreeNode;
  TOGGLE_SELECTED: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
  ACTIVATE: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
  DEACTIVATE: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
  SELECT: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
  DESELECT: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
  FOCUS: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
  TOGGLE_EXPANDED: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
  EXPAND: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
  COLLAPSE: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
  DRILL_DOWN: (tree: TreeModel, node: TreeNode, $event: any) => void;
  DRILL_UP: (tree: TreeModel, node: TreeNode, $event: any) => void;
  NEXT_NODE: (tree: TreeModel, node: TreeNode, $event: any) => void;
  PREVIOUS_NODE: (tree: TreeModel, node: TreeNode, $event: any) => void;
  MOVE_NODE: (
    tree: TreeModel,
    node: TreeNode,
    $event: any,
    {
      from,
      to
    }: {
      from: any;
      to: any;
    }
  ) => void;
};
export interface IActionMapping {
  mouse?: {
    click?: IActionHandler;
    dblClick?: IActionHandler;
    contextMenu?: IActionHandler;
    expanderClick?: IActionHandler;
    checkboxClick?: IActionHandler;
    dragStart?: IActionHandler;
    drag?: IActionHandler;
    dragEnd?: IActionHandler;
    dragOver?: IActionHandler;
    dragLeave?: IActionHandler;
    dragEnter?: IActionHandler;
    drop?: IActionHandler;
    mouseOver?: IActionHandler;
    mouseOut?: IActionHandler;
  };
  keys?: {
    [key: number]: IActionHandler;
  };
}
export declare class TreeOptions {
  private options;
  readonly hasChildrenField: string;
  readonly childrenField: string;
  readonly displayField: string;
  readonly idField: string;
  readonly isExpandedField: string;
  readonly getChildren: any;
  readonly levelPadding: number;
  readonly useVirtualScroll: boolean;
  readonly animateExpand: boolean;
  readonly animateSpeed: number;
  readonly animateAcceleration: number;
  readonly scrollOnActivate: boolean;
  readonly rtl: boolean;
  readonly rootId: any;
  readonly useCheckbox: boolean;
  readonly useTriState: boolean;
  readonly scrollContainer: HTMLElement;
  readonly allowDragoverStyling: boolean;
  actionMapping: IActionMapping;
  constructor(options?: ITreeOptions);
  getNodeClone(node: TreeNode): any;
  allowDrop(element: any, to: any, $event?: any): boolean;
  allowDrag(node: TreeNode): boolean;
  nodeClass(node: TreeNode): string;
  nodeHeight(node: TreeNode): number;
  readonly dropSlotHeight: number;
}

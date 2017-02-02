import { TreeNode } from './tree-node.model';
import { TreeModel } from './tree.model';
import { ITreeOptions } from '../defs/api';
export interface IActionHandler {
    (tree: TreeModel, node: TreeNode, $event: any, ...rest: any[]): any;
}
export declare const TREE_ACTIONS: {
    TOGGLE_SELECTED: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
    TOGGLE_SELECTED_MULTI: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
    SELECT: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
    DESELECT: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
    FOCUS: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
    TOGGLE_EXPANDED: (tree: TreeModel, node: TreeNode, $event: any) => any;
    EXPAND: (tree: TreeModel, node: TreeNode, $event: any) => any;
    COLLAPSE: (tree: TreeModel, node: TreeNode, $event: any) => TreeNode;
    DRILL_DOWN: (tree: TreeModel, node: TreeNode, $event: any) => void;
    DRILL_UP: (tree: TreeModel, node: TreeNode, $event: any) => void;
    NEXT_NODE: (tree: TreeModel, node: TreeNode, $event: any) => void;
    PREVIOUS_NODE: (tree: TreeModel, node: TreeNode, $event: any) => void;
    MOVE_NODE: (tree: TreeModel, node: TreeNode, $event: any, {from, to}: {
        from: any;
        to: any;
    }) => void;
};
export interface IActionMapping {
    mouse?: {
        click?: IActionHandler;
        dblClick?: IActionHandler;
        contextMenu?: IActionHandler;
        expanderClick?: IActionHandler;
        dragStart?: IActionHandler;
        drag?: IActionHandler;
        dragEnd?: IActionHandler;
        dragOver?: IActionHandler;
        drop?: IActionHandler;
    };
    keys?: {
        [key: number]: IActionHandler;
    };
}
export declare class TreeOptions {
    private options;
    readonly childrenField: string;
    readonly displayField: string;
    readonly idField: string;
    readonly isExpandedField: string;
    readonly isHiddenField: string;
    readonly treeNodeTemplate: any;
    readonly loadingComponent: any;
    readonly getChildren: any;
    readonly hasCustomContextMenu: boolean;
    readonly context: any;
    readonly allowDrag: boolean;
    readonly levelPadding: number;
    actionMapping: IActionMapping;
    constructor(options?: ITreeOptions);
    allowDrop(element: any, to: any): boolean;
    nodeClass(node: TreeNode): string;
}

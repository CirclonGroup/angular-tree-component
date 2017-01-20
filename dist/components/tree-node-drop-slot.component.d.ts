import { TreeNode } from '../models/tree-node.model';
export declare class TreeNodeDropSlot {
    node: TreeNode;
    dropIndex: number;
    constructor();
    onDrop($event: any): void;
    allowDrop(element: any): boolean;
}

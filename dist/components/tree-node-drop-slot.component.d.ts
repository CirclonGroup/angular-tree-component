import { TreeNode } from '../models/tree-node.model';
export declare class TreeNodeDropSlot {
  node: TreeNode;
  dropIndex: number;
  onDrop($event: any): void;
  allowDrop(element: any, $event: any): boolean;
}

import { TreeModel } from './tree.model';
export declare class TreeVirtualScroll {
  private treeModel;
  private _dispose;
  yBlocks: number;
  x: number;
  viewportHeight: any;
  viewport: any;
  readonly y: number;
  readonly totalHeight: number;
  constructor(treeModel: TreeModel);
  fireEvent(event: any): void;
  init(): void;
  isEnabled(): boolean;
  private _setYBlocks;
  recalcPositions(): void;
  private _getPositionAfter;
  private _getPositionAfterNode;
  clear(): void;
  setViewport(viewport: any): void;
  scrollIntoView(node: any, force: any, scrollToMiddle?: boolean): void;
  getViewportNodes(nodes: any): any;
  fixScroll(): void;
}

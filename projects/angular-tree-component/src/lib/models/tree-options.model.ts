import { TreeNode } from './tree-node.model';
import { TreeModel } from './tree.model';
import { KEYS } from '../constants/keys';
import { ITreeOptions } from '../defs/api';

export interface IActionHandler {
  (tree: TreeModel, node: TreeNode, $event: any, ...rest);
}

export const TREE_ACTIONS = {
  TOGGLE_ACTIVE: (tree: TreeModel, node: TreeNode, $event: any) => node && node.toggleActivated(),
  TOGGLE_ACTIVE_MULTI: (tree: TreeModel, node: TreeNode, $event: any) => node && node.toggleActivated(true),
  TOGGLE_SELECTED: (tree: TreeModel, node: TreeNode, $event: any) => node && node.toggleSelected(),
  ACTIVATE: (tree: TreeModel, node: TreeNode, $event: any) => node.setIsActive(true),
  DEACTIVATE: (tree: TreeModel, node: TreeNode, $event: any) => node.setIsActive(false),
  SELECT: (tree: TreeModel, node: TreeNode, $event: any) => node.setIsSelected(true),
  DESELECT: (tree: TreeModel, node: TreeNode, $event: any) => node.setIsSelected(false),
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
    if ($event.ctrlKey) {
      tree.copyNode(from, to);
    } else {
      tree.moveNode(from, to);
    }
  }
};

const defaultActionMapping: IActionMapping = {
  mouse: {
    click: TREE_ACTIONS.TOGGLE_ACTIVE,
    dblClick: null,
    contextMenu: null,
    expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,
    checkboxClick: TREE_ACTIONS.TOGGLE_SELECTED,
    drop: TREE_ACTIONS.MOVE_NODE
  },
  keys: {
    [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,
    [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,
    [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,
    [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,
    [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_ACTIVE,
    [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_ACTIVE
  }
};

export interface IActionMapping {
  mouse?: {
    click?: IActionHandler,
    dblClick?: IActionHandler,
    contextMenu?: IActionHandler,
    expanderClick?: IActionHandler,
    checkboxClick?: IActionHandler,
    dragStart?: IActionHandler,
    drag?: IActionHandler,
    dragEnd?: IActionHandler,
    dragOver?: IActionHandler,
    dragLeave?: IActionHandler,
    dragEnter?: IActionHandler,
    drop?: IActionHandler,
    mouseOver?: IActionHandler,
    mouseOut?: IActionHandler
  };
  keys?: {
    [key: number]: IActionHandler
  };
}

export class TreeOptions {
  get hasChildrenField(): string { return this.options.hasChildrenField || 'hasChildren'; }
  get childrenField(): string { return this.options.childrenField || 'children'; }
  get displayField(): string { return this.options.displayField || 'name'; }
  get idField(): string { return this.options.idField || 'id'; }
  get isExpandedField(): string { return this.options.isExpandedField || 'isExpanded'; }
  get getChildren(): any { return this.options.getChildren; }
  get levelPadding(): number { return this.options.levelPadding || 0; }
  get useVirtualScroll(): boolean { return this.options.useVirtualScroll; }
  get animateExpand(): boolean { return this.options.animateExpand; }
  get animateSpeed(): number { return this.options.animateSpeed || 1; }
  get animateAcceleration(): number { return this.options.animateAcceleration || 1.2; }
  get scrollOnActivate(): boolean { return this.options.scrollOnActivate === undefined ? true : this.options.scrollOnActivate; }
  get rtl(): boolean { return !!this.options.rtl; }
  get rootId(): any {return this.options.rootId; }
  get useCheckbox(): boolean { return this.options.useCheckbox; }
  get useTriState(): boolean { return this.options.useTriState === undefined ? true : this.options.useTriState; }
  get scrollContainer(): HTMLElement { return this.options.scrollContainer; }
  get allowDragoverStyling(): boolean { return this.options.allowDragoverStyling === undefined ? true : this.options.allowDragoverStyling; }
  actionMapping: IActionMapping;

  constructor(private options: ITreeOptions = {}) {
    this.actionMapping = {
      mouse: {
        click: this.options?.actionMapping?.mouse?.click ?? defaultActionMapping.mouse.click,
        dblClick: this.options?.actionMapping?.mouse?.dblClick ?? defaultActionMapping.mouse.dblClick,
        contextMenu: this.options?.actionMapping?.mouse?.contextMenu ?? defaultActionMapping.mouse.contextMenu,
        expanderClick: this.options?.actionMapping?.mouse?.expanderClick ?? defaultActionMapping.mouse.expanderClick,
        checkboxClick: this.options?.actionMapping?.mouse?.checkboxClick ?? defaultActionMapping.mouse.checkboxClick,
        drop: this.options?.actionMapping?.mouse?.drop ?? defaultActionMapping.mouse.drop,
        dragStart: this.options?.actionMapping?.mouse?.dragStart ?? undefined,
        drag: this.options?.actionMapping?.mouse?.drag ?? undefined,
        dragEnd: this.options?.actionMapping?.mouse?.dragEnd ?? undefined,
        dragOver: this.options?.actionMapping?.mouse?.dragOver ?? undefined,
        dragLeave: this.options?.actionMapping?.mouse?.dragLeave ?? undefined,
        dragEnter: this.options?.actionMapping?.mouse?.dragEnter ?? undefined,
        mouseOver: this.options?.actionMapping?.mouse?.mouseOver ?? undefined,
        mouseOut: this.options?.actionMapping?.mouse?.mouseOut ?? undefined,
      },
      keys: {
        [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,
        [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,
        [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,
        [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,
        [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_ACTIVE,
        [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_ACTIVE
      }
    }

    if (this.options?.actionMapping?.keys) {
      this.actionMapping.keys = {
        ...this.actionMapping.keys,
        ...this.options.actionMapping.keys
      }
    }

    if (options.rtl) {
      this.actionMapping.keys[KEYS.RIGHT] = <IActionHandler>options.actionMapping?.keys[KEYS.RIGHT] || TREE_ACTIONS.DRILL_UP;
      this.actionMapping.keys[KEYS.LEFT] = <IActionHandler>options.actionMapping?.keys[KEYS.LEFT] || TREE_ACTIONS.DRILL_DOWN;
    }
  }

  getNodeClone(node: TreeNode): any {
    if (this.options.getNodeClone) {
      return this.options.getNodeClone(node);
    }

    // remove id from clone
    // keeping ie11 compatibility
    const nodeClone = Object.assign({}, node.data);
    if (nodeClone.id) {
      delete nodeClone.id;
    }
    return nodeClone;
  }

  allowDrop(element, to, $event?): boolean {
    if (this.options.allowDrop instanceof Function) {
      return this.options.allowDrop(element, to, $event);
    }
    else {
      return this.options.allowDrop === undefined ? true : this.options.allowDrop;
    }
  }

  allowDrag(node: TreeNode): boolean {
    if (this.options.allowDrag instanceof Function) {
      return this.options.allowDrag(node);
    } else {
      return this.options.allowDrag;
    }
  }

  nodeClass(node: TreeNode): string {
    return this.options.nodeClass ? this.options.nodeClass(node) : '';
  }

  nodeHeight(node: TreeNode): number {
    if (node.data.virtual) {
      return 0;
    }

    let nodeHeight = this.options.nodeHeight || 22;

    if (typeof nodeHeight === 'function') {
      nodeHeight = nodeHeight(node);
    }

    // account for drop slots:
    return nodeHeight + (node.index === 0 ?  2 : 1) * this.dropSlotHeight;
  }

  get dropSlotHeight(): number {
    return typeof this.options.dropSlotHeight === 'number' ? this.options.dropSlotHeight : 2;
  }
}

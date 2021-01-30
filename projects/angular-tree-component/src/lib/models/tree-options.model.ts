import { TreeNode } from './tree-node.model';
import { TreeModel } from './tree.model';
import { KEYS } from '../constants/keys';
import { DragToSpot, IDType, ITreeOptions } from '../defs/api';

import { defaultsDeep, get, isNumber, clone } from 'lodash-es';

export interface IActionHandler<E extends Event, T = never> {
  (tree: TreeModel, node: TreeNode, $event: E, ...rest: T[]): any;
}
export interface IMouseActionHandler<T = never> extends IActionHandler<MouseEvent, T> { }
export interface IKeyboardActionHandler<T = never> extends IActionHandler<KeyboardEvent, T> { }

export const TREE_ACTIONS = {
  TOGGLE_ACTIVE: (tree: TreeModel, node: TreeNode, $event: Event) => node && node.toggleActivated(),
  TOGGLE_ACTIVE_MULTI: (tree: TreeModel, node: TreeNode, $event: Event) => node && node.toggleActivated(true),
  TOGGLE_SELECTED: (tree: TreeModel, node: TreeNode, $event: Event) => node && node.toggleSelected(),
  ACTIVATE: (tree: TreeModel, node: TreeNode, $event: Event) => node.setIsActive(true),
  DEACTIVATE: (tree: TreeModel, node: TreeNode, $event: Event) => node.setIsActive(false),
  SELECT: (tree: TreeModel, node: TreeNode, $event: Event) => node.setIsSelected(true),
  DESELECT: (tree: TreeModel, node: TreeNode, $event: Event) => node.setIsSelected(false),
  FOCUS: (tree: TreeModel, node: TreeNode, $event: Event) => node.focus(),
  TOGGLE_EXPANDED: (tree: TreeModel, node: TreeNode, $event: Event) => node.hasChildren && node.toggleExpanded(),
  EXPAND: (tree: TreeModel, node: TreeNode, $event: Event) => node.expand(),
  COLLAPSE: (tree: TreeModel, node: TreeNode, $event: Event) => node.collapse(),
  DRILL_DOWN: (tree: TreeModel, node: TreeNode, $event: Event) => tree.focusDrillDown(),
  DRILL_UP: (tree: TreeModel, node: TreeNode, $event: Event) => tree.focusDrillUp(),
  NEXT_NODE: (tree: TreeModel, node: TreeNode, $event: Event) => tree.focusNextNode(),
  PREVIOUS_NODE: (tree: TreeModel, node: TreeNode, $event: Event) => tree.focusPreviousNode(),
  MOVE_NODE: (tree: TreeModel, node: TreeNode, $event: MouseEvent, { from, to }: { from: TreeNode, to: DragToSpot }) => {
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
    click?: IMouseActionHandler,
    dblClick?: IMouseActionHandler,
    contextMenu?: IMouseActionHandler,
    expanderClick?: IMouseActionHandler,
    checkboxClick?: IMouseActionHandler,
    dragStart?: IMouseActionHandler,
    drag?: IMouseActionHandler,
    dragEnd?: IMouseActionHandler,
    dragOver?: IMouseActionHandler,
    dragLeave?: IMouseActionHandler,
    dragEnter?: IMouseActionHandler,
    drop?: IMouseActionHandler,
    mouseOver?: IMouseActionHandler,
    mouseOut?: IMouseActionHandler
  };
  keys?: {
    [key: number]: IKeyboardActionHandler
  };
}

export class TreeOptions {
  get hasChildrenField(): string { return this.options.hasChildrenField || 'hasChildren'; }
  get childrenField(): string { return this.options.childrenField || 'children'; }
  get displayField(): string { return this.options.displayField || 'name'; }
  get idField(): string { return this.options.idField || 'id'; }
  get isExpandedField(): string { return this.options.isExpandedField || 'isExpanded'; }
  get getChildren(): (node: TreeNode) => TreeNode[] | Promise<TreeNode[]> { return this.options.getChildren; }
  get levelPadding(): number { return this.options.levelPadding || 0; }
  get useVirtualScroll(): boolean { return this.options.useVirtualScroll; }
  get animateExpand(): boolean { return this.options.animateExpand; }
  get animateSpeed(): number { return this.options.animateSpeed || 1; }
  get animateAcceleration(): number { return this.options.animateAcceleration || 1.2; }
  get scrollOnActivate(): boolean { return this.options.scrollOnActivate === undefined ? true : this.options.scrollOnActivate; }
  get rtl(): boolean { return !!this.options.rtl; }
  get rootId(): IDType { return this.options.rootId; }
  get useCheckbox(): boolean { return this.options.useCheckbox; }
  get useTriState(): boolean { return this.options.useTriState === undefined ? true : this.options.useTriState; }
  get scrollContainer(): HTMLElement { return this.options.scrollContainer; }
  get allowDragoverStyling(): boolean { return this.options.allowDragoverStyling === undefined ? true : this.options.allowDragoverStyling; }
  actionMapping: IActionMapping;

  constructor(private options: ITreeOptions = {}) {
    this.actionMapping = defaultsDeep({}, this.options.actionMapping, defaultActionMapping);
    if (options.rtl) {
      this.actionMapping.keys[KEYS.RIGHT] = get(options, ['actionMapping', 'keys', KEYS.RIGHT]) || TREE_ACTIONS.DRILL_UP;
      this.actionMapping.keys[KEYS.LEFT] = get(options, ['actionMapping', 'keys', KEYS.LEFT]) || TREE_ACTIONS.DRILL_DOWN;
    }
  }

  getNodeClone<T>(node: TreeNode<T>): T {
    if (this.options.getNodeClone) {
      return this.options.getNodeClone(node);
    }

    const clonedData: T = clone(node.data);
    delete clonedData[this.options.idField];
    return clonedData;
  }

  allowDrop(element: TreeNode, to: DragToSpot, $event?: DragEvent): boolean {
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
    return nodeHeight + (node.index === 0 ? 2 : 1) * this.dropSlotHeight;
  }

  get dropSlotHeight(): number {
    return isNumber(this.options.dropSlotHeight) ? this.options.dropSlotHeight : 2;
  }
}

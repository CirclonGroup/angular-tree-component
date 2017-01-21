import { ElementRef } from '@angular/core';
import { TreeModel } from './tree.model';
import { TreeOptions } from './tree-options.model';
import { ITreeNode } from '../defs/api';
import { TREE_EVENTS } from '../constants/events';
import { deprecated } from '../deprecated';

import * as _ from 'lodash';

export class TreeNode implements ITreeNode {
  get isHidden() { return this.getField('isHidden') };
  set isHidden(value) { this.setField('isHidden', value) };
  get isExpanded() { return this.treeModel.isExpanded(this) };
  get isActive() { return this.treeModel.isActive(this) };
  get isFocused() { return this.treeModel.isNodeFocused(this) };

  level: number;
  path: string[];
  elementRef:ElementRef;
  children: TreeNode[];
  allowDrop: (any) => boolean;

  private _originalNode: any;
  get originalNode() { return this._originalNode };

  constructor(public data:any, public parent:TreeNode, public treeModel:TreeModel) {
    this.id = this.id || uuid(); // Make sure there's a unique ID
    this.level = this.parent ? this.parent.level + 1 : 0;
    this.path = this.parent ? [...this.parent.path, this.id] : [];

    if (this.getField('children')) {
      this._initChildren();
    }

    this.allowDrop = this.allowDropUnbound.bind(this);
  }

  // helper get functions:
  get hasChildren():boolean {
    return !!(this.data.hasChildren || (this.children && this.children.length > 0));
  }
  get isCollapsed():boolean { return !this.isExpanded }
  get isLeaf():boolean { return !this.hasChildren }
  get isRoot():boolean { return this.parent.data.virtual }
  get realParent():TreeNode { return this.isRoot ? null : this.parent }

  // proxy functions:
  get options(): TreeOptions { return this.treeModel.options }
  fireEvent(event) { this.treeModel.fireEvent(event) }
  get context():any { return this.options.context }

  // field accessors:
  get displayField() {
    return this.getField('display');
  }

  get id() {
    return this.getField('id');
  }

  set id(value) {
    this.setField('id', value);
  }

  getField(key) {
    return this.data[this.options[`${key}Field`]];
  }

  setField(key, value) {
    this.data[this.options[`${key}Field`]] = value;
  }

  // traversing:
  _findAdjacentSibling(steps, skipHidden = false) {
    const index = this.getIndexInParent(skipHidden);
    return this._getParentsChildren(skipHidden)[index + steps];
  }

  findNextSibling(skipHidden = false) {
    return this._findAdjacentSibling(+1, skipHidden);
  }

  findPreviousSibling(skipHidden = false) {
    return this._findAdjacentSibling(-1, skipHidden);
  }

  getVisibleChildren() {
    return (this.children || []).filter((node) => !node.isHidden);
  }

  getFirstChild(skipHidden = false) {
    let children = skipHidden ? this.getVisibleChildren() : this.children;

    return _.first(children || []);
  }

  getLastChild(skipHidden = false) {
    let children = skipHidden ? this.getVisibleChildren() : this.children;

    return _.last(children || []);
  }

  findNextNode(goInside = true, skipHidden = false) {
    return goInside && this.isExpanded && this.getFirstChild(skipHidden) ||
           this.findNextSibling(skipHidden) ||
           this.parent && this.parent.findNextNode(false, skipHidden);
  }

  findPreviousNode(skipHidden = false) {
    let previousSibling = this.findPreviousSibling(skipHidden);
    if (!previousSibling) {
      return this.realParent
    }
    return previousSibling._getLastOpenDescendant(skipHidden);
  }

  _getLastOpenDescendant(skipHidden = false) {
    const lastChild = this.getLastChild(skipHidden);
    return (this.isCollapsed || !lastChild)
      ? this
      : lastChild._getLastOpenDescendant(skipHidden);
  }

  private _getParentsChildren(skipHidden = false):any[] {
    const children = this.parent &&
      (skipHidden ? this.parent.getVisibleChildren() : this.parent.children);

    return children || [];
  }

  private getIndexInParent(skipHidden = false) {
    return this._getParentsChildren(skipHidden).indexOf(this);
  }

  isDescendantOf(node:TreeNode) {
    if (this === node) return true;
    else return this.parent && this.parent.isDescendantOf(node);
  }

  getNodePadding():string {
    return this.options.levelPadding * (this.level - 1) + 'px';
  }

  getClass():string {
    return this.options.nodeClass(this);
  }

  onDrop($event) {
    this.mouseAction('drop', $event.event, {
      from: $event.element,
      to: { parent: this, index: 0 }
    });
  }

  allowDropUnbound(element) {
    return this.options.allowDrop(element, { parent: this, index: 0 });
  }


  // helper methods:
  loadChildren() {
    if (!this.options.getChildren) {
      throw new Error('Node doesn\'t have children, or a getChildren method');
    }
    return Promise.resolve(this.options.getChildren(this))
      .then((children) => {
        if (children) {
          this.setField('children', children);
          this._initChildren();
          this.children.forEach((child) => {
            if (child.getField('isExpanded') && child.hasChildren) {
              child.expand();
            }
          });

        }
      });
  }

  expand() {
    if (!this.isExpanded) {
      return this.toggleExpanded();
    }

    return Promise.resolve();
  }

  collapse() {
    if (this.isExpanded) {
      this.toggleExpanded();
    }

    return this;
  }

  ensureVisible() {
    if (this.realParent) {
      this.realParent.expand();
      this.realParent.ensureVisible();
    }

    return this;
  }

  toggle() {
    deprecated('toggle', 'toggleExpanded');
    return this.toggleExpanded();
  }

  toggleExpanded() {
    return this.setIsExpanded(!this.isExpanded)
      .then(() => {
        this.fireEvent({ eventName: TREE_EVENTS.onToggle, warning: 'this event is deprecated, please use onToggleExpanded instead', node: this, isExpanded: this.isExpanded });
        this.fireEvent({ eventName: TREE_EVENTS.onToggleExpanded, node: this, isExpanded: this.isExpanded });
      });
  }

  setIsExpanded(value) {
    this.treeModel.setExpandedNode(this, value);

    let promise = null;
    if (!this.children && this.hasChildren && value) {
      promise = this.loadChildren();
    }

    return promise ? promise : Promise.resolve();
  };

  setIsActive(value, multi = false) {
    this.treeModel.setActiveNode(this, value, multi);
    if (value) {
      this.focus();
    }

    return this;
  }

  toggleActivated(multi = false) {
    this.setIsActive(!this.isActive, multi);

    return this;
  }

  setActiveAndVisible(multi = false) {
    this.setIsActive(true, multi)
      .ensureVisible();

    setTimeout(this.scrollIntoView.bind(this));

    return this;
  }

  scrollIntoView() {
    if (this.elementRef) {
      const nativeElement = this.elementRef.nativeElement;
      nativeElement.scrollIntoViewIfNeeded && nativeElement.scrollIntoViewIfNeeded();

      return this;
    }
  }

  focus() {
    let previousNode = this.treeModel.getFocusedNode();
    this.treeModel.setFocusedNode(this);
    this.scrollIntoView();
    if (previousNode) {
      this.fireEvent({ eventName: TREE_EVENTS.onBlur, node: previousNode });
    }
    this.fireEvent({ eventName: TREE_EVENTS.onFocus, node: this });

    return this;
  }

  blur() {
    let previousNode = this.treeModel.getFocusedNode();
    this.treeModel.setFocusedNode(null);
    if (previousNode) {
      this.fireEvent({ eventName: TREE_EVENTS.onBlur, node: this });
    }

    return this;
  }

  filter(filterFn, autoShow = false) {
    let isVisible = filterFn(this);

    if (this.children) {
      this.children.forEach((child) => {
        child.filter(filterFn, autoShow);
        isVisible = isVisible || !child.isHidden;
      });
    }

    this.isHidden = !isVisible;
    if (autoShow) {
      this.ensureVisible();
    }
  }

  clearFilter() {
    this.isHidden = false;
    if (this.children) this.children.forEach((child) => child.clearFilter());
  }

  allowDrag() {
    return this.options.allowDrag;
  }

  mouseAction(actionName:string, $event, data:any = null) {
    this.treeModel.setFocus(true);

    const actionMapping = this.options.actionMapping.mouse;
    const action = actionMapping[actionName];

    if (action) {
      action(this.treeModel, this, $event, data);

      // TODO: remove after deprecation of context menu and dbl click
      if (actionName === 'contextMenu') {
        this.fireEvent({ eventName: TREE_EVENTS.onContextMenu, node: this, rawEvent: $event });
      }
      if (actionName === 'dblClick') {
        this.fireEvent({ eventName: TREE_EVENTS.onDoubleClick, warning: 'This event is deprecated, please use actionMapping to handle double clicks', node: this, rawEvent: $event });
      }
    }
  }

  _initChildren() {
    this.children = this.getField('children')
      .map(c => new TreeNode(c, this, this.treeModel));
  }
}

function uuid() {
  return Math.floor(Math.random() * 10000000000000);
}

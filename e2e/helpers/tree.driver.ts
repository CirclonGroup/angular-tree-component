import { Key, browser, ElementArrayFinder, ElementFinder, WebElement, by, element, $, $$, promise } from 'protractor';
import { code as htmlDnd } from 'html-dnd';

function hasClass(element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
};

export function dragAndDrop(from, to) {
  browser.executeScript(htmlDnd, from, to, 0, 0);
}

class BaseDriver {
  constructor(protected element: ElementFinder) {}

  isPresent(): promise.Promise<boolean> {
    return this.element.isPresent();
  }

  getNodes(): ElementArrayFinder {
    return this.element.$$('tree-node');
  }

  getNode(name): NodeDriver {
    const element = this.getNodes().filter((el) => {
      return el.$('tree-node-content span').getText().then((text) => text === name);
    }).get(0);

    return new NodeDriver(element);
  }
}

export class NodeDriver extends BaseDriver {

  isPresent(): promise.Promise<boolean> {
    return this.element.isPresent();
  }

  isActive(): promise.Promise<boolean> {
    return hasClass(this.getTreeNodeElement(), 'tree-node-active');
  }

  isFocused(): promise.Promise<boolean> {
    return hasClass(this.getTreeNodeElement(), 'tree-node-focused');
  }

  isExpanded(): promise.Promise<boolean> {
    return hasClass(this.getTreeNodeElement(), 'tree-node-expanded');
  }

  getTreeNodeElement(): ElementFinder {
    return this.element.$('.tree-node');
  }

  getNodeContentWrapper(): ElementFinder {
    return this.element.$('.node-content-wrapper');
  }

  getExpander(): ElementFinder {
    return this.element.$('.toggle-children-wrapper');
  }

  getChildren(): ElementFinder {
    return this.element.$('.tree-children');
  }

  getDropSlot(index = 0): ElementFinder {
    return this.element.$$('.node-drop-slot').get(index);
  }

  clickExpander(): promise.Promise<void> {
    return this.getExpander().click();
  }

  click(): promise.Promise<void> {
    return this.getNodeContentWrapper().click();
  }
  dblclick() {

  }
  contextMenu() {

  }
  dragToNode(node) {
    dragAndDrop(
      this.getNodeContentWrapper(),
      node.getNodeContentWrapper()
    );
  }
  dragToDropSlot(node) {
    dragAndDrop(
      this.getNodeContentWrapper(),
      node.getDropSlot()
    );
  }
}

export class TreeDriver extends BaseDriver {
  constructor(elementCss) {
    super($(elementCss));
  }

  getNodeByIndex(index: number): NodeDriver {
    const element = this.getNodes().get(index);

    return new NodeDriver(element);
  }

  sendKey(key) {
    browser.actions().sendKeys(key).perform();
  }

  keyDown() {
    this.sendKey(Key.ARROW_DOWN);
  }
  keyUp() {
    this.sendKey(Key.ARROW_UP);
  }
  keyLeft() {
    this.sendKey(Key.ARROW_LEFT);
  }
  keyRight() {
    this.sendKey(Key.ARROW_RIGHT);
  }
  keyEnter() {
    this.sendKey(Key.ENTER);
  }
  keySpace() {
    this.sendKey(Key.SPACE);
  }
}

export class InputDriver {
  constructor(private element) {

  }
}

import { browser, element, by } from 'protractor';
import { TreeDriver, dragAndDrop } from './helpers/tree.driver';

fdescribe('Basic Configuration', () => {
  beforeEach(() => {
    browser.get('http://localhost:4200/#/drag');

    this.tree = new TreeDriver('tree-root');
    this.root1 = this.tree.getNode('root1');
    this.child1 = this.root1.getNode('child1');
    this.root2 = this.tree.getNode('root2');
    this.child21 = this.root2.getNode('child2.1');
  });

  it('should show the tree', () => {
    expect(this.tree.isPresent()).toBe(true);
  });

  it('should have expected children', () => {
    expect(this.root1.getNodes().count()).toBe(2);
    expect(this.root2.getNodes().count()).toBe(2);
    expect(this.child21.getNodes().count()).toBe(0);
  });

  it('should allow to drag leaf', () => {
    this.child1.dragToNode(this.child21);
    this.child21.clickExpander();
    expect(this.root1.getNodes().count()).toBe(1);
    expect(this.child21.getNodes().count()).toBe(1);
  });

  it('should allow to drag to drop slot', () => {
    this.child1.dragToDropSlot(this.child21);
    expect(this.root1.getNodes().count()).toBe(1);
    expect(this.root2.getNodes().count()).toBe(3);
  });
});

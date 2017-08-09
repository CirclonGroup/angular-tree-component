import { browser, element, by, $ } from 'protractor';
import { TreeDriver } from './helpers/tree.driver';

describe('Async Children', () => {
  beforeEach(() => {
    browser.get('http://localhost:4200/#/filter');

    this.tree = new TreeDriver('tree-root');
  });

  it('should show the tree', () => {
    expect(this.tree.isPresent()).toBe(true);
  });

  it('should have 3 nodes', () => {
    expect(this.tree.getNodes().count()).toEqual(3);
    expect(this.tree.getNode('Europe').isPresent()).toBe(true);
  });
});

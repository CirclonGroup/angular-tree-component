import { browser, element, by, $ } from 'protractor';
import { TreeDriver } from './helpers/tree.driver';

describe('Empty Tree', () => {
  beforeEach(() => {
    browser.get('http://localhost:4200/#/empty');
  });

  const testEmptyTree = (treeId) => {
    beforeEach(() => {
      this.tree = new TreeDriver(treeId);
    });

    it('should show the tree', () => {
      expect(this.tree.isPresent()).toBe(true);
    });

    it('should have 0 nodes', () => {
      expect(this.tree.getNodes().count()).toEqual(0);
    });

    it('should load nodes into the tree', () => {
      $('button').click();
      expect(this.tree.getNodes().count()).toEqual(1);
    });
  };

  describe('nodes = null', () => {
    testEmptyTree('#tree1');
  });
  describe('nodes = []', () => {
    testEmptyTree('#tree2');
  });
});

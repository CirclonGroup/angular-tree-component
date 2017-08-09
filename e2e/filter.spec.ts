import { browser, element, by, $ } from 'protractor';
import { TreeDriver } from './helpers/tree.driver';

describe('Filter Tree', () => {
  beforeEach(() => {
    browser.get('http://localhost:4200/#/filter');

    this.tree = new TreeDriver('tree-root');
  });

  describe('Regular filter', () => {
    it('should show the tree', () => {
      expect(this.tree.isPresent()).toBe(true);
    });
    it('should have 3 nodes', () => {
      expect(this.tree.getNodes().count()).toEqual(3);
      expect(this.tree.getNode('Europe').isPresent()).toBe(true);
    });
    it('should filter root nodes', () => {
      $('#filter').sendKeys('ameri');
      expect(this.tree.getNodes().count()).toEqual(2);
      expect(this.tree.getNode('Europe').isPresent()).toBe(false);
    });
    it('should ensure all filtered nodes are visible', () => {
      $('#filter').sendKeys('e');
      expect(this.tree.getNodes().count()).toEqual(9);
    });
    it('should not ensure all filtered nodes are visible', () => {
      $('#filter2').sendKeys('e');
      expect(this.tree.getNodes().count()).toEqual(3);
    });
    describe('child nodes', () => {
      beforeEach(() => {
        $('#filter').sendKeys('new');
        this.usa = this.tree.getNode('North America').getNode('United States');
      });
      it('should show parent of visible child', () => {
        expect(this.usa.isPresent()).toBe(true);
      });
      it('should only show child matching filter', () => {
        expect(this.usa.getNodes().count()).toEqual(1);
        expect(this.usa.getNode('New York').isPresent()).toBe(true);
        expect(this.usa.getNode('California').isPresent()).toBe(false);
      });
    });
  });
  describe('Clear filter', () => {
    beforeEach(() => {
      $('#filter').sendKeys('awefawef');
    });
    it('should clear filter', () => {
      expect(this.tree.getNodes().count()).toEqual(0);
      $('button').click();
      expect(this.tree.getNodes().count()).toEqual(15);
    });
  });
  describe('Filter by function (fuzzy search)', () => {
    beforeEach(() => {
      $('#filter3').sendKeys('nyok');
      this.usa = this.tree.getNode('North America').getNode('United States');
    });
    it('should show parent of visible child', () => {
      expect(this.usa.isPresent()).toBe(true);
    });
    it('should only show child matching filter', () => {
      expect(this.usa.getNodes().count()).toEqual(1);
      expect(this.usa.getNode('New York').isPresent()).toBe(true);
      expect(this.usa.getNode('California').isPresent()).toBe(false);
    });
  });
});

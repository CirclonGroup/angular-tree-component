var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
import { Injectable } from '@angular/core';
import { observable, computed, action, autorun, reaction } from 'mobx';
import { TreeModel } from './tree.model';
import { TREE_EVENTS } from '../constants/events';
var Y_OFFSET = 500; // Extra pixels outside the viewport, in each direction, to render nodes in
var Y_EPSILON = 150; // Minimum pixel change required to recalculate the rendered nodes
var TreeVirtualScroll = /** @class */ (function() {
  function TreeVirtualScroll(treeModel) {
    var _this = this;
    this.treeModel = treeModel;
    this.yBlocks = 0;
    this.x = 0;
    this.viewportHeight = null;
    this.viewport = null;
    treeModel.virtualScroll = this;
    this._dispose = [
      autorun(function() {
        return _this.fixScroll();
      })
    ];
  }
  Object.defineProperty(TreeVirtualScroll.prototype, 'y', {
    get: function() {
      return this.yBlocks * Y_EPSILON;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeVirtualScroll.prototype, 'totalHeight', {
    get: function() {
      return this.treeModel.virtualRoot ? this.treeModel.virtualRoot.height : 0;
    },
    enumerable: true,
    configurable: true
  });
  TreeVirtualScroll.prototype.fireEvent = function(event) {
    this.treeModel.fireEvent(event);
  };
  TreeVirtualScroll.prototype.init = function() {
    var _this = this;
    var fn = this.recalcPositions.bind(this);
    fn();
    this._dispose = this._dispose.concat([
      reaction(function() {
        return _this.treeModel.roots;
      }, fn),
      reaction(function() {
        return _this.treeModel.expandedNodeIds;
      }, fn),
      reaction(function() {
        return _this.treeModel.hiddenNodeIds;
      }, fn)
    ]);
    this.treeModel.subscribe(TREE_EVENTS.loadNodeChildren, fn);
  };
  TreeVirtualScroll.prototype.isEnabled = function() {
    return this.treeModel.options.useVirtualScroll;
  };
  TreeVirtualScroll.prototype._setYBlocks = function(value) {
    this.yBlocks = value;
  };
  TreeVirtualScroll.prototype.recalcPositions = function() {
    this.treeModel.virtualRoot.height = this._getPositionAfter(
      this.treeModel.getVisibleRoots(),
      0
    );
  };
  TreeVirtualScroll.prototype._getPositionAfter = function(nodes, startPos) {
    var _this = this;
    var position = startPos;
    nodes.forEach(function(node) {
      node.position = position;
      position = _this._getPositionAfterNode(node, position);
    });
    return position;
  };
  TreeVirtualScroll.prototype._getPositionAfterNode = function(node, startPos) {
    var position = node.getSelfHeight() + startPos;
    if (node.children && node.isExpanded) {
      // TBD: consider loading component as well
      position = this._getPositionAfter(node.visibleChildren, position);
    }
    node.height = position - startPos;
    return position;
  };
  TreeVirtualScroll.prototype.clear = function() {
    this._dispose.forEach(function(d) {
      return d();
    });
  };
  TreeVirtualScroll.prototype.setViewport = function(viewport) {
    Object.assign(this, {
      viewport: viewport,
      x: viewport.scrollLeft,
      yBlocks: Math.round(viewport.scrollTop / Y_EPSILON),
      viewportHeight: viewport.getBoundingClientRect
        ? viewport.getBoundingClientRect().height
        : 0
    });
  };
  TreeVirtualScroll.prototype.scrollIntoView = function(
    node,
    force,
    scrollToMiddle
  ) {
    if (scrollToMiddle === void 0) {
      scrollToMiddle = true;
    }
    if (node.options.scrollContainer) {
      var scrollContainer = node.options.scrollContainer;
      var scrollContainerHeight = scrollContainer.getBoundingClientRect()
        .height;
      var scrollContainerTop = scrollContainer.getBoundingClientRect().top;
      var nodeTop =
        this.viewport.getBoundingClientRect().top +
        node.position -
        scrollContainerTop;
      if (
        force || // force scroll to node
        nodeTop < scrollContainer.scrollTop || // node is above scroll container
        nodeTop + node.getSelfHeight() >
          scrollContainer.scrollTop + scrollContainerHeight
      ) {
        // node is below container
        scrollContainer.scrollTop = scrollToMiddle
          ? nodeTop - scrollContainerHeight / 2 // scroll to middle
          : nodeTop; // scroll to start
      }
    } else {
      if (
        force || // force scroll to node
        node.position < this.y || // node is above viewport
        node.position + node.getSelfHeight() > this.y + this.viewportHeight
      ) {
        // node is below viewport
        if (this.viewport) {
          this.viewport.scrollTop = scrollToMiddle
            ? node.position - this.viewportHeight / 2 // scroll to middle
            : node.position; // scroll to start
          this._setYBlocks(Math.floor(this.viewport.scrollTop / Y_EPSILON));
        }
      }
    }
  };
  TreeVirtualScroll.prototype.getViewportNodes = function(nodes) {
    var _this = this;
    if (!nodes) return [];
    var visibleNodes = nodes.filter(function(node) {
      return !node.isHidden;
    });
    if (!this.isEnabled()) return visibleNodes;
    if (!this.viewportHeight || !visibleNodes.length) return [];
    // Search for first node in the viewport using binary search
    // Look for first node that starts after the beginning of the viewport (with buffer)
    // Or that ends after the beginning of the viewport
    var firstIndex = binarySearch(visibleNodes, function(node) {
      return (
        node.position + Y_OFFSET > _this.y ||
        node.position + node.height > _this.y
      );
    });
    // Search for last node in the viewport using binary search
    // Look for first node that starts after the end of the viewport (with buffer)
    var lastIndex = binarySearch(
      visibleNodes,
      function(node) {
        return node.position - Y_OFFSET > _this.y + _this.viewportHeight;
      },
      firstIndex
    );
    var viewportNodes = [];
    // Loading async top nodes' children is too long.
    // It happens when first node is visible withing viewport range (including Y_OFFSET).
    // In that case firstIndex == 0 and lastIndex == visibleNodes.length - 1 (e.g. 1000),
    // which means that it loops through every visibleNodes item and push them into viewportNodes array.
    // lastIndex should not equal visibleNodes.length - 1, but something around 50-100 (depending on the viewport)
    var nodeHeight = visibleNodes[0].treeModel.options.options.nodeHeight;
    var renderedNodesMaxLength =
      (Y_OFFSET * 2 + this.viewportHeight) / nodeHeight;
    // Something is probably wrong, prevent nodes from being pushed to an array.
    if (lastIndex - firstIndex > renderedNodesMaxLength) {
      return [];
    }
    for (var i = firstIndex; i <= lastIndex; i++) {
      viewportNodes.push(visibleNodes[i]);
    }
    return viewportNodes;
  };
  TreeVirtualScroll.prototype.fixScroll = function() {
    var maxY = Math.max(0, this.totalHeight - this.viewportHeight);
    if (this.y < 0) this._setYBlocks(0);
    if (this.y > maxY) this._setYBlocks(maxY / Y_EPSILON);
  };
  __decorate(
    [observable, __metadata('design:type', Object)],
    TreeVirtualScroll.prototype,
    'yBlocks',
    void 0
  );
  __decorate(
    [observable, __metadata('design:type', Object)],
    TreeVirtualScroll.prototype,
    'x',
    void 0
  );
  __decorate(
    [observable, __metadata('design:type', Object)],
    TreeVirtualScroll.prototype,
    'viewportHeight',
    void 0
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeVirtualScroll.prototype,
    'y',
    null
  );
  __decorate(
    [
      computed,
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [])
    ],
    TreeVirtualScroll.prototype,
    'totalHeight',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeVirtualScroll.prototype,
    '_setYBlocks',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0)
    ],
    TreeVirtualScroll.prototype,
    'recalcPositions',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeVirtualScroll.prototype,
    'setViewport',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object, Object, Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeVirtualScroll.prototype,
    'scrollIntoView',
    null
  );
  TreeVirtualScroll = __decorate(
    [Injectable(), __metadata('design:paramtypes', [TreeModel])],
    TreeVirtualScroll
  );
  return TreeVirtualScroll;
})();
export { TreeVirtualScroll };
function binarySearch(nodes, condition, firstIndex) {
  if (firstIndex === void 0) {
    firstIndex = 0;
  }
  var index = firstIndex;
  var toIndex = nodes.length - 1;
  while (index !== toIndex) {
    var midIndex = Math.floor((index + toIndex) / 2);
    if (condition(nodes[midIndex])) {
      toIndex = midIndex;
    } else {
      if (index === midIndex) index = toIndex;
      else index = midIndex;
    }
  }
  return index;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvdHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWxELElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLDJFQUEyRTtBQUNqRyxJQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxrRUFBa0U7QUFHekY7SUFnQkUsMkJBQW9CLFNBQW9CO1FBQXhDLGlCQUdDO1FBSG1CLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFiNUIsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLE1BQUMsR0FBRyxDQUFDLENBQUM7UUFDTixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUNsQyxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBV2QsU0FBUyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFoQixDQUFnQixDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBWFMsc0JBQUksZ0NBQUM7YUFBTDtZQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFFUyxzQkFBSSwwQ0FBVzthQUFmO1lBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FB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R0FBRyxPQUFPLENBQUM7O2dCQUNuQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1NBQ3ZCO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBvYnNlcnZhYmxlLCBjb21wdXRlZCwgYWN0aW9uLCBhdXRvcnVuLCByZWFjdGlvbiB9IGZyb20gJ21vYngnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi90cmVlLm1vZGVsJztcbmltcG9ydCB7IFRSRUVfRVZFTlRTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cyc7XG5cbmNvbnN0IFlfT0ZGU0VUID0gNTAwOyAvLyBFeHRyYSBwaXhlbHMgb3V0c2lkZSB0aGUgdmlld3BvcnQsIGluIGVhY2ggZGlyZWN0aW9uLCB0byByZW5kZXIgbm9kZXMgaW5cbmNvbnN0IFlfRVBTSUxPTiA9IDE1MDsgLy8gTWluaW11bSBwaXhlbCBjaGFuZ2UgcmVxdWlyZWQgdG8gcmVjYWxjdWxhdGUgdGhlIHJlbmRlcmVkIG5vZGVzXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmVlVmlydHVhbFNjcm9sbCB7XG4gIHByaXZhdGUgX2Rpc3Bvc2U6IGFueTtcblxuICBAb2JzZXJ2YWJsZSB5QmxvY2tzID0gMDtcbiAgQG9ic2VydmFibGUgeCA9IDA7XG4gIEBvYnNlcnZhYmxlIHZpZXdwb3J0SGVpZ2h0ID0gbnVsbDtcbiAgdmlld3BvcnQgPSBudWxsO1xuXG4gIEBjb21wdXRlZCBnZXQgeSgpIHtcbiAgICByZXR1cm4gdGhpcy55QmxvY2tzICogWV9FUFNJTE9OO1xuICB9XG5cbiAgQGNvbXB1dGVkIGdldCB0b3RhbEhlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy50cmVlTW9kZWwudmlydHVhbFJvb3QgPyB0aGlzLnRyZWVNb2RlbC52aXJ0dWFsUm9vdC5oZWlnaHQgOiAwO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmVlTW9kZWw6IFRyZWVNb2RlbCkge1xuICAgIHRyZWVNb2RlbC52aXJ0dWFsU2Nyb2xsID0gdGhpcztcbiAgICB0aGlzLl9kaXNwb3NlID0gW2F1dG9ydW4oKCkgPT4gdGhpcy5maXhTY3JvbGwoKSldO1xuICB9XG5cbiAgZmlyZUV2ZW50KGV2ZW50KSB7XG4gICAgdGhpcy50cmVlTW9kZWwuZmlyZUV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3QgZm4gPSB0aGlzLnJlY2FsY1Bvc2l0aW9ucy5iaW5kKHRoaXMpO1xuXG4gICAgZm4oKTtcbiAgICB0aGlzLl9kaXNwb3NlID0gW1xuICAgICAgLi4udGhpcy5fZGlzcG9zZSxcbiAgICAgIHJlYWN0aW9uKCgpID0+IHRoaXMudHJlZU1vZGVsLnJvb3RzLCBmbiksXG4gICAgICByZWFjdGlvbigoKSA9PiB0aGlzLnRyZWVNb2RlbC5leHBhbmRlZE5vZGVJZHMsIGZuKSxcbiAgICAgIHJlYWN0aW9uKCgpID0+IHRoaXMudHJlZU1vZGVsLmhpZGRlbk5vZGVJZHMsIGZuKVxuICAgIF07XG4gICAgdGhpcy50cmVlTW9kZWwuc3Vic2NyaWJlKFRSRUVfRVZFTlRTLmxvYWROb2RlQ2hpbGRyZW4sIGZuKTtcbiAgfVxuXG4gIGlzRW5hYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy50cmVlTW9kZWwub3B0aW9ucy51c2VWaXJ0dWFsU2Nyb2xsO1xuICB9XG5cbiAgQGFjdGlvbiBwcml2YXRlIF9zZXRZQmxvY2tzKHZhbHVlKSB7XG4gICAgdGhpcy55QmxvY2tzID0gdmFsdWU7XG4gIH1cblxuICBAYWN0aW9uIHJlY2FsY1Bvc2l0aW9ucygpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC52aXJ0dWFsUm9vdC5oZWlnaHQgPSB0aGlzLl9nZXRQb3NpdGlvbkFmdGVyKHRoaXMudHJlZU1vZGVsLmdldFZpc2libGVSb290cygpLCAwKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFBvc2l0aW9uQWZ0ZXIobm9kZXMsIHN0YXJ0UG9zKSB7XG4gICAgbGV0IHBvc2l0aW9uID0gc3RhcnRQb3M7XG5cbiAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBub2RlLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICBwb3NpdGlvbiA9IHRoaXMuX2dldFBvc2l0aW9uQWZ0ZXJOb2RlKG5vZGUsIHBvc2l0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICBwcml2YXRlIF9nZXRQb3NpdGlvbkFmdGVyTm9kZShub2RlLCBzdGFydFBvcykge1xuICAgIGxldCBwb3NpdGlvbiA9IG5vZGUuZ2V0U2VsZkhlaWdodCgpICsgc3RhcnRQb3M7XG5cbiAgICBpZiAobm9kZS5jaGlsZHJlbiAmJiBub2RlLmlzRXhwYW5kZWQpIHsgLy8gVEJEOiBjb25zaWRlciBsb2FkaW5nIGNvbXBvbmVudCBhcyB3ZWxsXG4gICAgICBwb3NpdGlvbiA9IHRoaXMuX2dldFBvc2l0aW9uQWZ0ZXIobm9kZS52aXNpYmxlQ2hpbGRyZW4sIHBvc2l0aW9uKTtcbiAgICB9XG4gICAgbm9kZS5oZWlnaHQgPSBwb3NpdGlvbiAtIHN0YXJ0UG9zO1xuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5fZGlzcG9zZS5mb3JFYWNoKChkKSA9PiBkKCkpO1xuICB9XG5cbiAgQGFjdGlvbiBzZXRWaWV3cG9ydCh2aWV3cG9ydCkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgICAgdmlld3BvcnQsXG4gICAgICB4OiB2aWV3cG9ydC5zY3JvbGxMZWZ0LFxuICAgICAgeUJsb2NrczogTWF0aC5yb3VuZCh2aWV3cG9ydC5zY3JvbGxUb3AgLyBZX0VQU0lMT04pLFxuICAgICAgdmlld3BvcnRIZWlnaHQ6IHZpZXdwb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCA/IHZpZXdwb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCA6IDBcbiAgICB9KTtcbiAgfVxuXG4gIEBhY3Rpb24gc2Nyb2xsSW50b1ZpZXcobm9kZSwgZm9yY2UsIHNjcm9sbFRvTWlkZGxlID0gdHJ1ZSkge1xuICAgIGlmIChub2RlLm9wdGlvbnMuc2Nyb2xsQ29udGFpbmVyKSB7XG4gICAgICBjb25zdCBzY3JvbGxDb250YWluZXIgPSBub2RlLm9wdGlvbnMuc2Nyb2xsQ29udGFpbmVyO1xuICAgICAgY29uc3Qgc2Nyb2xsQ29udGFpbmVySGVpZ2h0ID0gc2Nyb2xsQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lclRvcCA9IHNjcm9sbENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICBjb25zdCBub2RlVG9wID0gdGhpcy52aWV3cG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBub2RlLnBvc2l0aW9uIC0gc2Nyb2xsQ29udGFpbmVyVG9wO1xuXG4gICAgICBpZiAoZm9yY2UgfHwgLy8gZm9yY2Ugc2Nyb2xsIHRvIG5vZGVcbiAgICAgICAgbm9kZVRvcCA8IHNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AgfHwgLy8gbm9kZSBpcyBhYm92ZSBzY3JvbGwgY29udGFpbmVyXG4gICAgICAgIG5vZGVUb3AgKyBub2RlLmdldFNlbGZIZWlnaHQoKSA+IHNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AgKyBzY3JvbGxDb250YWluZXJIZWlnaHQpIHsgLy8gbm9kZSBpcyBiZWxvdyBjb250YWluZXJcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcCA9IHNjcm9sbFRvTWlkZGxlID9cbiAgICAgICAgICBub2RlVG9wIC0gc2Nyb2xsQ29udGFpbmVySGVpZ2h0IC8gMiA6IC8vIHNjcm9sbCB0byBtaWRkbGVcbiAgICAgICAgICBub2RlVG9wOyAvLyBzY3JvbGwgdG8gc3RhcnRcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGZvcmNlIHx8IC8vIGZvcmNlIHNjcm9sbCB0byBub2RlXG4gICAgICAgIG5vZGUucG9zaXRpb24gPCB0aGlzLnkgfHwgLy8gbm9kZSBpcyBhYm92ZSB2aWV3cG9ydFxuICAgICAgICBub2RlLnBvc2l0aW9uICsgbm9kZS5nZXRTZWxmSGVpZ2h0KCkgPiB0aGlzLnkgKyB0aGlzLnZpZXdwb3J0SGVpZ2h0KSB7IC8vIG5vZGUgaXMgYmVsb3cgdmlld3BvcnRcbiAgICAgICAgaWYgKHRoaXMudmlld3BvcnQpIHtcbiAgICAgICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbFRvcCA9IHNjcm9sbFRvTWlkZGxlID9cbiAgICAgICAgICBub2RlLnBvc2l0aW9uIC0gdGhpcy52aWV3cG9ydEhlaWdodCAvIDIgOiAvLyBzY3JvbGwgdG8gbWlkZGxlXG4gICAgICAgICAgbm9kZS5wb3NpdGlvbjsgLy8gc2Nyb2xsIHRvIHN0YXJ0XG5cbiAgICAgICAgICB0aGlzLl9zZXRZQmxvY2tzKE1hdGguZmxvb3IodGhpcy52aWV3cG9ydC5zY3JvbGxUb3AgLyBZX0VQU0lMT04pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFZpZXdwb3J0Tm9kZXMobm9kZXMpIHtcbiAgICBpZiAoIW5vZGVzKSByZXR1cm4gW107XG5cbiAgICBjb25zdCB2aXNpYmxlTm9kZXMgPSBub2Rlcy5maWx0ZXIoKG5vZGUpID0+ICFub2RlLmlzSGlkZGVuKTtcblxuICAgIGlmICghdGhpcy5pc0VuYWJsZWQoKSkgcmV0dXJuIHZpc2libGVOb2RlcztcblxuICAgIGlmICghdGhpcy52aWV3cG9ydEhlaWdodCB8fCAhdmlzaWJsZU5vZGVzLmxlbmd0aCkgcmV0dXJuIFtdO1xuXG4gICAgLy8gU2VhcmNoIGZvciBmaXJzdCBub2RlIGluIHRoZSB2aWV3cG9ydCB1c2luZyBiaW5hcnkgc2VhcmNoXG4gICAgLy8gTG9vayBmb3IgZmlyc3Qgbm9kZSB0aGF0IHN0YXJ0cyBhZnRlciB0aGUgYmVnaW5uaW5nIG9mIHRoZSB2aWV3cG9ydCAod2l0aCBidWZmZXIpXG4gICAgLy8gT3IgdGhhdCBlbmRzIGFmdGVyIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHZpZXdwb3J0XG4gICAgY29uc3QgZmlyc3RJbmRleCA9IGJpbmFyeVNlYXJjaCh2aXNpYmxlTm9kZXMsIChub2RlKSA9PiB7XG4gICAgICByZXR1cm4gKG5vZGUucG9zaXRpb24gKyBZX09GRlNFVCA+IHRoaXMueSkgfHxcbiAgICAgICAgICAgICAobm9kZS5wb3NpdGlvbiArIG5vZGUuaGVpZ2h0ID4gdGhpcy55KTtcbiAgICB9KTtcblxuICAgIC8vIFNlYXJjaCBmb3IgbGFzdCBub2RlIGluIHRoZSB2aWV3cG9ydCB1c2luZyBiaW5hcnkgc2VhcmNoXG4gICAgLy8gTG9vayBmb3IgZmlyc3Qgbm9kZSB0aGF0IHN0YXJ0cyBhZnRlciB0aGUgZW5kIG9mIHRoZSB2aWV3cG9ydCAod2l0aCBidWZmZXIpXG4gICAgY29uc3QgbGFzdEluZGV4ID0gYmluYXJ5U2VhcmNoKHZpc2libGVOb2RlcywgKG5vZGUpID0+IHtcbiAgICAgIHJldHVybiBub2RlLnBvc2l0aW9uIC0gWV9PRkZTRVQgPiB0aGlzLnkgKyB0aGlzLnZpZXdwb3J0SGVpZ2h0O1xuICAgIH0sIGZpcnN0SW5kZXgpO1xuXG4gICAgY29uc3Qgdmlld3BvcnROb2RlcyA9IFtdO1xuXG4gICAgLy8gTG9hZGluZyBhc3luYyB0b3Agbm9kZXMnIGNoaWxkcmVuIGlzIHRvbyBsb25nLlxuICAgIC8vIEl0IGhhcHBlbnMgd2hlbiBmaXJzdCBub2RlIGlzIHZpc2libGUgd2l0aGluZyB2aWV3cG9ydCByYW5nZSAoaW5jbHVkaW5nIFlfT0ZGU0VUKS5cbiAgICAvLyBJbiB0aGF0IGNhc2UgZmlyc3RJbmRleCA9PSAwIGFuZCBsYXN0SW5kZXggPT0gdmlzaWJsZU5vZGVzLmxlbmd0aCAtIDEgKGUuZy4gMTAwMCksXG4gICAgLy8gd2hpY2ggbWVhbnMgdGhhdCBpdCBsb29wcyB0aHJvdWdoIGV2ZXJ5IHZpc2libGVOb2RlcyBpdGVtIGFuZCBwdXNoIHRoZW0gaW50byB2aWV3cG9ydE5vZGVzIGFycmF5LlxuICAgIC8vIGxhc3RJbmRleCBzaG91bGQgbm90IGVxdWFsIHZpc2libGVOb2Rlcy5sZW5ndGggLSAxLCBidXQgc29tZXRoaW5nIGFyb3VuZCA1MC0xMDAgKGRlcGVuZGluZyBvbiB0aGUgdmlld3BvcnQpXG4gICAgY29uc3Qgbm9kZUhlaWdodCA9IHZpc2libGVOb2Rlc1swXS50cmVlTW9kZWwub3B0aW9ucy5vcHRpb25zLm5vZGVIZWlnaHQ7XG4gICAgY29uc3QgcmVuZGVyZWROb2Rlc01heExlbmd0aCA9IChZX09GRlNFVCAqIDIgKyB0aGlzLnZpZXdwb3J0SGVpZ2h0KSAvIG5vZGVIZWlnaHQ7XG5cbiAgICAvLyBTb21ldGhpbmcgaXMgcHJvYmFibHkgd3JvbmcsIHByZXZlbnQgbm9kZXMgZnJvbSBiZWluZyBwdXNoZWQgdG8gYW4gYXJyYXkuXG4gICAgaWYgKGxhc3RJbmRleCAtIGZpcnN0SW5kZXggPiByZW5kZXJlZE5vZGVzTWF4TGVuZ3RoKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IGZpcnN0SW5kZXg7IGkgPD0gbGFzdEluZGV4OyBpKyspIHtcbiAgICAgIHZpZXdwb3J0Tm9kZXMucHVzaCh2aXNpYmxlTm9kZXNbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiB2aWV3cG9ydE5vZGVzO1xuICB9XG5cbiAgZml4U2Nyb2xsKCkge1xuICAgIGNvbnN0IG1heFkgPSBNYXRoLm1heCgwLCB0aGlzLnRvdGFsSGVpZ2h0IC0gdGhpcy52aWV3cG9ydEhlaWdodCk7XG5cbiAgICBpZiAodGhpcy55IDwgMCkgdGhpcy5fc2V0WUJsb2NrcygwKTtcbiAgICBpZiAodGhpcy55ID4gbWF4WSkgdGhpcy5fc2V0WUJsb2NrcyhtYXhZIC8gWV9FUFNJTE9OKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBiaW5hcnlTZWFyY2gobm9kZXMsIGNvbmRpdGlvbiwgZmlyc3RJbmRleCA9IDApIHtcbiAgbGV0IGluZGV4ID0gZmlyc3RJbmRleDtcbiAgbGV0IHRvSW5kZXggPSBub2Rlcy5sZW5ndGggLSAxO1xuXG4gIHdoaWxlIChpbmRleCAhPT0gdG9JbmRleCkge1xuICAgIGxldCBtaWRJbmRleCA9IE1hdGguZmxvb3IoKGluZGV4ICsgdG9JbmRleCkgLyAyKTtcblxuICAgIGlmIChjb25kaXRpb24obm9kZXNbbWlkSW5kZXhdKSkge1xuICAgICAgdG9JbmRleCA9IG1pZEluZGV4O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmIChpbmRleCA9PT0gbWlkSW5kZXgpIGluZGV4ID0gdG9JbmRleDtcbiAgICAgIGVsc2UgaW5kZXggPSBtaWRJbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZGV4O1xufVxuIl19

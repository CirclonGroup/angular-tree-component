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
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { reaction } from 'mobx';
import { observable, computed, action } from '../mobx-angular/mobx-proxy';
import { TreeModel } from '../models/tree.model';
var TreeNodeCollectionComponent = /** @class */ (function() {
  function TreeNodeCollectionComponent() {
    this._dispose = [];
  }
  Object.defineProperty(TreeNodeCollectionComponent.prototype, 'nodes', {
    get: function() {
      return this._nodes;
    },
    set: function(nodes) {
      this.setNodes(nodes);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeNodeCollectionComponent.prototype, 'marginTop', {
    get: function() {
      var firstNode =
        this.viewportNodes &&
        this.viewportNodes.length &&
        this.viewportNodes[0];
      var relativePosition =
        firstNode && firstNode.parent
          ? firstNode.position -
            firstNode.parent.position -
            firstNode.parent.getSelfHeight()
          : 0;
      return relativePosition + 'px';
    },
    enumerable: true,
    configurable: true
  });
  TreeNodeCollectionComponent.prototype.setNodes = function(nodes) {
    this._nodes = nodes;
  };
  TreeNodeCollectionComponent.prototype.ngOnInit = function() {
    var _this = this;
    this.virtualScroll = this.treeModel.virtualScroll;
    this._dispose = [
      // return node indexes so we can compare structurally,
      reaction(
        function() {
          return _this.virtualScroll
            .getViewportNodes(_this.nodes)
            .map(function(n) {
              return n.index;
            });
        },
        function(nodeIndexes) {
          _this.viewportNodes = nodeIndexes.map(function(i) {
            return _this.nodes[i];
          });
        },
        { compareStructural: true, fireImmediately: true }
      ),
      reaction(
        function() {
          return _this.nodes;
        },
        function(nodes) {
          _this.viewportNodes = _this.virtualScroll.getViewportNodes(nodes);
        }
      )
    ];
  };
  TreeNodeCollectionComponent.prototype.ngOnDestroy = function() {
    this._dispose.forEach(function(d) {
      return d();
    });
  };
  TreeNodeCollectionComponent.prototype.trackNode = function(index, node) {
    return node.id;
  };
  __decorate(
    [
      Input(),
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [Object])
    ],
    TreeNodeCollectionComponent.prototype,
    'nodes',
    null
  );
  __decorate(
    [Input(), __metadata('design:type', TreeModel)],
    TreeNodeCollectionComponent.prototype,
    'treeModel',
    void 0
  );
  __decorate(
    [observable, __metadata('design:type', Object)],
    TreeNodeCollectionComponent.prototype,
    '_nodes',
    void 0
  );
  __decorate(
    [Input(), __metadata('design:type', Object)],
    TreeNodeCollectionComponent.prototype,
    'templates',
    void 0
  );
  __decorate(
    [observable, __metadata('design:type', Array)],
    TreeNodeCollectionComponent.prototype,
    'viewportNodes',
    void 0
  );
  __decorate(
    [
      computed,
      __metadata('design:type', String),
      __metadata('design:paramtypes', [])
    ],
    TreeNodeCollectionComponent.prototype,
    'marginTop',
    null
  );
  __decorate(
    [
      action,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeNodeCollectionComponent.prototype,
    'setNodes',
    null
  );
  TreeNodeCollectionComponent = __decorate(
    [
      Component({
        selector: 'tree-node-collection',
        encapsulation: ViewEncapsulation.None,
        template:
          '\n    <ng-container *treeMobxAutorun="{ dontDetach: true }">\n      <div [style.margin-top]="marginTop">\n        <tree-node\n          *ngFor="let node of viewportNodes; let i = index; trackBy: trackNode"\n          [node]="node"\n          [index]="i"\n          [templates]="templates"\n        >\n        </tree-node>\n      </div>\n    </ng-container>\n  '
      })
    ],
    TreeNodeCollectionComponent
  );
  return TreeNodeCollectionComponent;
})();
export { TreeNodeCollectionComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNvbGxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbGxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixFQUdsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQW1CakQ7SUFqQkE7UUErQ0UsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQXFDaEIsQ0FBQztJQWpFQyxzQkFBSSw4Q0FBSzthQUFUO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7YUFDRCxVQUFVLEtBQUs7WUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7OztPQUhBO0lBYVMsc0JBQUksa0RBQVM7YUFBYjtZQUNSLElBQU0sU0FBUyxHQUNiLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRSxJQUFNLGdCQUFnQixHQUNwQixTQUFTLElBQUksU0FBUyxDQUFDLE1BQU07Z0JBQzNCLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUTtvQkFDbEIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRO29CQUN6QixTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtnQkFDbEMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVSLE9BQVUsZ0JBQWdCLE9BQUksQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQUlPLDhDQUFRLEdBQVIsVUFBUyxLQUFLO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCw4Q0FBUSxHQUFSO1FBQUEsaUJBc0JDO1FBckJDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNkLHNEQUFzRDtZQUN0RCxRQUFRLENBQ047Z0JBQ0UsT0FBTyxLQUFJLENBQUMsYUFBYTtxQkFDdEIsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQztxQkFDNUIsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsQ0FBQztZQUN2QixDQUFDLEVBQ0QsVUFBQSxXQUFXO2dCQUNULEtBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUM7WUFDM0QsQ0FBQyxFQUNELEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQVMsQ0FDMUQ7WUFDRCxRQUFRLENBQ04sY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQVYsQ0FBVSxFQUNoQixVQUFBLEtBQUs7Z0JBQ0gsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xFLENBQUMsQ0FDRjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsaURBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxFQUFFLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELCtDQUFTLEdBQVQsVUFBVSxLQUFLLEVBQUUsSUFBSTtRQUNuQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQWhFRDtRQURDLEtBQUssRUFBRTs7OzREQUdQO0lBS1E7UUFBUixLQUFLLEVBQUU7a0NBQVksU0FBUztrRUFBQztJQUVsQjtRQUFYLFVBQVU7OytEQUFRO0lBRVY7UUFBUixLQUFLLEVBQUU7O2tFQUFXO0lBRVA7UUFBWCxVQUFVOztzRUFBMkI7SUFFNUI7UUFBVCxRQUFROzs7Z0VBV1I7SUFJTztRQUFQLE1BQU07Ozs7K0RBRU47SUFsQ1UsMkJBQTJCO1FBakJ2QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLFFBQVEsRUFBRSxzWEFZVDtTQUNGLENBQUM7T0FDVywyQkFBMkIsQ0FtRXZDO0lBQUQsa0NBQUM7Q0FBQSxBQW5FRCxJQW1FQztTQW5FWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyByZWFjdGlvbiB9IGZyb20gJ21vYngnO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSwgY29tcHV0ZWQsIGFjdGlvbiB9IGZyb20gJy4uL21vYngtYW5ndWxhci9tb2J4LXByb3h5JztcbmltcG9ydCB7IFRyZWVWaXJ0dWFsU2Nyb2xsIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtdmlydHVhbC1zY3JvbGwubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90cmVlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHJlZS1ub2RlLWNvbGxlY3Rpb24nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKnRyZWVNb2J4QXV0b3J1bj1cInsgZG9udERldGFjaDogdHJ1ZSB9XCI+XG4gICAgICA8ZGl2IFtzdHlsZS5tYXJnaW4tdG9wXT1cIm1hcmdpblRvcFwiPlxuICAgICAgICA8dHJlZS1ub2RlXG4gICAgICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2Ygdmlld3BvcnROb2RlczsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTogdHJhY2tOb2RlXCJcbiAgICAgICAgICBbbm9kZV09XCJub2RlXCJcbiAgICAgICAgICBbaW5kZXhdPVwiaVwiXG4gICAgICAgICAgW3RlbXBsYXRlc109XCJ0ZW1wbGF0ZXNcIlxuICAgICAgICA+XG4gICAgICAgIDwvdHJlZS1ub2RlPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVDb2xsZWN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBnZXQgbm9kZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVzO1xuICB9XG4gIHNldCBub2Rlcyhub2Rlcykge1xuICAgIHRoaXMuc2V0Tm9kZXMobm9kZXMpO1xuICB9XG5cbiAgQElucHV0KCkgdHJlZU1vZGVsOiBUcmVlTW9kZWw7XG5cbiAgQG9ic2VydmFibGUgX25vZGVzO1xuICBwcml2YXRlIHZpcnR1YWxTY3JvbGw6IFRyZWVWaXJ0dWFsU2Nyb2xsOyAvLyBDYW5ub3QgaW5qZWN0IHRoaXMsIGJlY2F1c2Ugd2UgbWlnaHQgYmUgaW5zaWRlIHRyZWVOb2RlVGVtcGxhdGVGdWxsXG4gIEBJbnB1dCgpIHRlbXBsYXRlcztcblxuICBAb2JzZXJ2YWJsZSB2aWV3cG9ydE5vZGVzOiBUcmVlTm9kZVtdO1xuXG4gIEBjb21wdXRlZCBnZXQgbWFyZ2luVG9wKCk6IHN0cmluZyB7XG4gICAgY29uc3QgZmlyc3ROb2RlID1cbiAgICAgIHRoaXMudmlld3BvcnROb2RlcyAmJiB0aGlzLnZpZXdwb3J0Tm9kZXMubGVuZ3RoICYmIHRoaXMudmlld3BvcnROb2Rlc1swXTtcbiAgICBjb25zdCByZWxhdGl2ZVBvc2l0aW9uID1cbiAgICAgIGZpcnN0Tm9kZSAmJiBmaXJzdE5vZGUucGFyZW50XG4gICAgICAgID8gZmlyc3ROb2RlLnBvc2l0aW9uIC1cbiAgICAgICAgICBmaXJzdE5vZGUucGFyZW50LnBvc2l0aW9uIC1cbiAgICAgICAgICBmaXJzdE5vZGUucGFyZW50LmdldFNlbGZIZWlnaHQoKVxuICAgICAgICA6IDA7XG5cbiAgICByZXR1cm4gYCR7cmVsYXRpdmVQb3NpdGlvbn1weGA7XG4gIH1cblxuICBfZGlzcG9zZSA9IFtdO1xuXG4gIEBhY3Rpb24gc2V0Tm9kZXMobm9kZXMpIHtcbiAgICB0aGlzLl9ub2RlcyA9IG5vZGVzO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsID0gdGhpcy50cmVlTW9kZWwudmlydHVhbFNjcm9sbDtcbiAgICB0aGlzLl9kaXNwb3NlID0gW1xuICAgICAgLy8gcmV0dXJuIG5vZGUgaW5kZXhlcyBzbyB3ZSBjYW4gY29tcGFyZSBzdHJ1Y3R1cmFsbHksXG4gICAgICByZWFjdGlvbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnZpcnR1YWxTY3JvbGxcbiAgICAgICAgICAgIC5nZXRWaWV3cG9ydE5vZGVzKHRoaXMubm9kZXMpXG4gICAgICAgICAgICAubWFwKG4gPT4gbi5pbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIG5vZGVJbmRleGVzID0+IHtcbiAgICAgICAgICB0aGlzLnZpZXdwb3J0Tm9kZXMgPSBub2RlSW5kZXhlcy5tYXAoaSA9PiB0aGlzLm5vZGVzW2ldKTtcbiAgICAgICAgfSxcbiAgICAgICAgeyBjb21wYXJlU3RydWN0dXJhbDogdHJ1ZSwgZmlyZUltbWVkaWF0ZWx5OiB0cnVlIH0gYXMgYW55XG4gICAgICApLFxuICAgICAgcmVhY3Rpb24oXG4gICAgICAgICgpID0+IHRoaXMubm9kZXMsXG4gICAgICAgIG5vZGVzID0+IHtcbiAgICAgICAgICB0aGlzLnZpZXdwb3J0Tm9kZXMgPSB0aGlzLnZpcnR1YWxTY3JvbGwuZ2V0Vmlld3BvcnROb2Rlcyhub2Rlcyk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICBdO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGlzcG9zZS5mb3JFYWNoKGQgPT4gZCgpKTtcbiAgfVxuXG4gIHRyYWNrTm9kZShpbmRleCwgbm9kZSkge1xuICAgIHJldHVybiBub2RlLmlkO1xuICB9XG59XG4iXX0=

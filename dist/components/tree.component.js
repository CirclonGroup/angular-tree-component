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
import {
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { TreeOptions } from '../models/tree-options.model';
import { TreeViewportComponent } from './tree-viewport.component';
import includes from 'lodash/includes';
import pick from 'lodash/pick';
var TreeComponent = /** @class */ (function() {
  function TreeComponent(treeModel, treeDraggedElement) {
    var _this = this;
    this.treeModel = treeModel;
    this.treeDraggedElement = treeDraggedElement;
    treeModel.eventNames.forEach(function(name) {
      return (_this[name] = new EventEmitter());
    });
    treeModel.subscribeToState(function(state) {
      return _this.stateChange.emit(state);
    });
  }
  Object.defineProperty(TreeComponent.prototype, 'nodes', {
    // Will be handled in ngOnChanges
    set: function(nodes) {},
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeComponent.prototype, 'options', {
    set: function(options) {},
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeComponent.prototype, 'focused', {
    set: function(value) {
      this.treeModel.setFocus(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TreeComponent.prototype, 'state', {
    set: function(state) {
      this.treeModel.setState(state);
    },
    enumerable: true,
    configurable: true
  });
  TreeComponent.prototype.onKeydown = function($event) {
    if (!this.treeModel.isFocused) return;
    if (
      includes(
        ['input', 'textarea'],
        document.activeElement.tagName.toLowerCase()
      )
    )
      return;
    var focusedNode = this.treeModel.getFocusedNode();
    this.treeModel.performKeyAction(focusedNode, $event);
  };
  TreeComponent.prototype.onMousedown = function($event) {
    function isOutsideClick(startElement, nodeName) {
      return !startElement
        ? true
        : startElement.localName === nodeName
        ? false
        : isOutsideClick(startElement.parentElement, nodeName);
    }
    if (isOutsideClick($event.target, 'tree-root')) {
      this.treeModel.setFocus(false);
    }
  };
  TreeComponent.prototype.ngOnChanges = function(changes) {
    if (changes.options || changes.nodes) {
      this.treeModel.setData({
        options: changes.options && changes.options.currentValue,
        nodes: changes.nodes && changes.nodes.currentValue,
        events: pick(this, this.treeModel.eventNames)
      });
    }
  };
  TreeComponent.prototype.sizeChanged = function() {
    this.viewportComponent.setViewport();
  };
  __decorate(
    [
      ContentChild('loadingTemplate', { static: false }),
      __metadata('design:type', TemplateRef)
    ],
    TreeComponent.prototype,
    'loadingTemplate',
    void 0
  );
  __decorate(
    [
      ContentChild('treeNodeTemplate', { static: false }),
      __metadata('design:type', TemplateRef)
    ],
    TreeComponent.prototype,
    'treeNodeTemplate',
    void 0
  );
  __decorate(
    [
      ContentChild('treeNodeWrapperTemplate', { static: false }),
      __metadata('design:type', TemplateRef)
    ],
    TreeComponent.prototype,
    'treeNodeWrapperTemplate',
    void 0
  );
  __decorate(
    [
      ContentChild('treeNodeFullTemplate', { static: false }),
      __metadata('design:type', TemplateRef)
    ],
    TreeComponent.prototype,
    'treeNodeFullTemplate',
    void 0
  );
  __decorate(
    [
      ViewChild('viewport', { static: false }),
      __metadata('design:type', TreeViewportComponent)
    ],
    TreeComponent.prototype,
    'viewportComponent',
    void 0
  );
  __decorate(
    [
      Input(),
      __metadata('design:type', Array),
      __metadata('design:paramtypes', [Array])
    ],
    TreeComponent.prototype,
    'nodes',
    null
  );
  __decorate(
    [
      Input(),
      __metadata('design:type', TreeOptions),
      __metadata('design:paramtypes', [TreeOptions])
    ],
    TreeComponent.prototype,
    'options',
    null
  );
  __decorate(
    [
      Input(),
      __metadata('design:type', Boolean),
      __metadata('design:paramtypes', [Boolean])
    ],
    TreeComponent.prototype,
    'focused',
    null
  );
  __decorate(
    [
      Input(),
      __metadata('design:type', Object),
      __metadata('design:paramtypes', [Object])
    ],
    TreeComponent.prototype,
    'state',
    null
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'toggleExpanded',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'activate',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'deactivate',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'nodeActivate',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'nodeDeactivate',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'select',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'deselect',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'focus',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'blur',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'updateData',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'initialized',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'moveNode',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'copyNode',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'loadNodeChildren',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'changeFilter',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'event',
    void 0
  );
  __decorate(
    [Output(), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'stateChange',
    void 0
  );
  __decorate(
    [
      HostListener('body: keydown', ['$event']),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeComponent.prototype,
    'onKeydown',
    null
  );
  __decorate(
    [
      HostListener('body: mousedown', ['$event']),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0)
    ],
    TreeComponent.prototype,
    'onMousedown',
    null
  );
  TreeComponent = __decorate(
    [
      Component({
        selector: 'Tree, tree-root',
        providers: [TreeModel],
        styles: [],
        template:
          '\n      <tree-viewport #viewport>\n          <div\n                  class="angular-tree-component"\n                  [class.node-dragging]="treeDraggedElement.isDragging()"\n                  [class.angular-tree-component-rtl]="treeModel.options.rtl">\n              <tree-node-collection\n                      *ngIf="treeModel.roots"\n                      [nodes]="treeModel.roots"\n                      [treeModel]="treeModel"\n                      [templates]="{\n            loadingTemplate: loadingTemplate,\n            treeNodeTemplate: treeNodeTemplate,\n            treeNodeWrapperTemplate: treeNodeWrapperTemplate,\n            treeNodeFullTemplate: treeNodeFullTemplate\n          }">\n              </tree-node-collection>\n              <tree-node-drop-slot\n                      class="empty-tree-drop-slot"\n                      *ngIf="treeModel.isEmptyTree()"\n                      [dropIndex]="0"\n                      [node]="treeModel.virtualRoot">\n              </tree-node-drop-slot>\n          </div>\n      </tree-viewport>\n  '
      }),
      __metadata('design:paramtypes', [TreeModel, TreeDraggedElement])
    ],
    TreeComponent
  );
  return TreeComponent;
})();
export { TreeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy90cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0SSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWxFLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sSUFBSSxNQUFNLGFBQWEsQ0FBQztBQWlDL0I7SUEyQ0UsdUJBQ1MsU0FBb0IsRUFDcEIsa0JBQXNDO1FBRi9DLGlCQU1DO1FBTFEsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBRTdDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksWUFBWSxFQUFFLEVBQS9CLENBQStCLENBQUMsQ0FBQztRQUN4RSxTQUFTLENBQUMsZ0JBQWdCLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUF0Q1Esc0JBQUksZ0NBQUs7UUFEbEIsaUNBQWlDO2FBQ3hCLFVBQVUsS0FBWTtRQUMvQixDQUFDOzs7T0FB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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90cmVlLm1vZGVsJztcbmltcG9ydCB7IFRyZWVEcmFnZ2VkRWxlbWVudCB9IGZyb20gJy4uL21vZGVscy90cmVlLWRyYWdnZWQtZWxlbWVudC5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy90cmVlLW9wdGlvbnMubW9kZWwnO1xuaW1wb3J0IHsgVHJlZVZpZXdwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi90cmVlLXZpZXdwb3J0LmNvbXBvbmVudCc7XG5cbmltcG9ydCBpbmNsdWRlcyBmcm9tICdsb2Rhc2gvaW5jbHVkZXMnO1xuaW1wb3J0IHBpY2sgZnJvbSAnbG9kYXNoL3BpY2snO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdUcmVlLCB0cmVlLXJvb3QnLFxuICBwcm92aWRlcnM6IFtUcmVlTW9kZWxdLFxuICBzdHlsZXM6IFtdLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPHRyZWUtdmlld3BvcnQgI3ZpZXdwb3J0PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYW5ndWxhci10cmVlLWNvbXBvbmVudFwiXG4gICAgICAgICAgICAgICAgICBbY2xhc3Mubm9kZS1kcmFnZ2luZ109XCJ0cmVlRHJhZ2dlZEVsZW1lbnQuaXNEcmFnZ2luZygpXCJcbiAgICAgICAgICAgICAgICAgIFtjbGFzcy5hbmd1bGFyLXRyZWUtY29tcG9uZW50LXJ0bF09XCJ0cmVlTW9kZWwub3B0aW9ucy5ydGxcIj5cbiAgICAgICAgICAgICAgPHRyZWUtbm9kZS1jb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJ0cmVlTW9kZWwucm9vdHNcIlxuICAgICAgICAgICAgICAgICAgICAgIFtub2Rlc109XCJ0cmVlTW9kZWwucm9vdHNcIlxuICAgICAgICAgICAgICAgICAgICAgIFt0cmVlTW9kZWxdPVwidHJlZU1vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgICBbdGVtcGxhdGVzXT1cIntcbiAgICAgICAgICAgIGxvYWRpbmdUZW1wbGF0ZTogbG9hZGluZ1RlbXBsYXRlLFxuICAgICAgICAgICAgdHJlZU5vZGVUZW1wbGF0ZTogdHJlZU5vZGVUZW1wbGF0ZSxcbiAgICAgICAgICAgIHRyZWVOb2RlV3JhcHBlclRlbXBsYXRlOiB0cmVlTm9kZVdyYXBwZXJUZW1wbGF0ZSxcbiAgICAgICAgICAgIHRyZWVOb2RlRnVsbFRlbXBsYXRlOiB0cmVlTm9kZUZ1bGxUZW1wbGF0ZVxuICAgICAgICAgIH1cIj5cbiAgICAgICAgICAgICAgPC90cmVlLW5vZGUtY29sbGVjdGlvbj5cbiAgICAgICAgICAgICAgPHRyZWUtbm9kZS1kcm9wLXNsb3RcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImVtcHR5LXRyZWUtZHJvcC1zbG90XCJcbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInRyZWVNb2RlbC5pc0VtcHR5VHJlZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgICBbZHJvcEluZGV4XT1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgIFtub2RlXT1cInRyZWVNb2RlbC52aXJ0dWFsUm9vdFwiPlxuICAgICAgICAgICAgICA8L3RyZWUtbm9kZS1kcm9wLXNsb3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L3RyZWUtdmlld3BvcnQ+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgVHJlZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIF9ub2RlczogYW55W107XG4gIF9vcHRpb25zOiBUcmVlT3B0aW9ucztcblxuICBAQ29udGVudENoaWxkKCdsb2FkaW5nVGVtcGxhdGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKCd0cmVlTm9kZVRlbXBsYXRlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHRyZWVOb2RlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoJ3RyZWVOb2RlV3JhcHBlclRlbXBsYXRlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHRyZWVOb2RlV3JhcHBlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKCd0cmVlTm9kZUZ1bGxUZW1wbGF0ZScsIHsgc3RhdGljOiBmYWxzZSB9KSB0cmVlTm9kZUZ1bGxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQFZpZXdDaGlsZCgndmlld3BvcnQnLCB7IHN0YXRpYzogZmFsc2UgfSkgdmlld3BvcnRDb21wb25lbnQ6IFRyZWVWaWV3cG9ydENvbXBvbmVudDtcblxuICAvLyBXaWxsIGJlIGhhbmRsZWQgaW4gbmdPbkNoYW5nZXNcbiAgQElucHV0KCkgc2V0IG5vZGVzKG5vZGVzOiBhbnlbXSkge1xuICB9O1xuXG4gIEBJbnB1dCgpIHNldCBvcHRpb25zKG9wdGlvbnM6IFRyZWVPcHRpb25zKSB7XG4gIH07XG5cbiAgQElucHV0KCkgc2V0IGZvY3VzZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1cyh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgc3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRTdGF0ZShzdGF0ZSk7XG4gIH1cblxuICBAT3V0cHV0KCkgdG9nZ2xlRXhwYW5kZWQ7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU7XG4gIEBPdXRwdXQoKSBub2RlQWN0aXZhdGU7XG4gIEBPdXRwdXQoKSBub2RlRGVhY3RpdmF0ZTtcbiAgQE91dHB1dCgpIHNlbGVjdDtcbiAgQE91dHB1dCgpIGRlc2VsZWN0O1xuICBAT3V0cHV0KCkgZm9jdXM7XG4gIEBPdXRwdXQoKSBibHVyO1xuICBAT3V0cHV0KCkgdXBkYXRlRGF0YTtcbiAgQE91dHB1dCgpIGluaXRpYWxpemVkO1xuICBAT3V0cHV0KCkgbW92ZU5vZGU7XG4gIEBPdXRwdXQoKSBjb3B5Tm9kZTtcbiAgQE91dHB1dCgpIGxvYWROb2RlQ2hpbGRyZW47XG4gIEBPdXRwdXQoKSBjaGFuZ2VGaWx0ZXI7XG4gIEBPdXRwdXQoKSBldmVudDtcbiAgQE91dHB1dCgpIHN0YXRlQ2hhbmdlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB0cmVlTW9kZWw6IFRyZWVNb2RlbCxcbiAgICBwdWJsaWMgdHJlZURyYWdnZWRFbGVtZW50OiBUcmVlRHJhZ2dlZEVsZW1lbnQpIHtcblxuICAgIHRyZWVNb2RlbC5ldmVudE5hbWVzLmZvckVhY2goKG5hbWUpID0+IHRoaXNbbmFtZV0gPSBuZXcgRXZlbnRFbWl0dGVyKCkpO1xuICAgIHRyZWVNb2RlbC5zdWJzY3JpYmVUb1N0YXRlKChzdGF0ZSkgPT4gdGhpcy5zdGF0ZUNoYW5nZS5lbWl0KHN0YXRlKSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdib2R5OiBrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlkb3duKCRldmVudCkge1xuICAgIGlmICghdGhpcy50cmVlTW9kZWwuaXNGb2N1c2VkKSByZXR1cm47XG4gICAgaWYgKGluY2x1ZGVzKFsnaW5wdXQnLCAndGV4dGFyZWEnXSxcbiAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZm9jdXNlZE5vZGUgPSB0aGlzLnRyZWVNb2RlbC5nZXRGb2N1c2VkTm9kZSgpO1xuXG4gICAgdGhpcy50cmVlTW9kZWwucGVyZm9ybUtleUFjdGlvbihmb2N1c2VkTm9kZSwgJGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JvZHk6IG1vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG9uTW91c2Vkb3duKCRldmVudCkge1xuICAgIGZ1bmN0aW9uIGlzT3V0c2lkZUNsaWNrKHN0YXJ0RWxlbWVudDogRWxlbWVudCwgbm9kZU5hbWU6IHN0cmluZykge1xuICAgICAgcmV0dXJuICFzdGFydEVsZW1lbnQgPyB0cnVlIDogc3RhcnRFbGVtZW50LmxvY2FsTmFtZSA9PT0gbm9kZU5hbWUgPyBmYWxzZSA6IGlzT3V0c2lkZUNsaWNrKHN0YXJ0RWxlbWVudC5wYXJlbnRFbGVtZW50LCBub2RlTmFtZSk7XG4gICAgfVxuXG4gICAgaWYgKGlzT3V0c2lkZUNsaWNrKCRldmVudC50YXJnZXQsICd0cmVlLXJvb3QnKSkge1xuICAgICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXMoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5vcHRpb25zIHx8IGNoYW5nZXMubm9kZXMpIHtcbiAgICAgIHRoaXMudHJlZU1vZGVsLnNldERhdGEoe1xuICAgICAgICBvcHRpb25zOiBjaGFuZ2VzLm9wdGlvbnMgJiYgY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZSxcbiAgICAgICAgbm9kZXM6IGNoYW5nZXMubm9kZXMgJiYgY2hhbmdlcy5ub2Rlcy5jdXJyZW50VmFsdWUsXG4gICAgICAgIGV2ZW50czogcGljayh0aGlzLCB0aGlzLnRyZWVNb2RlbC5ldmVudE5hbWVzKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2l6ZUNoYW5nZWQoKSB7XG4gICAgdGhpcy52aWV3cG9ydENvbXBvbmVudC5zZXRWaWV3cG9ydCgpO1xuICB9XG59XG4iXX0=

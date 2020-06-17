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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeMobxAutorunDirective } from './mobx-angular/tree-mobx-autorun.directive';
import { TREE_ACTIONS } from './models/tree-options.model';
import { KEYS } from './constants/keys';
import { TreeModel } from './models/tree.model';
import { TreeNode } from './models/tree-node.model';
import { TreeDraggedElement } from './models/tree-dragged-element.model';
import { TreeVirtualScroll } from './models/tree-virtual-scroll.model';
import { LoadingComponent } from './components/loading.component';
import { TreeComponent } from './components/tree.component';
import { TreeNodeComponent } from './components/tree-node.component';
import { TreeNodeContent } from './components/tree-node-content.component';
import { TreeNodeDropSlot } from './components/tree-node-drop-slot.component';
import { TreeNodeExpanderComponent } from './components/tree-node-expander.component';
import { TreeNodeChildrenComponent } from './components/tree-node-children.component';
import { TreeNodeCollectionComponent } from './components/tree-node-collection.component';
import { TreeNodeWrapperComponent } from './components/tree-node-wrapper.component';
import { TreeViewportComponent } from './components/tree-viewport.component';
import { TreeNodeCheckboxComponent } from './components/tree-node-checkbox.component';
import { TreeDropDirective } from './directives/tree-drop.directive';
import { TreeDragDirective } from './directives/tree-drag.directive';
import { TreeAnimateOpenDirective } from './directives/tree-animate-open.directive';
import './polyfills';
var TreeModule = /** @class */ (function() {
  function TreeModule() {}
  TreeModule_1 = TreeModule;
  TreeModule.forRoot = function() {
    return {
      ngModule: TreeModule_1,
      providers: [TreeDraggedElement]
    };
  };
  var TreeModule_1;
  TreeModule = TreeModule_1 = __decorate(
    [
      NgModule({
        declarations: [
          TreeComponent,
          TreeNodeComponent,
          TreeNodeContent,
          LoadingComponent,
          TreeDropDirective,
          TreeDragDirective,
          TreeNodeExpanderComponent,
          TreeNodeChildrenComponent,
          TreeNodeDropSlot,
          TreeNodeCollectionComponent,
          TreeViewportComponent,
          TreeNodeWrapperComponent,
          TreeNodeCheckboxComponent,
          TreeAnimateOpenDirective,
          TreeMobxAutorunDirective
        ],
        exports: [
          TreeComponent,
          TreeNodeComponent,
          TreeNodeContent,
          LoadingComponent,
          TreeDropDirective,
          TreeDragDirective,
          TreeNodeExpanderComponent,
          TreeNodeChildrenComponent,
          TreeNodeDropSlot,
          TreeNodeCollectionComponent,
          TreeViewportComponent,
          TreeNodeWrapperComponent,
          TreeNodeCheckboxComponent,
          TreeAnimateOpenDirective,
          TreeMobxAutorunDirective
        ],
        imports: [CommonModule],
        providers: []
      })
    ],
    TreeModule
  );
  return TreeModule;
})();
export { TreeModule };
export {
  TreeModel,
  TreeNode,
  TreeDraggedElement,
  TreeVirtualScroll,
  TREE_ACTIONS,
  KEYS,
  LoadingComponent,
  TreeAnimateOpenDirective,
  TreeComponent,
  TreeNodeComponent,
  TreeNodeWrapperComponent,
  TreeNodeContent,
  TreeDropDirective,
  TreeDragDirective,
  TreeNodeExpanderComponent,
  TreeNodeChildrenComponent,
  TreeNodeDropSlot,
  TreeNodeCollectionComponent,
  TreeViewportComponent,
  TreeNodeCheckboxComponent
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10cmVlLWNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9hbmd1bGFyLXRyZWUtY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUV0RixPQUFPLEVBR0wsWUFBWSxFQUNiLE1BQU0sNkJBQTZCLENBQUM7QUFPckMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM5RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMxRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNwRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUVwRixPQUFPLGFBQWEsQ0FBQztBQXdDckI7SUFBQTtJQU9BLENBQUM7bUJBUFksVUFBVTtJQUNkLGtCQUFPLEdBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVU7WUFDcEIsU0FBUyxFQUFFLENBQUMsa0JBQWtCLENBQUM7U0FDaEMsQ0FBQztJQUNKLENBQUM7O0lBTlUsVUFBVTtRQXRDdEIsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFO2dCQUNaLGFBQWE7Z0JBQ2IsaUJBQWlCO2dCQUNqQixlQUFlO2dCQUNmLGdCQUFnQjtnQkFDaEIsaUJBQWlCO2dCQUNqQixpQkFBaUI7Z0JBQ2pCLHlCQUF5QjtnQkFDekIseUJBQXlCO2dCQUN6QixnQkFBZ0I7Z0JBQ2hCLDJCQUEyQjtnQkFDM0IscUJBQXFCO2dCQUNyQix3QkFBd0I7Z0JBQ3hCLHlCQUF5QjtnQkFDekIsd0JBQXdCO2dCQUN4Qix3QkFBd0I7YUFDekI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsYUFBYTtnQkFDYixpQkFBaUI7Z0JBQ2pCLGVBQWU7Z0JBQ2YsZ0JBQWdCO2dCQUNoQixpQkFBaUI7Z0JBQ2pCLGlCQUFpQjtnQkFDakIseUJBQXlCO2dCQUN6Qix5QkFBeUI7Z0JBQ3pCLGdCQUFnQjtnQkFDaEIsMkJBQTJCO2dCQUMzQixxQkFBcUI7Z0JBQ3JCLHdCQUF3QjtnQkFDeEIseUJBQXlCO2dCQUN6Qix3QkFBd0I7Z0JBQ3hCLHdCQUF3QjthQUN6QjtZQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7T0FDVyxVQUFVLENBT3RCO0lBQUQsaUJBQUM7Q0FBQSxBQVBELElBT0M7U0FQWSxVQUFVO0FBU3ZCLE9BQU8sRUFDTCxTQUFTLEVBQ1QsUUFBUSxFQUNSLGtCQUFrQixFQUNsQixpQkFBaUIsRUFFakIsWUFBWSxFQUNaLElBQUksRUFLSixnQkFBZ0IsRUFDaEIsd0JBQXdCLEVBQ3hCLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsd0JBQXdCLEVBQ3hCLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLHlCQUF5QixFQUN6Qix5QkFBeUIsRUFDekIsZ0JBQWdCLEVBQ2hCLDJCQUEyQixFQUMzQixxQkFBcUIsRUFDckIseUJBQXlCLEVBRTFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRyZWVNb2J4QXV0b3J1bkRpcmVjdGl2ZSB9IGZyb20gJy4vbW9ieC1hbmd1bGFyL3RyZWUtbW9ieC1hdXRvcnVuLmRpcmVjdGl2ZSc7XG5cbmltcG9ydCB7XG4gIElBY3Rpb25IYW5kbGVyLFxuICBJQWN0aW9uTWFwcGluZyxcbiAgVFJFRV9BQ1RJT05TXG59IGZyb20gJy4vbW9kZWxzL3RyZWUtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQge1xuICBJQWxsb3dEcmFnRm4sXG4gIElBbGxvd0Ryb3BGbixcbiAgSVRyZWVPcHRpb25zLFxuICBJVHJlZVN0YXRlXG59IGZyb20gJy4vZGVmcy9hcGknO1xuaW1wb3J0IHsgS0VZUyB9IGZyb20gJy4vY29uc3RhbnRzL2tleXMnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlRHJhZ2dlZEVsZW1lbnQgfSBmcm9tICcuL21vZGVscy90cmVlLWRyYWdnZWQtZWxlbWVudC5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlVmlydHVhbFNjcm9sbCB9IGZyb20gJy4vbW9kZWxzL3RyZWUtdmlydHVhbC1zY3JvbGwubW9kZWwnO1xuaW1wb3J0IHsgTG9hZGluZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2FkaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVOb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGVDb250ZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTm9kZURyb3BTbG90IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS1kcm9wLXNsb3QuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVOb2RlRXhwYW5kZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLWV4cGFuZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTm9kZUNoaWxkcmVuQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS1jaGlsZHJlbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGVDb2xsZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS1jb2xsZWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTm9kZVdyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVWaWV3cG9ydENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLXZpZXdwb3J0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTm9kZUNoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS1jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZURyb3BEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdHJlZS1kcm9wLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUcmVlRHJhZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy90cmVlLWRyYWcuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRyZWVBbmltYXRlT3BlbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy90cmVlLWFuaW1hdGUtb3Blbi5kaXJlY3RpdmUnO1xuXG5pbXBvcnQgJy4vcG9seWZpbGxzJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVHJlZUNvbXBvbmVudCxcbiAgICBUcmVlTm9kZUNvbXBvbmVudCxcbiAgICBUcmVlTm9kZUNvbnRlbnQsXG4gICAgTG9hZGluZ0NvbXBvbmVudCxcbiAgICBUcmVlRHJvcERpcmVjdGl2ZSxcbiAgICBUcmVlRHJhZ0RpcmVjdGl2ZSxcbiAgICBUcmVlTm9kZUV4cGFuZGVyQ29tcG9uZW50LFxuICAgIFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQsXG4gICAgVHJlZU5vZGVEcm9wU2xvdCxcbiAgICBUcmVlTm9kZUNvbGxlY3Rpb25Db21wb25lbnQsXG4gICAgVHJlZVZpZXdwb3J0Q29tcG9uZW50LFxuICAgIFRyZWVOb2RlV3JhcHBlckNvbXBvbmVudCxcbiAgICBUcmVlTm9kZUNoZWNrYm94Q29tcG9uZW50LFxuICAgIFRyZWVBbmltYXRlT3BlbkRpcmVjdGl2ZSxcbiAgICBUcmVlTW9ieEF1dG9ydW5EaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRyZWVDb21wb25lbnQsXG4gICAgVHJlZU5vZGVDb21wb25lbnQsXG4gICAgVHJlZU5vZGVDb250ZW50LFxuICAgIExvYWRpbmdDb21wb25lbnQsXG4gICAgVHJlZURyb3BEaXJlY3RpdmUsXG4gICAgVHJlZURyYWdEaXJlY3RpdmUsXG4gICAgVHJlZU5vZGVFeHBhbmRlckNvbXBvbmVudCxcbiAgICBUcmVlTm9kZUNoaWxkcmVuQ29tcG9uZW50LFxuICAgIFRyZWVOb2RlRHJvcFNsb3QsXG4gICAgVHJlZU5vZGVDb2xsZWN0aW9uQ29tcG9uZW50LFxuICAgIFRyZWVWaWV3cG9ydENvbXBvbmVudCxcbiAgICBUcmVlTm9kZVdyYXBwZXJDb21wb25lbnQsXG4gICAgVHJlZU5vZGVDaGVja2JveENvbXBvbmVudCxcbiAgICBUcmVlQW5pbWF0ZU9wZW5EaXJlY3RpdmUsXG4gICAgVHJlZU1vYnhBdXRvcnVuRGlyZWN0aXZlXG4gIF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFRyZWVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtUcmVlRHJhZ2dlZEVsZW1lbnRdXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUcmVlTW9kZWwsXG4gIFRyZWVOb2RlLFxuICBUcmVlRHJhZ2dlZEVsZW1lbnQsXG4gIFRyZWVWaXJ0dWFsU2Nyb2xsLFxuICBJVHJlZU9wdGlvbnMsXG4gIFRSRUVfQUNUSU9OUyxcbiAgS0VZUyxcbiAgSUFjdGlvbk1hcHBpbmcsXG4gIElBY3Rpb25IYW5kbGVyLFxuICBJQWxsb3dEcm9wRm4sXG4gIElBbGxvd0RyYWdGbixcbiAgTG9hZGluZ0NvbXBvbmVudCxcbiAgVHJlZUFuaW1hdGVPcGVuRGlyZWN0aXZlLFxuICBUcmVlQ29tcG9uZW50LFxuICBUcmVlTm9kZUNvbXBvbmVudCxcbiAgVHJlZU5vZGVXcmFwcGVyQ29tcG9uZW50LFxuICBUcmVlTm9kZUNvbnRlbnQsXG4gIFRyZWVEcm9wRGlyZWN0aXZlLFxuICBUcmVlRHJhZ0RpcmVjdGl2ZSxcbiAgVHJlZU5vZGVFeHBhbmRlckNvbXBvbmVudCxcbiAgVHJlZU5vZGVDaGlsZHJlbkNvbXBvbmVudCxcbiAgVHJlZU5vZGVEcm9wU2xvdCxcbiAgVHJlZU5vZGVDb2xsZWN0aW9uQ29tcG9uZW50LFxuICBUcmVlVmlld3BvcnRDb21wb25lbnQsXG4gIFRyZWVOb2RlQ2hlY2tib3hDb21wb25lbnQsXG4gIElUcmVlU3RhdGVcbn07XG4iXX0=

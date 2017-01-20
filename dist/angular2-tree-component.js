"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var tree_options_model_1 = require("./models/tree-options.model");
exports.TREE_ACTIONS = tree_options_model_1.TREE_ACTIONS;
var keys_1 = require("./constants/keys");
exports.KEYS = keys_1.KEYS;
var tree_model_1 = require("./models/tree.model");
exports.TreeModel = tree_model_1.TreeModel;
var tree_node_model_1 = require("./models/tree-node.model");
exports.TreeNode = tree_node_model_1.TreeNode;
var tree_dragged_element_model_1 = require("./models/tree-dragged-element.model");
exports.TreeDraggedElement = tree_dragged_element_model_1.TreeDraggedElement;
var loading_component_1 = require("./components/loading.component");
exports.LoadingComponent = loading_component_1.LoadingComponent;
var deprecated_loading_component_1 = require("./components/deprecated-loading.component");
var tree_component_1 = require("./components/tree.component");
exports.TreeComponent = tree_component_1.TreeComponent;
var tree_node_component_1 = require("./components/tree-node.component");
exports.TreeNodeComponent = tree_node_component_1.TreeNodeComponent;
var tree_node_content_component_1 = require("./components/tree-node-content.component");
exports.TreeNodeContent = tree_node_content_component_1.TreeNodeContent;
var deprecated_tree_node_content_component_1 = require("./components/deprecated-tree-node-content.component");
var tree_node_drop_slot_component_1 = require("./components/tree-node-drop-slot.component");
exports.TreeNodeDropSlot = tree_node_drop_slot_component_1.TreeNodeDropSlot;
var tree_node_expander_component_1 = require("./components/tree-node-expander.component");
exports.TreeNodeExpanderComponent = tree_node_expander_component_1.TreeNodeExpanderComponent;
var tree_node_children_component_1 = require("./components/tree-node-children.component");
exports.TreeNodeChildrenComponent = tree_node_children_component_1.TreeNodeChildrenComponent;
var tree_drop_directive_1 = require("./directives/tree-drop.directive");
exports.TreeDropDirective = tree_drop_directive_1.TreeDropDirective;
var tree_drag_directive_1 = require("./directives/tree-drag.directive");
exports.TreeDragDirective = tree_drag_directive_1.TreeDragDirective;
var adhoc_component_factory_service_1 = require("./components/adhoc-component-factory.service");
require("./polyfills");
var deprecated_1 = require("./deprecated");
var exportedDirectives = [
    tree_component_1.TreeComponent,
    tree_node_component_1.TreeNodeComponent,
    tree_node_content_component_1.TreeNodeContent,
    tree_drop_directive_1.TreeDropDirective,
    tree_drag_directive_1.TreeDragDirective,
    tree_node_expander_component_1.TreeNodeExpanderComponent,
    tree_node_children_component_1.TreeNodeChildrenComponent,
    tree_node_drop_slot_component_1.TreeNodeDropSlot
];
var TreeModule = (function () {
    function TreeModule() {
    }
    return TreeModule;
}());
TreeModule = __decorate([
    core_1.NgModule({
        declarations: [
            loading_component_1.LoadingComponent
        ].concat(exportedDirectives),
        exports: exportedDirectives.slice(),
        imports: [
            common_1.CommonModule,
        ],
        providers: [
            tree_dragged_element_model_1.TreeDraggedElement
        ]
    })
], TreeModule);
exports.TreeModule = TreeModule;
var DeprecatedTreeModule = (function () {
    function DeprecatedTreeModule() {
        deprecated_1.deprecated('DeprecatedTreeModule', 'TreeModule for AoT compilation');
    }
    return DeprecatedTreeModule;
}());
DeprecatedTreeModule = __decorate([
    core_1.NgModule({
        declarations: [
            deprecated_loading_component_1.LoadingComponent,
            deprecated_tree_node_content_component_1.TreeNodeContent
        ],
        exports: [
            tree_component_1.TreeComponent,
            tree_drop_directive_1.TreeDropDirective,
            tree_drag_directive_1.TreeDragDirective
        ],
        imports: [
            common_1.CommonModule,
            TreeModule,
        ],
        providers: [
            adhoc_component_factory_service_1.AdHocComponentFactoryCreator
        ],
    }),
    __metadata("design:paramtypes", [])
], DeprecatedTreeModule);
exports.DeprecatedTreeModule = DeprecatedTreeModule;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TreeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItdHJlZS1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvYW5ndWxhcjItdHJlZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUE4QztBQUM5QywwQ0FBK0M7QUFFL0Msa0VBQTJGO0FBc0N6Rix5REFBWTtBQXBDZCx5Q0FBd0M7QUFxQ3RDLDJCQUFJO0FBcENOLGtEQUFnRDtBQStCOUMsMkNBQVM7QUE5QlgsNERBQW9EO0FBK0JsRCw4Q0FBUTtBQTlCVixrRkFBeUU7QUErQnZFLDZFQUFrQjtBQTlCcEIsb0VBQWtFO0FBcUNoRSxnRUFBZ0I7QUFwQ2xCLDBGQUEyRztBQUMzRyw4REFBNEQ7QUFvQzFELHVEQUFhO0FBbkNmLHdFQUFxRTtBQW9DbkUsb0VBQWlCO0FBbkNuQix3RkFBMkU7QUFvQ3pFLHdFQUFlO0FBbkNqQiw4R0FBbUg7QUFDbkgsNEZBQThFO0FBdUM1RSw0RUFBZ0I7QUF0Q2xCLDBGQUFzRjtBQW9DcEYsNkZBQXlCO0FBbkMzQiwwRkFBc0Y7QUFvQ3BGLDZGQUF5QjtBQW5DM0Isd0VBQXFFO0FBZ0NuRSxvRUFBaUI7QUEvQm5CLHdFQUFxRTtBQWdDbkUsb0VBQWlCO0FBL0JuQixnR0FBNEY7QUFFNUYsdUJBQXFCO0FBQ3JCLDJDQUEwQztBQUUxQyxJQUFNLGtCQUFrQixHQUFHO0lBQ3pCLDhCQUFhO0lBQ2IsdUNBQWlCO0lBQ2pCLDZDQUFlO0lBQ2YsdUNBQWlCO0lBQ2pCLHVDQUFpQjtJQUNqQix3REFBeUI7SUFDekIsd0RBQXlCO0lBQ3pCLGdEQUFnQjtDQUNqQixDQUFDO0FBc0NGLElBQWEsVUFBVTtJQUF2QjtJQUF5QixDQUFDO0lBQUQsaUJBQUM7QUFBRCxDQUFDLEFBQTFCLElBQTBCO0FBQWIsVUFBVTtJQWZ0QixlQUFRLENBQUM7UUFDUixZQUFZO1lBQ1Ysb0NBQWdCO2lCQUNiLGtCQUFrQixDQUN0QjtRQUNELE9BQU8sRUFDRixrQkFBa0IsUUFDdEI7UUFDRCxPQUFPLEVBQUU7WUFDUCxxQkFBWTtTQUNiO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsK0NBQWtCO1NBQ25CO0tBQ0YsQ0FBQztHQUNXLFVBQVUsQ0FBRztBQUFiLGdDQUFVO0FBbUJ2QixJQUFhLG9CQUFvQjtJQUMvQjtRQUNFLHVCQUFVLENBQUMsc0JBQXNCLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLG9CQUFvQjtJQWxCaEMsZUFBUSxDQUFDO1FBQ1IsWUFBWSxFQUFFO1lBQ1osK0NBQTBCO1lBQzFCLHdEQUF5QjtTQUMxQjtRQUNELE9BQU8sRUFBRTtZQUNQLDhCQUFhO1lBQ2IsdUNBQWlCO1lBQ2pCLHVDQUFpQjtTQUNsQjtRQUNELE9BQU8sRUFBRTtZQUNQLHFCQUFZO1lBQ1osVUFBVTtTQUNYO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsOERBQTRCO1NBQzdCO0tBQ0YsQ0FBQzs7R0FDVyxvQkFBb0IsQ0FJaEM7QUFKWSxvREFBb0I7O0FBS2pDLGtCQUFlLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFRSRUVfQUNUSU9OUywgSUFjdGlvbk1hcHBpbmcsIElBY3Rpb25IYW5kbGVyIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IElUcmVlT3B0aW9ucywgSUFsbG93RHJvcEZuIH0gZnJvbSAnLi9kZWZzL2FwaSc7XG5pbXBvcnQgeyBLRVlTIH0gZnJvbSAnLi9jb25zdGFudHMva2V5cyc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuL21vZGVscy90cmVlLm1vZGVsJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IFRyZWVEcmFnZ2VkRWxlbWVudCB9IGZyb20gJy4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcbmltcG9ydCB7IExvYWRpbmdDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9hZGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG9hZGluZ0NvbXBvbmVudCBhcyBEZXByZWNhdGVkTG9hZGluZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kZXByZWNhdGVkLWxvYWRpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTm9kZUNvbnRlbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVOb2RlQ29udGVudCBhcyBEZXByZWNhdGVkVHJlZU5vZGVDb250ZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2RlcHJlY2F0ZWQtdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVOb2RlRHJvcFNsb3QgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLWRyb3Atc2xvdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGVFeHBhbmRlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtZXhwYW5kZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNoaWxkcmVuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlRHJvcERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy90cmVlLWRyb3AuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRyZWVEcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RyZWUtZHJhZy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWRIb2NDb21wb25lbnRGYWN0b3J5Q3JlYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9hZGhvYy1jb21wb25lbnQtZmFjdG9yeS5zZXJ2aWNlJztcblxuaW1wb3J0ICcuL3BvbHlmaWxscyc7XG5pbXBvcnQgeyBkZXByZWNhdGVkIH0gZnJvbSAnLi9kZXByZWNhdGVkJztcblxuY29uc3QgZXhwb3J0ZWREaXJlY3RpdmVzID0gW1xuICBUcmVlQ29tcG9uZW50LFxuICBUcmVlTm9kZUNvbXBvbmVudCxcbiAgVHJlZU5vZGVDb250ZW50LFxuICBUcmVlRHJvcERpcmVjdGl2ZSxcbiAgVHJlZURyYWdEaXJlY3RpdmUsXG4gIFRyZWVOb2RlRXhwYW5kZXJDb21wb25lbnQsXG4gIFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQsXG4gIFRyZWVOb2RlRHJvcFNsb3Rcbl07XG5cbmV4cG9ydCB7XG4gIFRyZWVNb2RlbCxcbiAgVHJlZU5vZGUsXG4gIFRyZWVEcmFnZ2VkRWxlbWVudCxcbiAgSVRyZWVPcHRpb25zLFxuICBUUkVFX0FDVElPTlMsXG4gIEtFWVMsXG4gIElBY3Rpb25NYXBwaW5nLFxuICBJQWN0aW9uSGFuZGxlcixcbiAgSUFsbG93RHJvcEZuLFxuICBMb2FkaW5nQ29tcG9uZW50LFxuICBUcmVlQ29tcG9uZW50LFxuICBUcmVlTm9kZUNvbXBvbmVudCxcbiAgVHJlZU5vZGVDb250ZW50LFxuICBUcmVlRHJvcERpcmVjdGl2ZSxcbiAgVHJlZURyYWdEaXJlY3RpdmUsXG4gIFRyZWVOb2RlRXhwYW5kZXJDb21wb25lbnQsXG4gIFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQsXG4gIFRyZWVOb2RlRHJvcFNsb3Rcbn07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIExvYWRpbmdDb21wb25lbnQsXG4gICAgLi4uZXhwb3J0ZWREaXJlY3RpdmVzXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICAuLi5leHBvcnRlZERpcmVjdGl2ZXNcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgVHJlZURyYWdnZWRFbGVtZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVHJlZU1vZHVsZSB7fVxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVwcmVjYXRlZExvYWRpbmdDb21wb25lbnQsXG4gICAgRGVwcmVjYXRlZFRyZWVOb2RlQ29udGVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgVHJlZUNvbXBvbmVudCxcbiAgICBUcmVlRHJvcERpcmVjdGl2ZSxcbiAgICBUcmVlRHJhZ0RpcmVjdGl2ZVxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRyZWVNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEFkSG9jQ29tcG9uZW50RmFjdG9yeUNyZWF0b3JcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRGVwcmVjYXRlZFRyZWVNb2R1bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBkZXByZWNhdGVkKCdEZXByZWNhdGVkVHJlZU1vZHVsZScsICdUcmVlTW9kdWxlIGZvciBBb1QgY29tcGlsYXRpb24nKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVHJlZU1vZHVsZTtcblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19
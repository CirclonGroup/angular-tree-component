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
var tree_node_model_1 = require("../models/tree-node.model");
var TreeNodeDropSlot = (function () {
    function TreeNodeDropSlot() {
    }
    TreeNodeDropSlot.prototype.onDrop = function ($event) {
        this.node.mouseAction('drop', $event.event, {
            from: $event.element,
            to: { parent: this.node, index: this.dropIndex }
        });
    };
    TreeNodeDropSlot.prototype.allowDrop = function (element) {
        return this.node.options.allowDrop(element, { parent: this.node, index: this.dropIndex });
    };
    return TreeNodeDropSlot;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", tree_node_model_1.TreeNode)
], TreeNodeDropSlot.prototype, "node", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TreeNodeDropSlot.prototype, "dropIndex", void 0);
TreeNodeDropSlot = __decorate([
    core_1.Component({
        selector: 'TreeNodeDropSlot',
        encapsulation: core_1.ViewEncapsulation.None,
        styles: [
            '.node-drop-slot { display: block; height: 2px; width: 100%}',
            '.node-drop-slot.is-dragging-over { background: #ddffee; height: 20px; border: 2px dotted #888; }'
        ],
        template: "\n    <div\n      class=\"node-drop-slot\"\n      (treeDrop)=\"onDrop($event)\"\n      [treeAllowDrop]=\"allowDrop.bind(this)\">\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [])
], TreeNodeDropSlot);
exports.TreeNodeDropSlot = TreeNodeDropSlot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWRyb3Atc2xvdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy90cmVlLW5vZGUtZHJvcC1zbG90LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBQ3BFLDZEQUFxRDtBQWtCckQsSUFBYSxnQkFBZ0I7SUFJM0I7SUFDQSxDQUFDO0lBRUQsaUNBQU0sR0FBTixVQUFPLE1BQU07UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUMxQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDcEIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUU7U0FDakQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFTLEdBQVQsVUFBVSxPQUFPO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQWpCRCxJQWlCQztBQWhCVTtJQUFSLFlBQUssRUFBRTs4QkFBTywwQkFBUTs4Q0FBQztBQUNmO0lBQVIsWUFBSyxFQUFFOzttREFBbUI7QUFGaEIsZ0JBQWdCO0lBZjVCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLE1BQU0sRUFBRTtZQUNOLDZEQUE2RDtZQUM3RCxrR0FBa0c7U0FDbkc7UUFDRCxRQUFRLEVBQUUsa0pBTVQ7S0FDRixDQUFDOztHQUNXLGdCQUFnQixDQWlCNUI7QUFqQlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlRHJhZ2dlZEVsZW1lbnQgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdUcmVlTm9kZURyb3BTbG90JyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVzOiBbXG4gICAgJy5ub2RlLWRyb3Atc2xvdCB7IGRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6IDJweDsgd2lkdGg6IDEwMCV9JyxcbiAgICAnLm5vZGUtZHJvcC1zbG90LmlzLWRyYWdnaW5nLW92ZXIgeyBiYWNrZ3JvdW5kOiAjZGRmZmVlOyBoZWlnaHQ6IDIwcHg7IGJvcmRlcjogMnB4IGRvdHRlZCAjODg4OyB9J1xuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwibm9kZS1kcm9wLXNsb3RcIlxuICAgICAgKHRyZWVEcm9wKT1cIm9uRHJvcCgkZXZlbnQpXCJcbiAgICAgIFt0cmVlQWxsb3dEcm9wXT1cImFsbG93RHJvcC5iaW5kKHRoaXMpXCI+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVEcm9wU2xvdCB7XG4gIEBJbnB1dCgpIG5vZGU6IFRyZWVOb2RlO1xuICBASW5wdXQoKSBkcm9wSW5kZXg6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIG9uRHJvcCgkZXZlbnQpIHtcbiAgICB0aGlzLm5vZGUubW91c2VBY3Rpb24oJ2Ryb3AnLCAkZXZlbnQuZXZlbnQsIHtcbiAgICAgIGZyb206ICRldmVudC5lbGVtZW50LFxuICAgICAgdG86IHsgcGFyZW50OiB0aGlzLm5vZGUsIGluZGV4OiB0aGlzLmRyb3BJbmRleCB9XG4gICAgfSk7XG4gIH1cblxuICBhbGxvd0Ryb3AoZWxlbWVudCkge1xuICAgIHJldHVybiB0aGlzLm5vZGUub3B0aW9ucy5hbGxvd0Ryb3AoZWxlbWVudCwgeyBwYXJlbnQ6IHRoaXMubm9kZSwgaW5kZXg6IHRoaXMuZHJvcEluZGV4IH0pO1xuICB9XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==
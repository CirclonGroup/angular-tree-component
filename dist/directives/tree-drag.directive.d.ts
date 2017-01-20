import { Renderer, ElementRef, DoCheck } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
export declare class TreeDragDirective implements DoCheck {
    private el;
    private renderer;
    private treeDraggedElement;
    draggedElement: any;
    treeDragEnabled: any;
    constructor(el: ElementRef, renderer: Renderer, treeDraggedElement: TreeDraggedElement);
    ngDoCheck(): void;
    onDragStart(): void;
    onDragEnd(): void;
}

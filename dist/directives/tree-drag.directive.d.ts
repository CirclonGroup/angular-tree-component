import {
  AfterViewInit,
  DoCheck,
  ElementRef,
  NgZone,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
export declare class TreeDragDirective
  implements AfterViewInit, DoCheck, OnDestroy {
  private el;
  private renderer;
  private treeDraggedElement;
  private ngZone;
  draggedElement: any;
  treeDragEnabled: any;
  private readonly dragEventHandler;
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    treeDraggedElement: TreeDraggedElement,
    ngZone: NgZone
  );
  ngAfterViewInit(): void;
  ngDoCheck(): void;
  ngOnDestroy(): void;
  onDragStart(ev: any): void;
  onDrag(ev: any): void;
  onDragEnd(): void;
}

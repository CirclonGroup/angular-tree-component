import { AfterViewInit, Directive, DoCheck, ElementRef, HostListener, Input, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { TreeNode } from '../models/tree-node.model';

const DRAG_OVER_CLASS = 'is-dragging-over';

export interface DragElementEvent extends DragEvent { target: Element; }

@Directive({
  selector: '[treeDrag]'
})
export class TreeDragDirective implements AfterViewInit, DoCheck, OnDestroy {
  @Input('treeDrag') draggedElement: TreeNode;
  @Input() treeDragEnabled: boolean;
  private readonly dragEventHandler: (event: DragEvent) => void;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private treeDraggedElement: TreeDraggedElement<TreeNode>,
    private ngZone: NgZone
  ) {
    this.dragEventHandler = this.onDrag.bind(this);
  }

  ngAfterViewInit(): void {
    const element: HTMLElement = this.element.nativeElement;
    this.ngZone.runOutsideAngular(() => {
      element.addEventListener('drag', this.dragEventHandler);
    });
  }

  ngDoCheck(): void {
    this.renderer.setAttribute(this.element.nativeElement, 'draggable', this.treeDragEnabled ? 'true' : 'false');
  }

  ngOnDestroy(): void {
    const element: HTMLElement = this.element.nativeElement;
    element.removeEventListener('drag', this.dragEventHandler);
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragElementEvent) {
    // setting the data is required by firefox
    event.dataTransfer.setData('text', event.target.id);
    this.treeDraggedElement.set(this.draggedElement);
    if (this.draggedElement.mouseAction) {
      this.draggedElement.mouseAction('dragStart', event);
    }
  }

  onDrag(event: DragEvent) {
    if (this.draggedElement.mouseAction) {
      this.draggedElement.mouseAction('drag', event);
    }
  }

  @HostListener('dragend') onDragEnd(): void {
    if (this.draggedElement.mouseAction) {
      this.draggedElement.mouseAction('dragEnd');
    }
    this.treeDraggedElement.set(null);
  }
}

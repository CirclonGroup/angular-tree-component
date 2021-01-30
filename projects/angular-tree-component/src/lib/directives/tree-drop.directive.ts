import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { TreeNode } from '../models/tree-node.model';

const DRAG_OVER_CLASS = 'is-dragging-over';
const DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';

@Directive({
  selector: '[treeDrop]'
})
export class TreeDropDirective implements AfterViewInit, OnDestroy {
  @Input() allowDragoverStyling = true;
  @Output('treeDrop') onDropCallback = new EventEmitter();
  @Output('treeDropDragOver') onDragOverCallback = new EventEmitter();
  @Output('treeDropDragLeave') onDragLeaveCallback = new EventEmitter();
  @Output('treeDropDragEnter') onDragEnterCallback = new EventEmitter();
  private readonly dragOverEventHandler: (event: DragEvent) => void;
  private readonly dragEnterEventHandler: (event: DragEvent) => void;
  private readonly dragLeaveEventHandler: (event: DragEvent) => void;

  private _allowDrop = (element: TreeNode, $event: DragEvent) => true;

  @Input() set treeAllowDrop(allowDrop: boolean | ((element: TreeNode, $event: DragEvent) => boolean)) {
    if (allowDrop instanceof Function) {
      this._allowDrop = allowDrop;
    }
    else this._allowDrop = (element: TreeNode, $event: DragEvent) => allowDrop;
  }

  allowDrop($event: DragEvent): boolean {
    return this._allowDrop(this.treeDraggedElement.get(), $event);
  }

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private treeDraggedElement: TreeDraggedElement<TreeNode>,
    private ngZone: NgZone
  ) {
    this.dragOverEventHandler = this.onDragOver.bind(this);
    this.dragEnterEventHandler = this.onDragEnter.bind(this);
    this.dragLeaveEventHandler = this.onDragLeave.bind(this);
  }

  ngAfterViewInit(): void {
    const element: HTMLElement = this.element.nativeElement;
    this.ngZone.runOutsideAngular(() => {
      element.addEventListener('dragover', this.dragOverEventHandler);
      element.addEventListener('dragenter', this.dragEnterEventHandler);
      element.addEventListener('dragleave', this.dragLeaveEventHandler);
    });
  }

  ngOnDestroy(): void {
    const element: HTMLElement = this.element.nativeElement;
    element.removeEventListener('dragover', this.dragOverEventHandler);
    element.removeEventListener('dragenter', this.dragEnterEventHandler);
    element.removeEventListener('dragleave', this.dragLeaveEventHandler);
  }

  onDragOver($event: DragEvent): void {
    if (!this.allowDrop($event)) {
      if (this.allowDragoverStyling) {
        return this.addDisabledClass();
      }
      return;
    }

    this.onDragOverCallback.emit({ event: $event, element: this.treeDraggedElement.get() });

    $event.preventDefault();
    if (this.allowDragoverStyling) {
      this.addClass();
    }
  }

  onDragEnter($event: DragEvent): void {
    if (!this.allowDrop($event)) return;

    $event.preventDefault();
    this.onDragEnterCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
  }

  onDragLeave($event: DragEvent): void {
    if (!this.allowDrop($event)) {
      if (this.allowDragoverStyling) {
        return this.removeDisabledClass();
      }
      return;
    }
    this.onDragLeaveCallback.emit({ event: $event, element: this.treeDraggedElement.get() });

    if (this.allowDragoverStyling) {
      this.removeClass();
    }
  }

  @HostListener('drop', ['$event'])
  onDrop($event: DragEvent) {
    if (!this.allowDrop($event)) return;

    $event.preventDefault();
    this.onDropCallback.emit({ event: $event, element: this.treeDraggedElement.get() });

    if (this.allowDragoverStyling) {
      this.removeClass();
    }
    this.treeDraggedElement.set(null);
  }

  private addClass(): void {
    this.renderer.addClass(this.element.nativeElement, DRAG_OVER_CLASS);
  }

  private removeClass(): void {
    this.renderer.removeClass(this.element.nativeElement, DRAG_OVER_CLASS);
  }

  private addDisabledClass(): void {
    this.renderer.addClass(this.element.nativeElement, DRAG_DISABLED_CLASS);
  }

  private removeDisabledClass(): void {
    this.renderer.removeClass(this.element.nativeElement, DRAG_DISABLED_CLASS);
  }
}

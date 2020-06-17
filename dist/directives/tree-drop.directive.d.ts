import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
export declare class TreeDropDirective implements AfterViewInit, OnDestroy {
  private el;
  private renderer;
  private treeDraggedElement;
  private ngZone;
  allowDragoverStyling: boolean;
  onDropCallback: EventEmitter<any>;
  onDragOverCallback: EventEmitter<any>;
  onDragLeaveCallback: EventEmitter<any>;
  onDragEnterCallback: EventEmitter<any>;
  private readonly dragOverEventHandler;
  private readonly dragEnterEventHandler;
  private readonly dragLeaveEventHandler;
  private _allowDrop;
  treeAllowDrop: any;
  allowDrop($event: any): boolean;
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    treeDraggedElement: TreeDraggedElement,
    ngZone: NgZone
  );
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  onDragOver($event: any): void;
  onDragEnter($event: any): void;
  onDragLeave($event: any): void;
  onDrop($event: any): void;
  private addClass;
  private removeClass;
  private addDisabledClass;
  private removeDisabledClass;
}

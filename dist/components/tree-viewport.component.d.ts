import {
  ElementRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
  NgZone
} from '@angular/core';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { Cancelable } from 'lodash';
export declare class TreeViewportComponent
  implements AfterViewInit, OnInit, OnDestroy {
  private elementRef;
  private ngZone;
  virtualScroll: TreeVirtualScroll;
  setViewport: (() => void) & Cancelable;
  private readonly scrollEventHandler;
  constructor(
    elementRef: ElementRef,
    ngZone: NgZone,
    virtualScroll: TreeVirtualScroll
  );
  ngOnInit(): void;
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  getTotalHeight(): string;
}

import {
  Component,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit,
  OnInit,
  OnDestroy,
  NgZone
} from '@angular/core';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { TREE_EVENTS } from '../constants/events';
import { throttle } from 'lodash-es';

@Component({
  selector: 'tree-viewport',
  styles: [],
  providers: [TreeVirtualScroll],
  template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div [style.height]="getTotalHeight()">
        <ng-content></ng-content>
      </div>
    </ng-container>
  `
})
export class TreeViewportComponent implements AfterViewInit, OnInit, OnDestroy {
  setViewport = throttle(() => {
    this.virtualScroll.setViewport(this.elementRef.nativeElement);
  }, 17);
  private readonly scrollEventHandler: ($event: Event) => void;

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
    public virtualScroll: TreeVirtualScroll
  ) {
    this.scrollEventHandler = this.setViewport.bind(this);
  }

  ngOnInit(): void {
    this.virtualScroll.init();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setViewport();
      this.virtualScroll.fireEvent({ eventName: TREE_EVENTS.initialized });
    });
    let el: HTMLElement = this.elementRef.nativeElement;
    this.ngZone.runOutsideAngular(() => {
      el.addEventListener('scroll', this.scrollEventHandler);
    });
  }

  ngOnDestroy(): void {
    this.virtualScroll.clear();
    let el: HTMLElement = this.elementRef.nativeElement;
    el.removeEventListener('scroll', this.scrollEventHandler);
  }

  getTotalHeight(): string {
    return (
      (this.virtualScroll.isEnabled() &&
        this.virtualScroll.totalHeight + 'px') ||
      'auto'
    );
  }
}

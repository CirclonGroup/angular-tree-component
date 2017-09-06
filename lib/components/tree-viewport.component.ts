import {
  Component, ElementRef, ViewEncapsulation, HostListener, AfterViewInit, OnInit, OnDestroy
} from '@angular/core';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { TREE_EVENTS } from '../constants/events';

@Component({
  selector: 'tree-viewport',
  styles: [],
  providers: [TreeVirtualScroll],
  template: `
    <ng-container *mobxAutorun>
      <div [style.height]="getTotalHeight()">
        <ng-content></ng-content>
      </div>
    </ng-container>
  `
})
export class TreeViewportComponent implements AfterViewInit, OnInit, OnDestroy {
  constructor(
    private elementRef: ElementRef,
    public virtualScroll: TreeVirtualScroll) {
  }

  ngOnInit() {
    this.virtualScroll.init();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setViewport();
      this.virtualScroll.fireEvent({ eventName: TREE_EVENTS.initialized });
    });
  }

  ngOnDestroy() {
    this.virtualScroll.clear();
  }

  getTotalHeight() {
    return this.virtualScroll.isEnabled() && this.virtualScroll.totalHeight + 'px' || 'auto';
  }

  @HostListener('scroll', ['$event'])
  onScroll() {
    this.setViewport();
  }

  setViewport() {
    this.virtualScroll.setViewport(this.elementRef.nativeElement);
  }
}

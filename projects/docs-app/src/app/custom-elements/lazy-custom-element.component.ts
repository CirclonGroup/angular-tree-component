import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ElementsLoader } from './elements-loader';
import { Logger } from '../shared/logger.service';

@Component({
    selector: 'aio-lazy-ce',
    template: '',
    standalone: false
})
export class LazyCustomElementComponent implements OnInit {
  @Input() selector = '';

  constructor(
    private elementRef: ElementRef,
    private elementsLoader: ElementsLoader,
    private logger: Logger,
  ) {}

  ngOnInit() {
    if (!this.selector || /[^\w-]/.test(this.selector)) {
      this.logger.error(new Error(`Invalid selector for 'aio-lazy-ce': ${this.selector}`));
      return;
    }

    this.elementRef.nativeElement.innerHTML = `<${this.selector}></${this.selector}>`;
    this.elementsLoader.loadCustomElement(this.selector);
  }
}

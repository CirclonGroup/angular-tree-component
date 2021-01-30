import { Directive, Input, Renderer2, TemplateRef, ViewContainerRef, EmbeddedViewRef } from '@angular/core';

const EASE_ACCELERATION = 1.005;

@Directive({
  selector: '[treeAnimateOpen]'
})
export class TreeAnimateOpenDirective<T extends HTMLElement, C> {
  private _isOpen: boolean;

  @Input('treeAnimateOpenSpeed') animateSpeed: number;
  @Input('treeAnimateOpenAcceleration') animateAcceleration: number;
  @Input('treeAnimateOpenEnabled') isEnabled: boolean;

  @Input('treeAnimateOpen')
  set isOpen(value: boolean) {
    if (value) {
      this._show();
      if (this.isEnabled && this._isOpen === false) {
        this._animateOpen();
      }
    } else {
      this.isEnabled ? this._animateClose() : this._hide();
    }
    this._isOpen = !!value;
  };

  private innerElement: T;

  constructor(
    private renderer: Renderer2,
    private templateRef: TemplateRef<C>,
    private viewContainerRef: ViewContainerRef) {
  }

  private _show(): void {
    if (this.innerElement) return;

    // create child view
    this.innerElement = this.viewContainerRef.createEmbeddedView(this.templateRef).rootNodes[0];
  }

  private _hide(): void {
    this.viewContainerRef.clear();
    this.innerElement = null;
  }

  private _animateOpen(): void {
    let delta = this.animateSpeed;
    let ease = this.animateAcceleration;
    let maxHeight = 0;

    // set height to 0
    this.renderer.setStyle(this.innerElement, 'max-height', `0`);

    // increase maxHeight until height doesn't change
    setTimeout(() => { // Allow inner element to create its content
      const i: number = setInterval(() => {
        if (!this._isOpen || !this.innerElement) return clearInterval(i);

        maxHeight += delta;
        const roundedMaxHeight: number = Math.round(maxHeight);

        this.renderer.setStyle(this.innerElement, 'max-height', `${roundedMaxHeight}px`);
        const height: number = this.innerElement.getBoundingClientRect
          ? this.innerElement.getBoundingClientRect().height
          : 0; // TBD use renderer

        delta *= ease;
        ease *= EASE_ACCELERATION;
        if (height < roundedMaxHeight) {
          // Make maxHeight auto because animation finished and container might change height later on
          this.renderer.setStyle(this.innerElement, 'max-height', null);
          clearInterval(i);
        }
      }, 17);
    });
  }

  private _animateClose(): void {
    if (!this.innerElement) return;

    let delta: number = this.animateSpeed;
    let ease: number = this.animateAcceleration;
    let height: number = this.innerElement.getBoundingClientRect().height; // TBD use renderer

    // slowly decrease maxHeight to 0, starting from current height
    const i: number = setInterval(() => {
      if (this._isOpen || !this.innerElement) return clearInterval(i);

      height -= delta;
      this.renderer.setStyle(this.innerElement, 'max-height', `${height}px`);
      delta *= ease;
      ease *= EASE_ACCELERATION;

      if (height <= 0) {
        // after animation complete - remove child element
        this.viewContainerRef.clear();
        this.innerElement = null;
        clearInterval(i);
      }
    }, 17);
  }
}

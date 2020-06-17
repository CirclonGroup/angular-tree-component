import { Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

export declare class TreeAnimateOpenDirective {
  private _show;
  private _hide;
  private _animateOpen;
  private _animateClose;
  private renderer;
  private templateRef;
  private viewContainerRef;
  private _isOpen;
  private innerElement;
  animateSpeed: number;
  animateAcceleration: number;
  isEnabled: boolean;
  isOpen: boolean;

  constructor(
    renderer: Renderer2,
    templateRef: TemplateRef<any>,
    viewContainerRef: ViewContainerRef
  );
}

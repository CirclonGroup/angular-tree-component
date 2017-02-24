import { Directive, Renderer, ElementRef } from '@angular/core'

/**
 * this directive is attached to the input of the edit node template.
 * it will set the focus on the input and select all text.
 */
@Directive({
  selector : '[focus-input]'
})
export class FocusInputDirective {
  constructor(public renderer: Renderer, public elementRef: ElementRef) {}

  ngOnInit() {
    this.renderer.invokeElementMethod(
      this.elementRef.nativeElement, 'focus', []);
      setTimeout(()=>{
        this.renderer.invokeElementMethod(
        this.elementRef.nativeElement, 'select', []);
      },100);
  }
}
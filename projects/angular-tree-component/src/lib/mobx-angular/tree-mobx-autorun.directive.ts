import {
  Directive,
  ViewContainerRef,
  TemplateRef,
  OnInit,
  OnDestroy,
  Input,
  EmbeddedViewRef
} from '@angular/core';
import { autorun } from 'mobx';

@Directive({ selector: '[treeMobxAutorun]' })
export class TreeMobxAutorunDirective implements OnInit, OnDestroy {
  protected templateBindings = {};
  protected dispose: any;
  protected view: EmbeddedViewRef<any>;
  @Input() treeMobxAutorun;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.view = this.viewContainer.createEmbeddedView(this.templateRef);

    if (this.dispose) {
      this.dispose();
    }

    if (this.shouldDetach()) {
      this.view.detach();
    }
    this.autoDetect(this.view);
  }

  shouldDetach() {
    return this.treeMobxAutorun && this.treeMobxAutorun.detach;
  }

  autoDetect(view: EmbeddedViewRef<any>) {
    this.dispose = autorun(() => view.detectChanges());
  }

  ngOnDestroy() {
    if (this.dispose) {
      this.dispose();
    }
  }
}

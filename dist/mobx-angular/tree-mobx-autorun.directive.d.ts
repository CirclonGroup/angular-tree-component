import {
  ViewContainerRef,
  TemplateRef,
  OnInit,
  OnDestroy,
  EmbeddedViewRef
} from '@angular/core';
export declare class TreeMobxAutorunDirective implements OnInit, OnDestroy {
  protected templateRef: TemplateRef<any>;
  protected viewContainer: ViewContainerRef;
  protected templateBindings: {};
  protected dispose: any;
  protected view: EmbeddedViewRef<any>;
  treeMobxAutorun: any;
  constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef);
  ngOnInit(): void;
  shouldDetach(): any;
  autoDetect(view: EmbeddedViewRef<any>): void;
  ngOnDestroy(): void;
}

import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  Subject,
  Observable,
  BehaviorSubject,
  EMPTY,
  fromEvent,
  merge
} from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { TreeNode } from '../models/tree-node.model';

interface EventWithActionName {
  event: Event;
  actionName: string;
}

@Component({
  selector: 'tree-node-wrapper' ,
  encapsulation: ViewEncapsulation.None ,
  styles: [] ,
  template: `
      <div *ngIf="!templates.treeNodeWrapperTemplate" class="node-wrapper" [style.padding-left]="node.getNodePadding()">
          <tree-node-checkbox *ngIf="node.options.useCheckbox" [node]="node"></tree-node-checkbox>
          <tree-node-expander [node]="node"></tree-node-expander>
          <div class="node-content-wrapper"
               #nodeContentWrapper
               [class.node-content-wrapper-active]="node.isActive"
               [class.node-content-wrapper-focused]="node.isFocused"
               (treeDrop)="node.onDrop($event)"
               (treeDropDragOver)="node.mouseAction('dragOver', $event)"
               (treeDropDragLeave)="node.mouseAction('dragLeave', $event)"
               (treeDropDragEnter)="node.mouseAction('dragEnter', $event)"
               [treeAllowDrop]="node.allowDrop"
               [allowDragoverStyling]="node.allowDragoverStyling()"
               [treeDrag]="node"
               [treeDragEnabled]="node.allowDrag()">

              <tree-node-content [node]="node" [index]="index" [template]="templates.treeNodeTemplate">
              </tree-node-content>
          </div>
      </div>
      <ng-container
              [ngTemplateOutlet]="templates.treeNodeWrapperTemplate"
              [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index, templates: templates }">
      </ng-container>
  `
})
export class TreeNodeWrapperComponent implements OnInit, OnDestroy {

  @Input() node: TreeNode;
  @Input() index: number;
  @Input() templates: any;

  /** The native `<div class="node-content-wrapper"></div>` element. */
  @ViewChild('nodeContentWrapper', { static: false })
  set nodeContentWrapper(
    nodeContentWrapper: ElementRef<HTMLElement> | undefined
  ) {
    this.nodeContentWrapper$.next(nodeContentWrapper);
  }

  /**
   * The subject used to store the native `<div class="node-content-wrapper"></div>` since
   * it's located within the `ngIf` directive. It might be set asynchronously whenever the condition
   * is met. Having subject makes the code reactive and cancellable (e.g. event listeners will be
   * automatically removed and re-added through the `switchMap` below).
   */
  private nodeContentWrapper$ = new BehaviorSubject<
    ElementRef<HTMLElement> | undefined
  >(undefined);

  private destroy$ = new Subject<void>();

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.nodeContentWrapper$
      .pipe(
        switchMap(nodeContentWrapper =>
          nodeContentWrapper
            ? new Observable<EventWithActionName>(subscriber =>
                // Caretaker note: we explicitly should call `subscribe()` within the root zone.
                // `runOutsideAngular(() => fromEvent(...))` will just create an observable within the root zone,
                // but `addEventListener` is called when the `fromEvent` is subscribed.
                this.ngZone.runOutsideAngular(() =>
                  merge<EventWithActionName>(
                    // (click)="node.mouseAction('click', $event)"
                    createEventObservable(nodeContentWrapper, 'click', 'click'),
                    // (dblclick)="node.mouseAction('dblClick', $event)"
                    createEventObservable(
                      nodeContentWrapper,
                      'dblclick',
                      'dblClick'
                    ),
                    // (mouseover)="node.mouseAction('mouseOver', $event)"
                    createEventObservable(
                      nodeContentWrapper,
                      'mouseover',
                      'mouseOver'
                    ),
                    // (mouseout)="node.mouseAction('mouseOut', $event)"
                    createEventObservable(
                      nodeContentWrapper,
                      'mouseout',
                      'mouseOut'
                    ),
                    // (contextmenu)="node.mouseAction('contextMenu', $event)"
                    createEventObservable(
                      nodeContentWrapper,
                      'contextmenu',
                      'contextMenu'
                    )
                  ).subscribe(subscriber)
                )
              )
            : EMPTY
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(({ actionName, event }) => {
        this.node.mouseAction(actionName, event);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}

function createEventObservable(
  nodeContentWrapper: ElementRef<HTMLElement>,
  eventName: string,
  actionName: string
): Observable<EventWithActionName> {
  return fromEvent(nodeContentWrapper.nativeElement, eventName).pipe(
    map(event => ({ event, actionName }))
  );
}

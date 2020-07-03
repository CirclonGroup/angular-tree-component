import { action as mobxAction } from 'mobx';
import { computed as mobxComputed } from 'mobx';
import { observable as mobxObservable } from 'mobx';

// Re-export mobx operators to be able to use inside components with AOT:
export function actionInternal(...args) {
  return (mobxAction as any)(...args);
}
export const action: typeof mobxAction = Object.assign(
  actionInternal,
  mobxAction
) as any;

function computedInternal(...args) {
  return (mobxComputed as any)(...args);
}
export const computed: typeof mobxComputed = Object.assign(
  computedInternal,
  mobxComputed
) as any;

function observableInternal(...args) {
  return (mobxObservable as any)(...args);
}

export const observable: typeof mobxObservable = Object.assign(
  observableInternal,
  mobxObservable
) as any;

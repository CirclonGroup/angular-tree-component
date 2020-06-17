import { action as mobxAction } from 'mobx';
import { computed as mobxComputed } from 'mobx';
import { observable as mobxObservable } from 'mobx';
export declare function actionInternal(...args: any[]): any;
export declare const action: typeof mobxAction;
export declare const computed: typeof mobxComputed;
export declare const observable: typeof mobxObservable;

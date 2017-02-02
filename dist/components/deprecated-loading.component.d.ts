import { ViewContainerRef, ComponentFactoryResolver, TemplateRef, AfterViewInit } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { AdHocComponentFactoryCreator } from './adhoc-component-factory.service';
export declare class LoadingComponent implements AfterViewInit {
    private treeModel;
    private componentFactoryResolver;
    private viewContainerRef;
    private adHocComponentFactoryCreator;
    loadingTemplate: TemplateRef<any>;
    constructor(treeModel: TreeModel, componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, adHocComponentFactoryCreator: AdHocComponentFactoryCreator);
    ngAfterViewInit(): void;
    _loadTreeNodeContent(): void;
}

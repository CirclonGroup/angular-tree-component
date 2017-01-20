import { ComponentFactoryResolver, AfterViewInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { TreeModel } from '../models/tree.model';
import { AdHocComponentFactoryCreator } from './adhoc-component-factory.service';
export interface ITreeNodeTemplate {
    node: TreeNode;
    context: any;
}
export declare class TreeNodeContent implements AfterViewInit {
    private treeModel;
    private componentFactoryResolver;
    private viewContainerRef;
    private adHocComponentFactoryCreator;
    node: TreeNode;
    treeNodeContentTemplate: TemplateRef<ITreeNodeTemplate>;
    constructor(treeModel: TreeModel, componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, adHocComponentFactoryCreator: AdHocComponentFactoryCreator);
    ngAfterViewInit(): void;
    _loadTreeNodeContent(): void;
}

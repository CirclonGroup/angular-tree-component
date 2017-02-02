import { ElementRef, AfterViewInit } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
export declare class TreeNodeComponent implements AfterViewInit {
    private elementRef;
    node: TreeNode;
    index: number;
    templates: any;
    constructor(elementRef: ElementRef);
    ngAfterViewInit(): void;
}

import { ComponentFactory, Compiler } from '@angular/core';
export declare class AdHocComponentFactoryCreator {
    private compiler;
    factories: ComponentFactory<any>[];
    constructor(compiler: Compiler);
    getFactory(component: any): ComponentFactory<any>;
    _createAdHocComponentFactory(component: any): ComponentFactory<any>;
}

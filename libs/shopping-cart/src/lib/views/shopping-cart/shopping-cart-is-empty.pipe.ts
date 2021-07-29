// tslint:disable:use-pipe-transform-interface

import { NgModule, Pipe } from '@angular/core';
import { FunctionPipe } from '@holisticon/common';
import { shoppingCartIsEmpty } from '../../domain';

@Pipe({
    name: 'shoppingCartIsEmpty'
})
export class ShoppingCartIsEmptyPipe extends FunctionPipe {
    constructor() {
        super(shoppingCartIsEmpty);
    }
}

@NgModule({
    declarations: [ShoppingCartIsEmptyPipe],
    exports: [ShoppingCartIsEmptyPipe]
})
export class ShoppingCartIsEmptyModule { }

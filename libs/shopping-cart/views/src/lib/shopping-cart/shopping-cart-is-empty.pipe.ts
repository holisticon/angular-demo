// tslint:disable:use-pipe-transform-interface

import { NgModule, Pipe } from '@angular/core';
import { FunctionPipe } from '@ngxp/common';
import { shoppingCartIsEmpty } from '@ngxp/shopping-cart/domain';

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
export class ShoppingCartIsEmptyModule {}
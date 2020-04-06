// tslint:disable:use-pipe-transform-interface

import { Pipe } from '@angular/core';
import { FunctionPipe } from '@ngxp/common';
import { shoppingCartIsEmpty } from '../shopping-cart.util';

@Pipe({
    name: 'shoppingCartIsEmpty'
})
export class ShoppingCartIsEmptyPipe extends FunctionPipe {
    constructor() {
        super(shoppingCartIsEmpty);
    }
}

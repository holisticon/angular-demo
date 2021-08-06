import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FunctionPipe } from '@holisticon/common';
import { shoppingCartIsEmpty } from '../../domain';

@Pipe({
    name: 'shoppingCartIsEmpty'
})
export class ShoppingCartIsEmptyPipe extends FunctionPipe implements PipeTransform {
    constructor() {
        super(shoppingCartIsEmpty);
    }
}

@NgModule({
    declarations: [ShoppingCartIsEmptyPipe],
    exports: [ShoppingCartIsEmptyPipe]
})
export class ShoppingCartIsEmptyModule { }

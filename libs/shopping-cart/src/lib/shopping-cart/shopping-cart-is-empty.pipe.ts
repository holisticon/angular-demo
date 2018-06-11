import { Pipe, PipeTransform } from '@angular/core';
import { ShoppingCart, shoppingCartIsEmpty } from '@luchsamapparat/shopping-cart-common';

@Pipe({
    name: 'shoppingCartIsEmpty'
})
export class ShoppingCartIsEmptyPipe implements PipeTransform {

    transform(shoppingCart: ShoppingCart | null) {
        return shoppingCartIsEmpty(shoppingCart);
    }
}

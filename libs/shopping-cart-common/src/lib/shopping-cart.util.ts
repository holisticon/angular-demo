import { isEmpty, isNull } from 'lodash-es';
import { ShoppingCart } from './shopping-cart.model';

export function shoppingCartIsEmpty(shoppingCart: ShoppingCart) {
    if (isNull(shoppingCart)) {
        return true;
    }

    return isEmpty(shoppingCart.items);
}

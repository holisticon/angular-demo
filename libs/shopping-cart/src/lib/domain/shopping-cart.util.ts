import { isEmpty, isNull } from 'lodash-es';
import { ShoppingCart } from './shopping-cart';

export function shoppingCartIsEmpty(shoppingCart: ShoppingCart | null) {
    if (isNull(shoppingCart)) {
        return true;
    }

    return isEmpty(shoppingCart.items);
}

import { shoppingCartIsEmpty } from '@ngxp/shopping-cart/domain';
import { emptyShoppingCart, shoppingCart } from '@ngxp/shopping-cart/domain/test';
import { ShoppingCartIsEmptyPipe } from './shopping-cart-is-empty.pipe';

describe('ShoppingCartIsEmptyPipe', () => {
    let pipe: ShoppingCartIsEmptyPipe;

    beforeEach(() => {
        pipe = new ShoppingCartIsEmptyPipe();
    });

    it('delegates to the shoppingCartIsEmpty utility method', () => {
        [
            null,
            shoppingCart,
            emptyShoppingCart
        ]
            .forEach(value => expect(pipe.transform(value)).toBe(shoppingCartIsEmpty(value)));
    });
});

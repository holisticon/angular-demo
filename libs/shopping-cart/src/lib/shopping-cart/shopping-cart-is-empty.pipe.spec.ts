import { ShoppingCart, shoppingCartIsEmpty } from '@luchsamapparat/shopping-cart-common';
import { ShoppingCartIsEmptyPipe } from './shopping-cart-is-empty.pipe';
import { shoppingCartBuilder, shoppingCart, emptyShoppingCart } from '@luchsamapparat/shopping-cart-common/test';

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
            .forEach(value => {
                expect(pipe.transform(value)).toBe(shoppingCartIsEmpty(value));

            });
    });

});

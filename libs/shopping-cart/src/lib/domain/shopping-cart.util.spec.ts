import { emptyShoppingCart, shoppingCart } from '@holisticon/shopping-cart/test';
import { shoppingCartIsEmpty } from './shopping-cart.util';

describe('shoppingCartUtil', () => {
    describe('shoppingCartIsEmpty', () => {

        it('returns false if the shopping cart has shopping cart items', () => {
            expect(shoppingCartIsEmpty(shoppingCart)).toBe(false);
        });

        it('returns true if the shopping cart has no shopping cart items', () => {
            expect(shoppingCartIsEmpty(emptyShoppingCart)).toBe(true);
        });

        it('returns true if null is given', () => {
            expect(shoppingCartIsEmpty(null)).toBe(true);
        });

    });
});

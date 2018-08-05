import { ShoppingCartAppState } from './shopping-cart.reducer';
import { getShoppingCart } from './shopping-cart.selectors';
import { shoppingCart } from '@luchsamapparat/shopping-cart-common/test';

describe('shoppingCartSelectors', () => {
    const state: ShoppingCartAppState = {
        shoppingCart: {
            shoppingCart
        }
    };

    describe('getShoppingCart', () => {
        it('returns the search results', () => {
            const expectedValue = state.shoppingCart.shoppingCart;

            expect(getShoppingCart()(state)).toBe(expectedValue);
        });
    });
});

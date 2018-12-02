import { shoppingCart } from '@ngxp/shopping-cart-common/test';
import { ShoppingCartPartialState } from './shopping-cart.reducer';
import { getShoppingCart } from './shopping-cart.selectors';

describe('shoppingCartSelectors', () => {
    const state: ShoppingCartPartialState = {
        shoppingCart: {
            shoppingCart
        }
    };

    describe('getShoppingCart', () => {
        it('returns the search results', () => {
            const expectedValue = state.shoppingCart.shoppingCart;

            expect(getShoppingCart(state)).toBe(expectedValue);
        });
    });
});

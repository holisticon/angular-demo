import { shoppingCart } from '@ngxp/shopping-cart-common/test';
import { ShoppingCartAppState } from './shopping-cart.reducer';
import { selectShoppingCart } from './shopping-cart.selectors';

describe('shoppingCartSelectors', () => {
    const state: ShoppingCartAppState = {
        shoppingCart: {
            shoppingCart
        }
    };

    describe('selectShoppingCart', () => {
        it('returns the search results', () => {
            const expectedValue = state.shoppingCart.shoppingCart;

            expect(selectShoppingCart(state)).toBe(expectedValue);
        });
    });
});

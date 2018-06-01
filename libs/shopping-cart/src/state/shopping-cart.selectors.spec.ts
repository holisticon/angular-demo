import { ShoppingCartAppState } from './shopping-cart.reducer';
import { getShoppingCart } from './shopping-cart.selectors';

describe('shoppingCartSelectors', () => {
    const state: ShoppingCartAppState = {
        shoppingCart: {
            shoppingCart: {
                items: [],
                totalPrice: 0
            }
        }
    };

    describe('getShoppingCart', () => {
        it('returns the search results', () => {
            const expectedValue = state.shoppingCart.shoppingCart;

            expect(getShoppingCart()(state)).toBe(expectedValue);
        });
    });
});

import { ShoppingCart, ShoppingCartLoadedAction } from '@luchsamapparat/shopping-cart-common';
import { Action } from '@ngrx/store';
import { initialState, shoppingCartReducer } from './shopping-cart.reducer';
import { shoppingCart } from '@luchsamapparat/shopping-cart-common/test';

describe('shoppingCartReducer', () => {
    it('returns the same state if the action is not applicable', () => {
        const action: Action = { type: 'some-action' };
        const state = shoppingCartReducer(initialState, <any>action);
        expect(state).toBe(initialState);
    });

    describe('ShoppingCartLoaded', () => {
        it('sets the shopping cart', () => {
            const action = new ShoppingCartLoadedAction(shoppingCart);

            const updatedState = shoppingCartReducer(initialState, action);

            expect(updatedState.shoppingCart).toBe(shoppingCart);
        });
    });
});

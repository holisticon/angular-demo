import { Action } from '@ngrx/store';
import { shoppingCartLoadedAction } from '@ngxp/shopping-cart-common';
import { shoppingCart } from '@ngxp/shopping-cart-common/test';
import { initialState, shoppingCartReducer } from './shopping-cart.reducer';

describe('shoppingCartReducer', () => {
    it('returns the same state if the action is not applicable', () => {
        const action: Action = { type: 'some-action' };
        const state = shoppingCartReducer(initialState, <any>action);
        expect(state).toBe(initialState);
    });

    describe('ShoppingCartLoaded', () => {
        it('sets the shopping cart', () => {
            const action = shoppingCartLoadedAction({ shoppingCart });

            const updatedState = shoppingCartReducer(initialState, action);

            expect(updatedState.shoppingCart).toBe(shoppingCart);
        });
    });
});

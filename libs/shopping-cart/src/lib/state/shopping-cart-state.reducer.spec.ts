import { shoppingCart } from '@holisticon/shopping-cart/test';
import { Action } from '@ngrx/store';
import { shoppingCartUpdatedAction } from './shopping-cart.actions';
import { initialState, shoppingCartReducer } from './shopping-cart.reducer';

describe('shoppingCartReducer', () => {
    it('returns the same state if the action is not applicable', () => {
        const action: Action = { type: 'some-action' };
        const state = shoppingCartReducer(initialState, action);
        expect(state).toBe(initialState);
    });

    describe('shoppingCartUpdated', () => {
        it('sets the shopping cart', () => {
            const action = shoppingCartUpdatedAction({ shoppingCart });

            const updatedState = shoppingCartReducer(initialState, action);

            expect(updatedState.shoppingCart).toBe(shoppingCart);
        });
    });
});

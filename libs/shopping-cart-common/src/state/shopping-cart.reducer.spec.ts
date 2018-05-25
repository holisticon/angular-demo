import { ShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { Action } from '@ngrx/store';
import { ShoppingCartLoadedAction } from './shopping-cart.actions';
import { initialState, shoppingCartReducer } from './shopping-cart.reducer';

describe('shoppingCartReducer', () => {
    const shoppingCart: ShoppingCart = {
        items: []
    };

    it('returns the same state if the action is not applicable', () => {
        const action: Action = { type: 'some-action' };
        const state = shoppingCartReducer(initialState, <any> action);
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

import { createReducer, on } from '@ngrx/store';
import { ShoppingCart } from '../domain';
import { shoppingCartUpdatedAction } from './shopping-cart.actions';

export const SHOPPING_CART_FEATURE_KEY = 'shoppingCart';

export interface ShoppingCartState {
    shoppingCart: ShoppingCart | null;
}

export interface ShoppingCartAppState {
    readonly [SHOPPING_CART_FEATURE_KEY]: ShoppingCartState;
}

export const initialState: ShoppingCartState = {
    shoppingCart: null
};

export const shoppingCartReducer = createReducer(initialState,
    on(shoppingCartUpdatedAction, (state, { shoppingCart }) => ({
        ...state,
        shoppingCart
    }))
);

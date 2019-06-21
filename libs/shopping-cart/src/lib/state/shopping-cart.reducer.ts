import { createReducer, on } from '@ngrx/store';
import { ShoppingCart, shoppingCartLoadedAction } from '@ngxp/shopping-cart-common';

export const SHOPPING_CART_FEATURE_KEY = 'shoppingCart';

export interface ShoppingCartState {
    shoppingCart: ShoppingCart | null;
}

export interface ShoppingCartPartialState {
    readonly [SHOPPING_CART_FEATURE_KEY]: ShoppingCartState;
}

export const initialState: ShoppingCartState = {
    shoppingCart: null
};

export const shoppingCartReducer = createReducer(initialState,
    on(shoppingCartLoadedAction, (state, { shoppingCart }) => ({
        ...state,
        shoppingCart
    }))
);

import { createReducer, on } from '@ngrx/store';
import { ReducerArgs } from '@ngxp/common';
import { ShoppingCart, shoppingCartLoadedAction } from '@ngxp/shopping-cart-common';

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

export const reducer = createReducer(initialState,
    on(shoppingCartLoadedAction, (state, { shoppingCart }) => ({
        ...state,
        shoppingCart
    }))
);

// neccessary for AOT support
// see https://ngrx.io/guide/store/reducers#creating-the-reducer-function
export function shoppingCartReducer(...args: ReducerArgs<ShoppingCartState>) { return reducer(...args); }

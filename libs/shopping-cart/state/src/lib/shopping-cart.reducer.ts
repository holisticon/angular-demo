import { createReducer, on } from '@ngrx/store';
import { ReducerArgs } from '@ngxp/common';
import { ShoppingCart } from '@ngxp/shopping-cart/domain';
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

export const reducer = createReducer(initialState,
    on(shoppingCartUpdatedAction, (state, { shoppingCart }) => ({
        ...state,
        shoppingCart
    }))
);

// neccessary for AOT support
// see https://ngrx.io/guide/store/reducers#creating-the-reducer-function
export function shoppingCartReducer(...args: ReducerArgs<ShoppingCartState>) { return reducer(...args); }

import { ShoppingCart, ShoppingCartCommonActions, ShoppingCartCommonActionTypes } from '@ngxp/shopping-cart-common';
import { ShoppingCartAction } from './shopping-cart.actions';

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

export function shoppingCartReducer(state = initialState, action: ShoppingCartAction | ShoppingCartCommonActions): ShoppingCartState {
    switch (action.type) {

        case ShoppingCartCommonActionTypes.ShoppingCartLoaded: {
            return {
                ...state,
                shoppingCart: action.payload
            };
        }

        default:
            return state;
    }
}

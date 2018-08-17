import { ShoppingCart, ShoppingCartCommonActionTypes, ShoppingCartCommonActions } from '@ngxp/shopping-cart-common';
import { ShoppingCartActions } from './shopping-cart.actions';

export interface ShoppingCartState {
    shoppingCart: ShoppingCart | null;
}

export interface ShoppingCartAppState {
    readonly shoppingCart: ShoppingCartState;
}

export const initialState: ShoppingCartState = {
    shoppingCart: null
};

export function shoppingCartReducer(state = initialState, action: ShoppingCartActions | ShoppingCartCommonActions): ShoppingCartState {
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

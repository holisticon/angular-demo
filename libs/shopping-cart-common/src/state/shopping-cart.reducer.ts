import { ShoppingCart } from '../shopping-cart.model';
import { ShoppingCartActionTypes, ShoppingCartActions } from './shopping-cart.actions';

export interface ShoppingCartState {
    shoppingCart: ShoppingCart | null;
}

/**
 * Interface to the part of the Store containing ShoppingCartState
 * and other information related to ShoppingCartData.
 */
export interface ShoppingCartAppState {
    readonly shoppingCart: ShoppingCartState;
}

export const initialState: ShoppingCartState = {
    shoppingCart: null
};

export function shoppingCartReducer(state = initialState, action: ShoppingCartActions): ShoppingCartState {
    switch (action.type) {
        case ShoppingCartActionTypes.ShoppingCartLoaded: {
            return {
                ...state,
                shoppingCart: action.payload
            };
        }

        default:
            return state;
    }
}

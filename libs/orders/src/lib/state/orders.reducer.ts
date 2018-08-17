import { Order } from '@ngxp/orders-common';
import { OrdersActionTypes, OrdersActions } from './orders.actions';

export interface OrdersState {
    orders: Order[]
}

export interface OrdersAppState {
    readonly orders: OrdersState;
}

export const initialState: OrdersState = {
    orders: []
};

export function ordersReducer(state = initialState, action: OrdersActions): OrdersState {
    switch (action.type) {

        case OrdersActionTypes.OrdersLoaded: {
            return {
                ...state,
                orders: action.payload
            };
        }

        default:
            return state;
    }
}

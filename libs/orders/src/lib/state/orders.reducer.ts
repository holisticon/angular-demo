import { Order } from '@ngxp/orders-common';
import { OrdersActionTypes, OrdersAction } from './orders.actions';

export const ORDERS_FEATURE_KEY = 'orders';

export interface OrdersState {
    orders: Order[]
}

export interface OrdersPartialState {
    readonly [ORDERS_FEATURE_KEY]: OrdersState;
}

export const initialState: OrdersState = {
    orders: []
};

export function ordersReducer(state = initialState, action: OrdersAction): OrdersState {
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

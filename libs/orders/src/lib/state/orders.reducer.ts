import { createReducer, on } from '@ngrx/store';
import { ReducerArgs } from '@ngxp/common';
import { Order } from '@ngxp/orders-common';
import { ordersLoadedAction } from './orders.actions';

export const ORDERS_FEATURE_KEY = 'orders';

export interface OrdersState {
    orders: Order[]
}

export interface OrdersAppState {
    readonly [ORDERS_FEATURE_KEY]: OrdersState;
}

export const initialState: OrdersState = {
    orders: []
};

const reducer = createReducer(initialState,
    on(ordersLoadedAction, (state, { orders }) => ({
        ...state,
        orders
    }))
);

// neccessary for AOT support
// see https://ngrx.io/guide/store/reducers#creating-the-reducer-function
export function ordersReducer(...args: ReducerArgs<OrdersState>) { return reducer(...args); }

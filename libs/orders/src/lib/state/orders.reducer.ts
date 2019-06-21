import { createReducer, on } from '@ngrx/store';
import { Order } from '@ngxp/orders-common';
import { ordersLoadedAction } from './orders.actions';

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

export const ordersReducer = createReducer(initialState,
    on(ordersLoadedAction, (state, { orders }) => ({
        ...state,
        orders
    }))
);

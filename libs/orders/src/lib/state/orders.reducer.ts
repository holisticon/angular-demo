import { createReducer, on } from '@ngrx/store';
import { OrderHistory } from '../domain';
import { orderHistoryLoaded } from './orders.actions';

export const ORDERS_FEATURE_KEY = 'orders';

export interface OrdersState {
    orderHistory: OrderHistory | null;
}

export interface OrdersAppState {
    readonly [ORDERS_FEATURE_KEY]: OrdersState;
}

export const initialState: OrdersState = {
    orderHistory: null
};

export const ordersReducer = createReducer(initialState,
    on(orderHistoryLoaded, (state, { orderHistory }) => ({
        ...state,
        orderHistory
    }))
);

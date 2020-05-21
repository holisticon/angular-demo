import { createReducer, on } from '@ngrx/store';
import { ReducerArgs } from '@ngxp/common';
import { OrderHistory } from '../domain/order';
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

const reducer = createReducer(initialState,
    on(orderHistoryLoaded, (state, { orderHistory }) => ({
        ...state,
        orderHistory
    }))
);

// neccessary for AOT support
// see https://ngrx.io/guide/store/reducers#creating-the-reducer-function
export function ordersReducer(...args: ReducerArgs<OrdersState>) { return reducer(...args); }

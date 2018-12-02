import { OrdersPartialState, OrdersState, ORDERS_FEATURE_KEY } from './orders.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getOrdersState = createFeatureSelector<OrdersState>(ORDERS_FEATURE_KEY);

export const getOrders = createSelector(
    getOrdersState,
    state => state.orders
);

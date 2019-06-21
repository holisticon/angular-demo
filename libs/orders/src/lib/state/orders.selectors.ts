import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState, ORDERS_FEATURE_KEY } from './orders.reducer';

const getOrdersState = createFeatureSelector<OrdersState>(ORDERS_FEATURE_KEY);

export const getOrders = createSelector(
    getOrdersState,
    state => state.orders
);

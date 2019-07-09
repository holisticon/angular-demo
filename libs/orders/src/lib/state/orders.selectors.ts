import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState, ORDERS_FEATURE_KEY } from './orders.reducer';

const selectOrdersState = createFeatureSelector<OrdersState>(ORDERS_FEATURE_KEY);

export const selectOrders = createSelector(
    selectOrdersState,
    state => state.orders
);

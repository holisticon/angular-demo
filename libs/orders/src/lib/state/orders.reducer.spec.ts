import { Order, OrderStatus } from '@luchsamapparat/orders-common';
import { Action } from '@ngrx/store';
import { OrdersLoadedAction } from './orders.actions';
import { initialState, ordersReducer } from './orders.reducer';
import { orders } from '@luchsamapparat/orders-common/test';

describe('ordersReducer', () => {
    it('returns the same state if the action is not applicable', () => {
        const action: Action = { type: 'some-action' };
        const state = ordersReducer(initialState, <any>action);
        expect(state).toBe(initialState);
    });

    describe('OrdersLoaded', () => {
        it('sets the orders', () => {
            const action = new OrdersLoadedAction(orders);

            const updatedState = ordersReducer(initialState, action);

            expect(updatedState.orders).toBe(orders);
        });
    });
});

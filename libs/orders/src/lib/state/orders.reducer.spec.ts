import { Action } from '@ngrx/store';
import { orderHistory } from '@ngxp/orders/test';
import { orderHistoryLoaded } from './orders.actions';
import { initialState, ordersReducer } from './orders.reducer';

describe('ordersReducer', () => {
    it('returns the same state if the action is not applicable', () => {
        const action: Action = { type: 'some-action' };
        const state = ordersReducer(initialState, <any>action);
        expect(state).toBe(initialState);
    });

    describe('orderHistoryLoaded', () => {
        it('sets the orders', () => {
            const action = orderHistoryLoaded({ orderHistory });

            const updatedState = ordersReducer(initialState, action);

            expect(updatedState.orderHistory).toBe(orderHistory);
        });
    });
});

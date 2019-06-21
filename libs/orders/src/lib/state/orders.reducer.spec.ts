import { Action } from '@ngrx/store';
import { orders } from '@ngxp/orders-common/test';
import { ordersLoadedAction } from './orders.actions';
import { initialState, ordersReducer } from './orders.reducer';

describe('ordersReducer', () => {
    it('returns the same state if the action is not applicable', () => {
        const action: Action = { type: 'some-action' };
        const state = ordersReducer(initialState, <any>action);
        expect(state).toBe(initialState);
    });

    describe('OrdersLoaded', () => {
        it('sets the orders', () => {
            const action = ordersLoadedAction({ orders });

            const updatedState = ordersReducer(initialState, action);

            expect(updatedState.orders).toBe(orders);
        });
    });
});

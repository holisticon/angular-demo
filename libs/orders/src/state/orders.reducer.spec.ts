import { addId } from '@luchsamapparat/common';
import { Order, OrderStatus } from '@luchsamapparat/orders-common';
import { Action } from '@ngrx/store';
import { OrdersLoadedAction } from './orders.actions';
import { initialState, ordersReducer } from './orders.reducer';

describe('ordersReducer', () => {
    const orders: Order[] = [addId({
        billingAddress: {
            city: '',
            country: '',
            name: '',
            street: '',
            zipCode: ''
        },
        date: new Date().toISOString(),
        items: [],
        payment: {
            accountOwner: '',
            bic: '',
            iban: ''
        },
        shippingAddress: {
            city: '',
            country: '',
            name: '',
            street: '',
            zipCode: ''
        },
        status: OrderStatus.Processing
    }, 'id')];

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

import { OrderStatus } from '@ngxp/orders-common';
import { OrdersAppState } from './orders.reducer';
import { getOrders } from './orders.selectors';
import { orders } from '@ngxp/orders-common/test';

describe('ordersSelectors', () => {
    const state: OrdersAppState = {
        orders: {
            orders
        }
    };

    describe('getOrders', () => {
        it('returns the search results', () => {
            const expectedValue = state.orders.orders;

            expect(getOrders()(state)).toBe(expectedValue);
        });
    });
});

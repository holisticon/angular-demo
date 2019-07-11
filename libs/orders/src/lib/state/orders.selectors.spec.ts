import { orders } from '@ngxp/orders-common/test';
import { OrdersAppState } from './orders.reducer';
import { selectOrders } from './orders.selectors';

describe('ordersSelectors', () => {
    const state: OrdersAppState = {
        orders: {
            orders
        }
    };

    describe('selectOrders', () => {
        it('returns the search results', () => {
            const expectedValue = state.orders.orders;

            expect(selectOrders(state)).toBe(expectedValue);
        });
    });
});

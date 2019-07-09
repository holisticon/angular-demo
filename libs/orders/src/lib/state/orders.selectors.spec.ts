import { orders } from '@ngxp/orders-common/test';
import { OrdersPartialState } from './orders.reducer';
import { selectOrders } from './orders.selectors';

describe('ordersSelectors', () => {
    const state: OrdersPartialState = {
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

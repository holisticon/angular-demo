import { orderHistory } from '@ngxp/orders/domain/test';
import { OrdersAppState } from './orders.reducer';
import { selectOrderHistory } from './orders.selectors';

describe('ordersSelectors', () => {
    const state: OrdersAppState = {
        orders: {
            orderHistory
        }
    };

    describe('selectOrderHistory', () => {
        it('returns the search results', () => {
            const expectedValue = state.orders.orderHistory;

            expect(selectOrderHistory(state)).toBe(expectedValue);
        });
    });
});

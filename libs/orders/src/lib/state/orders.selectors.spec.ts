import { addId } from '@luchsamapparat/common';
import { OrderStatus } from '@luchsamapparat/orders-common';
import { OrdersAppState } from './orders.reducer';
import { getOrders } from './orders.selectors';

describe('ordersSelectors', () => {
    const state: OrdersAppState = {
        orders: {
            orders: [addId({
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
            }, 'id')]
        }
    };

    describe('getOrders', () => {
        it('returns the search results', () => {
            const expectedValue = state.orders.orders;

            expect(getOrders()(state)).toBe(expectedValue);
        });
    });
});

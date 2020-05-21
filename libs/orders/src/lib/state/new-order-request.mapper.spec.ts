import { newOrder } from '@ngxp/orders/test';
import { getUri } from '@ngxp/resource';
import { toNewOrderRequest } from './new-order-request.mapper';

describe('toNewOrderRequest', () => {
    it('maps the given new order to an order request', () => {
        expect(toNewOrderRequest(newOrder)).toEqual({
            shoppingCartItems: newOrder.orderItems
                .map(orderItem => getUri(orderItem)),
            payment: getUri(newOrder.payment),
            shippingAddress: getUri(newOrder.shippingAddress),
            billingAddress: getUri(newOrder.billingAddress)
        })
    });
});

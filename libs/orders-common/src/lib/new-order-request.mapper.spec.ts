import { newOrder } from '@ngxp/orders-common/test';
import { getId } from '@ngxp/resource';
import { toNewOrderRequest } from './new-order-request.mapper';

describe('toNewOrderRequest', () => {
    it('maps the given new order to an order request', () => {
        expect(toNewOrderRequest(newOrder)).toEqual({
            shoppingCartItems: newOrder.shoppingCartItems
                .map(shoppingCartItem => getId(shoppingCartItem)),
            payment: getId(newOrder.payment),
            shippingAddress: getId(newOrder.shippingAddress),
            billingAddress: getId(newOrder.billingAddress)
        })
    });
});

import { toNewOrderRequest } from './new-order-request.mapper';
import { NewOrder } from './order.model';
import { newOrder } from '@ngxp/orders-common/test';
import { getId } from '@ngxp/common';

describe('toNewOrderRequest', () => {
    it('maps the given new order to an order request', () => {
        // kind of useless 🤔 ... for now 😏
        expect(toNewOrderRequest(newOrder)).toEqual({
            items: newOrder.shoppingCart.items
                .map(shoppingCartItem => getId(shoppingCartItem)),
            payment: getId(newOrder.payment),
            shippingAddress: getId(newOrder.shippingAddress),
            billingAddress: getId(newOrder.billingAddress)
        })
    });
});

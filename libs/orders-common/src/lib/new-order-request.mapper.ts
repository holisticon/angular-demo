import { getId } from '@ngxp/resource';
import { NewOrder, NewOrderRequest } from './order.model';

export function toNewOrderRequest(newOrder: NewOrder): NewOrderRequest {
    return {
        shoppingCartItems: newOrder.shoppingCartItems
            .map(shoppingCartItem => getId(shoppingCartItem)),
        payment: getId(newOrder.payment),
        shippingAddress: getId(newOrder.shippingAddress),
        billingAddress: getId(newOrder.billingAddress)
    };
}

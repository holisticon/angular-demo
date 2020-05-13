import { getUri } from '@ngxp/resource';
import { NewOrder, NewOrderRequest } from '../domain/order';

export function toNewOrderRequest(newOrder: NewOrder): NewOrderRequest {
    return {
        // TODO rename to orderItems in API
        shoppingCartItems: newOrder.orderItems
            .map(shoppingCartItem => getUri(shoppingCartItem)),
        payment: getUri(newOrder.payment),
        shippingAddress: getUri(newOrder.shippingAddress),
        billingAddress: getUri(newOrder.billingAddress)
    };
}

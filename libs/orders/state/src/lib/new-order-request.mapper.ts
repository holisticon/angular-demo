import { NewOrder, NewOrderRequest } from '@ngxp/orders/domain';
import { getUri } from '@ngxp/resource';

export function toNewOrderRequest(newOrder: NewOrder): NewOrderRequest {
    return {
        shoppingCartItems: newOrder.shoppingCartItems
            .map(shoppingCartItem => getUri(shoppingCartItem)),
        payment: getUri(newOrder.payment),
        shippingAddress: getUri(newOrder.shippingAddress),
        billingAddress: getUri(newOrder.billingAddress)
    };
}

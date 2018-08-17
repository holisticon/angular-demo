import { getId } from "@ngxp/common";
import { NewOrder, NewOrderRequest } from "./order.model";

export function toNewOrderRequest(newOrder: NewOrder): NewOrderRequest {
    return {
        items: newOrder.shoppingCart.items
            .map(shoppingCartItem => getId(shoppingCartItem)),
        payment: getId(newOrder.payment),
        shippingAddress: getId(newOrder.shippingAddress),
        billingAddress: getId(newOrder.billingAddress)
    };
}

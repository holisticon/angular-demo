import { LineItem, ResourceId } from '@ngxp/common';
import { ShoppingCart } from '@ngxp/shopping-cart-common';
import { Address, PaymentOption } from '@ngxp/user-profile-common';

export interface Order {
    status: OrderStatus;
    items: OrderItem[];
    billingAddress: Address;
    shippingAddress: Address;
    payment: PaymentOption;
    date: string;
}

export interface OrderItem extends LineItem {}

export interface NewOrder {
    shoppingCart: ShoppingCart;
    billingAddress: Address;
    shippingAddress: Address;
    payment: PaymentOption;
}

export interface NewOrderRequest {
    items: ResourceId[];
    billingAddress: ResourceId;
    shippingAddress: ResourceId;
    payment: ResourceId;
}


export enum OrderStatus {
    Cancelled = 'Cancelled',
    Delivered = 'Delivered',
    InTransit = 'InTransit',
    PaymentDue = 'PaymentDue',
    PickupAvailable = 'PickupAvailable',
    Problem = 'Problem',
    Processing = 'Processing',
    Returned = 'Returned'
}

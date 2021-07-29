import { Resource, ResourceUri } from '@holisticon/resource';
import { Address, PaymentOption } from '@holisticon/user-profile/domain';

export interface OrderHistory {
    orders: Resource<Order>[];
}

export interface Order {
    orderStatus: OrderStatus;
    orderItems: OrderItem[];
    billingAddress: Address;
    shippingAddress: Address;
    payment: PaymentOption;
    orderDate: string;
}

export interface OrderItem {
    productName: string;
    productDescription: string;
    price: number;
    quantity: number;
    product: string;
}

export interface NewOrder {
    orderItems: OrderItem[];
    billingAddress: Address;
    shippingAddress: Address;
    payment: PaymentOption;
}

export interface NewOrderRequest {
    shoppingCartItems: ResourceUri[];
    billingAddress: ResourceUri;
    shippingAddress: ResourceUri;
    payment: ResourceUri;
}

export enum OrderStatus {
    Cancelled = 'Cancelled',
    Delivered = 'Delivered',
    Processing = 'Processing'
}

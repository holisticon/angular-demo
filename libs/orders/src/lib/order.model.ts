import { Resource, ResourceUri } from '@ngxp/resource';
import { ShoppingCartItem } from '@ngxp/shopping-cart';
import { Address, PaymentOption } from '@ngxp/user-profile';

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
    shoppingCartItems: ShoppingCartItem[];
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

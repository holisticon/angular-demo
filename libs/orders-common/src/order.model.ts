import { LineItem } from "@luchsamapparat/common";
import { Address, PaymentOption } from "@luchsamapparat/user-profile-common";

export interface Order {
    status: OrderStatus;
    items: OrderItem[];
    billingAddress: Address;
    shippingAddress: Address;
    payment: PaymentOption;
    date: string;
}

export interface OrderItem extends LineItem {}

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

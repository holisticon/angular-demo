import { NewOrder, Order } from '@ngxp/orders-common';
import { Action } from '@ngrx/store';

export enum OrdersCommonActionTypes {
    PlaceOrder = '[Orders] place order',
    OrderPlaced = '[Orders] order placed'
}

export class PlaceOrderAction implements Action {
    readonly type = OrdersCommonActionTypes.PlaceOrder;

    constructor(
        public payload: NewOrder
    ) { }
}

export class OrderPlacedAction implements Action {
    readonly type = OrdersCommonActionTypes.OrderPlaced;

    constructor(
        public payload: Order
    ) { }
}

export type OrdersCommonActions =
    | PlaceOrderAction
    | OrderPlacedAction;

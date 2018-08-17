import { Order } from '@ngxp/orders-common';
import { Action } from '@ngrx/store';

export enum OrdersActionTypes {
    LoadOrders = '[Orders] Load Data',
    OrdersLoaded = '[Orders] Data Loaded'
}

export class LoadOrdersAction implements Action {
    readonly type = OrdersActionTypes.LoadOrders;
}

export class OrdersLoadedAction implements Action {
    readonly type = OrdersActionTypes.OrdersLoaded;

    constructor(
        public payload: Order[]
    ) {}
}

export type OrdersActions =
    | LoadOrdersAction
    | OrdersLoadedAction;

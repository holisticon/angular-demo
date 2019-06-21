import { createAction, props } from '@ngrx/store';
import { Order } from '@ngxp/orders-common';

export const loadOrdersAction = createAction(
    '[Orders] Load Data'
);

export const ordersLoadedAction = createAction(
    '[Orders] Data Loaded',
    props<{ orders: Order[] }>()
);

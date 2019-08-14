import { createAction, props } from '@ngrx/store';
import { Order } from '@ngxp/orders-common';

export const loadOrdersAction = createAction(
    '[Orders] load orders'
);

export const ordersLoadedAction = createAction(
    '[Orders] orders loaded',
    props<{ orders: Order[] }>()
);

import { createAction, props } from '@ngrx/store';
import { OrderHistory } from '@ngxp/orders-common';

export const loadOrderHistoryAction = createAction(
    '[Orders] load order history'
);

export const orderHistoryLoaded = createAction(
    '[Orders] order history loaded',
    props<{ orderHistory: OrderHistory }>()
);

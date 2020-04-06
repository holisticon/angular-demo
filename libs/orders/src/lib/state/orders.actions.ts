import { createAction, props } from '@ngrx/store';
import { NewOrder, Order, OrderHistory } from '../order.model';

export const loadOrderHistoryAction = createAction(
    '[Orders] load order history'
);

export const orderHistoryLoaded = createAction(
    '[Orders] order history loaded',
    props<{ orderHistory: OrderHistory }>()
);

export const placeOrderAction = createAction(
    '[Orders] place order',
    props<{ newOrder: NewOrder }>()
);

export const orderPlacedAction = createAction(
    '[Orders] order placed',
    props<{ order: Order }>()
);

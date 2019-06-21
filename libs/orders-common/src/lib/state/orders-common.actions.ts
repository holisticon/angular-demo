import { createAction, props } from '@ngrx/store';
import { NewOrder, Order } from '@ngxp/orders-common';

export const placeOrderAction = createAction(
    '[Orders] place order',
    props<{ newOrder: NewOrder}>()
);

export const orderPlacedAction = createAction(
    '[Orders] order placed',
    props<{ order: Order }>()
);

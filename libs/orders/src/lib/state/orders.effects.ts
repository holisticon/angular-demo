import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { OrderService } from './order.service';
import { loadOrderHistoryAction, orderHistoryLoaded, orderPlacedAction, placeOrderAction } from './orders.actions';

@Injectable()
export class OrdersEffects {

    loadOrderHistory$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadOrderHistoryAction),
            switchMap(() => this.orderService
                .loadOrderHistory()
                .pipe(map(orderHistory => orderHistoryLoaded({ orderHistory }))))
        )
    );

    placeOrder$ = createEffect(
        () => this.actions$.pipe(
            ofType(placeOrderAction),
            switchMap(action => this.orderService
                .placeOrder(action.newOrder)
                .pipe(map(order => orderPlacedAction({ order })))
            )
        )
    );

    constructor(
        private actions$: Actions,
        private orderService: OrderService
    ) { }
}

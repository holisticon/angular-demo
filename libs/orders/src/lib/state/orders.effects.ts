import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { OrderService } from '../order.service';
import { loadOrderHistoryAction, orderHistoryLoaded } from './orders.actions';

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

    constructor(
        private actions$: Actions,
        private orderService: OrderService
    ) {}
}

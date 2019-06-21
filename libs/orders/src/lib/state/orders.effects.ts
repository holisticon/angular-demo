import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { OrderService } from '../order.service';
import { loadOrdersAction, ordersLoadedAction } from './orders.actions';

@Injectable()
export class OrdersEffects {

    loadOrders$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadOrdersAction),
            switchMap(() => this.orderService
                .loadOrders()
                .pipe(map(orders => ordersLoadedAction({ orders }))))
        )
    );

    constructor(
        private actions$: Actions,
        private orderService: OrderService
    ) {}
}

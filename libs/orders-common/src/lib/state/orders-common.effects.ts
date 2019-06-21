import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { OrdersCommonService } from '../orders-common.service';
import { orderPlacedAction, placeOrderAction } from './orders-common.actions';

@Injectable()
export class OrdersCommonEffects {

    placeOrder$ = createEffect(
        () => this.actions$.pipe(
            ofType(placeOrderAction),
            switchMap(action => this.ordersCommonService
                .placeOrder(action.newOrder)
                .pipe(map(order => orderPlacedAction({ order })))
            )
        )
    );

    constructor(
        private actions$: Actions,
        private ordersCommonService: OrdersCommonService
    ) {}
}

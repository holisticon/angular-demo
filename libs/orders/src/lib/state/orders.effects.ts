import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';
import { OrderService } from '../order.service';
import { LoadOrdersAction, OrdersActionTypes, OrdersLoadedAction } from './orders.actions';
import { OrdersPartialState } from './orders.reducer';

@Injectable()
export class OrdersEffects {

    @Effect()
    loadOrders$ = this.dataPersistence.fetch<LoadOrdersAction>(
        OrdersActionTypes.LoadOrders,
        {
            run: (action, state) => {
                return this.orderService
                    .loadOrders()
                    .pipe(map(orders => new OrdersLoadedAction(orders)));
            },

            onError: (action, error) => {
                console.error('Error', error);
            }
        }
    );

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<OrdersPartialState>,
        private orderService: OrderService
    ) {}
}

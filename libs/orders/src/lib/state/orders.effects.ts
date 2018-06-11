import { Injectable } from '@angular/core';
import { OrderService } from '../order.service';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { LoadOrdersAction, OrdersActionTypes, OrdersLoadedAction } from './orders.actions';
import { OrdersAppState } from './orders.reducer';

@Injectable()
export class OrdersEffects {

    @Effect()
    loadOrders$ = this.dataPersistence.fetch<LoadOrdersAction>(
        OrdersActionTypes.LoadOrders,
        {
            run: (action, state) => {
                return this.orderService
                    .loadOrders()
                    .map(orders => new OrdersLoadedAction(orders));
            },

            onError: (action, error) => {
                console.error('Error', error);
            }
        }
    );

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<OrdersAppState>,
        private orderService: OrderService
    ) {}
}

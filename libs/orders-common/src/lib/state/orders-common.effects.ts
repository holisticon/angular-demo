import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { OrdersCommonService } from '../orders-common.service';
import { OrderPlacedAction, OrdersCommonActionTypes, PlaceOrderAction } from './orders-common.actions';

@Injectable()
export class OrdersCommonEffects {

    @Effect()
    placeOrder$ = this.dataPersistence.pessimisticUpdate<PlaceOrderAction>(
        OrdersCommonActionTypes.PlaceOrder,
        {
            run: (action, state) => {
                return this.ordersCommonService
                    .placeOrder(action.payload)
                    .pipe(map(shoppingCart => new OrderPlacedAction(shoppingCart)));
            },

            onError: (action, error) => {
                console.error('Error', error);
            }
        }
    );

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<void>,
        private ordersCommonService: OrdersCommonService
    ) {}
}

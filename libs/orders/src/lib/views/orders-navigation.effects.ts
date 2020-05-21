import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filterNavigationTo } from '@ngxp/routing';
import { map } from 'rxjs/operators';
import { loadOrderHistoryAction } from '../state/orders.actions';
import { OrdersViews } from './orders.views';

@Injectable()
export class OrdersNavigationEffects {

    loadOrdersOnNavigate$ = createEffect(
        () => this.actions$.pipe(
            filterNavigationTo(OrdersViews.Root),
            map(() => loadOrderHistoryAction())
        ));

    constructor(
        private actions$: Actions,
    ) { }
}

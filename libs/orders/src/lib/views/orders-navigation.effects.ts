import { Injectable } from '@angular/core';
import { filterNavigationTo } from '@holisticon/routing';
import { Actions, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { loadOrderHistoryAction } from '../state';
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

import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filterNavigationTo } from '@ngxp/routing';
import { map } from 'rxjs/operators';
import { ShoppingCartViews } from './shopping-cart.views';
import { loadShoppingCartAction } from './state/shopping-cart.actions';

@Injectable()
export class ShoppingCartNavigationEffects {

    loadShoppingCartOnNavigate$ = createEffect(
        () => this.actions$.pipe(
            filterNavigationTo(ShoppingCartViews.Root),
            map(() => loadShoppingCartAction())
        ));

    constructor(
        private actions$: Actions,
    ) { }
}

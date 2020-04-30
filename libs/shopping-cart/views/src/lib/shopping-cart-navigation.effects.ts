import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filterNavigationTo } from '@ngxp/routing';
import { loadShoppingCartAction } from '@ngxp/shopping-cart/state';
import { map } from 'rxjs/operators';
import { ShoppingCartViews } from './shopping-cart.views';

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

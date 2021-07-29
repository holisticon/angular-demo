import { Injectable } from '@angular/core';
import { filterNavigationTo } from '@holisticon/routing';
import { Actions, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { loadShoppingCartAction } from '../state';
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

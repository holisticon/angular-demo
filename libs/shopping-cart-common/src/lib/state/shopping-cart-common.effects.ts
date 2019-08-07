import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ShoppingCartCommonService } from '../shopping-cart-common.service';
import { addToShoppingCartAction, itemAddedToShoppingCartAction } from './shopping-cart-common.actions';

@Injectable()
export class ShoppingCartCommonEffects {

    addToShoppingCart$ = createEffect(
        () => this.actions$.pipe(
            ofType(addToShoppingCartAction),
            switchMap(({ additionToShoppingCart }) => this.shoppingCartCommonService
                .addToShoppingCart(additionToShoppingCart)
                .pipe(
                    map(shoppingCart => itemAddedToShoppingCartAction({ shoppingCart }))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private shoppingCartCommonService: ShoppingCartCommonService
    ) {}
}

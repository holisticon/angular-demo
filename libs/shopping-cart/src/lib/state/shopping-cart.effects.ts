import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { orderPlacedAction } from '@ngxp/orders-common';
import { shoppingCartLoadedAction } from '@ngxp/shopping-cart-common';
import { map, switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { deleteShoppingCartItemAction, loadShoppingCartAction, updateShoppingCartItemQuantityAction } from './shopping-cart.actions';

@Injectable()
export class ShoppingCartEffects {

    loadShoppingCart$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadShoppingCartAction),
            switchMap(() => this.shoppingCartService
                .loadShoppingCart()
                .pipe(map(shoppingCart => shoppingCartLoadedAction({ shoppingCart }))))
        )
    );

    updateShoppingCartItemQuantity$ = createEffect(
        () => this.actions$.pipe(
            ofType(updateShoppingCartItemQuantityAction),
            switchMap(({ quantityUpdate }) => this.shoppingCartService
            .updateShoppingCartItemQuantity(
                quantityUpdate.resource,
                quantityUpdate.with
            )
            .pipe(map(shoppingCart => shoppingCartLoadedAction({ shoppingCart}))))
        )
    );

    deleteShoppingCartItemQuantity$ = createEffect(
        () => this.actions$.pipe(
            ofType(deleteShoppingCartItemAction),
            switchMap(({ shoppingCartItem }) => this.shoppingCartService
                .deleteShoppingCartItem(shoppingCartItem)
                .pipe(map(shoppingCart => shoppingCartLoadedAction({ shoppingCart }))))
        )
    );

    reloadShoppingCart$ = createEffect(
        () => this.actions$.pipe(
            ofType(orderPlacedAction),
            map(() => loadShoppingCartAction())
        )
    );

    constructor(
        private actions$: Actions,
        private shoppingCartService: ShoppingCartService
    ) { }
}

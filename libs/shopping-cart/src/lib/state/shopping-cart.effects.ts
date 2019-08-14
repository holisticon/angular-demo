import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrdersCommonStore } from '@ngxp/orders-common';
import { ShoppingCartCommonStore } from '@ngxp/shopping-cart-common';
import { map, switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { deleteShoppingCartItemAction, loadShoppingCartAction, shoppingCartUpdatedAction, updateShoppingCartItemQuantityAction } from './shopping-cart.actions';

@Injectable()
export class ShoppingCartEffects {

    itemAddedToShoppingCart$ = createEffect(
        () => this.shoppingCartCommonStore.itemAddedToShoppingCart$.pipe(
            map(shoppingCart => shoppingCartUpdatedAction({ shoppingCart }))
        )
    );

    loadShoppingCart$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadShoppingCartAction),
            switchMap(() => this.shoppingCartService
                .loadShoppingCart()
                .pipe(map(shoppingCart => shoppingCartUpdatedAction({ shoppingCart }))))
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
            .pipe(map(shoppingCart => shoppingCartUpdatedAction({ shoppingCart}))))
        )
    );

    deleteShoppingCartItemQuantity$ = createEffect(
        () => this.actions$.pipe(
            ofType(deleteShoppingCartItemAction),
            switchMap(({ shoppingCartItem }) => this.shoppingCartService
                .deleteShoppingCartItem(shoppingCartItem)
                .pipe(map(shoppingCart => shoppingCartUpdatedAction({ shoppingCart }))))
        )
    );

    reloadShoppingCart$ = createEffect(
        () => this.ordersCommonStore.orderPlaced$.pipe(
            map(() => loadShoppingCartAction())
        )
    );

    constructor(
        private actions$: Actions,
        private shoppingCartService: ShoppingCartService,
        private shoppingCartCommonStore: ShoppingCartCommonStore,
        private ordersCommonStore: OrdersCommonStore
    ) { }
}

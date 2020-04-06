import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrdersStore } from '@ngxp/orders';
import { map, switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCartStore } from './shopping-cart-store.service';
import { addToShoppingCartAction, deleteShoppingCartItemAction, itemAddedToShoppingCartAction, loadShoppingCartAction, shoppingCartUpdatedAction, updateShoppingCartItemQuantityAction } from './shopping-cart.actions';

@Injectable()
export class ShoppingCartEffects {

    addToShoppingCart$ = createEffect(
        () => this.actions$.pipe(
            ofType(addToShoppingCartAction),
            switchMap(({ additionToShoppingCart }) => this.shoppingCartService
                .addToShoppingCart(additionToShoppingCart)
                .pipe(
                    map(shoppingCart => itemAddedToShoppingCartAction({ shoppingCart }))
                )
            )
        )
    );

    itemAddedToShoppingCart$ = createEffect(
        () => this.shoppingCartStore.itemAddedToShoppingCart$.pipe(
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
                .pipe(map(shoppingCart => shoppingCartUpdatedAction({ shoppingCart }))))
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
        () => this.ordersStore.orderPlaced$.pipe(
            map(() => loadShoppingCartAction())
        )
    );

    constructor(
        private actions$: Actions,
        private shoppingCartService: ShoppingCartService,
        private shoppingCartStore: ShoppingCartStore,
        private ordersStore: OrdersStore
    ) { }
}

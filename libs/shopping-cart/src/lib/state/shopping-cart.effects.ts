import { Injectable } from '@angular/core';
import { OrdersCommonActionTypes } from '@luchsamapparat/orders-common';
import { ShoppingCartLoadedAction } from '@luchsamapparat/shopping-cart-common';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { ShoppingCartService } from '../shopping-cart.service';
import { DeleteShoppingCartItemAction, LoadShoppingCartAction, ShoppingCartActionTypes, UpdateShoppingCartItemQuantityAction } from './shopping-cart.actions';
import { ShoppingCartState } from './shopping-cart.reducer';

@Injectable()
export class ShoppingCartEffects {

    @Effect()
    loadShoppingCart$ = this.dataPersistence.fetch<LoadShoppingCartAction>(
        ShoppingCartActionTypes.LoadShoppingCart,
        {
            run: (action, state) => {
                return this.shoppingCartService
                    .loadShoppingCart()
                    .map(shoppingCart => new ShoppingCartLoadedAction(shoppingCart));
            },

            onError: (action, error) => {
                console.error('Error', error);
            }
        }
    );

    @Effect()
    updateShoppingCartItemQuantity$ = this.dataPersistence.pessimisticUpdate<UpdateShoppingCartItemQuantityAction>(
        ShoppingCartActionTypes.UpdateShoppingCartItemQuantity,
        {
            run: (action, state) => {
                return this.shoppingCartService
                    .updateShoppingCartItemQuantity(
                        action.payload.resource,
                        action.payload.with
                    )
                    .map(shoppingCart => new ShoppingCartLoadedAction(shoppingCart));
            },

            onError: (action, error) => {
                console.error('Error', error);
            }
        }
    );

    @Effect()
    deleteShoppingCartItemQuantity$ = this.dataPersistence.pessimisticUpdate<DeleteShoppingCartItemAction>(
        ShoppingCartActionTypes.DeleteShoppingCartItem,
        {
            run: (action, state) => {
                return this.shoppingCartService
                    .deleteShoppingCartItem(action.payload)
                    .map(shoppingCart => new ShoppingCartLoadedAction(shoppingCart));
            },

            onError: (action, error) => {
                console.error('Error', error);
            }
        }
    );

    @Effect()
    reloadShoppingCart$ = this.actions$
        .ofType(OrdersCommonActionTypes.OrderPlaced)
        .map(() => new LoadShoppingCartAction());

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<ShoppingCartState>,
        private shoppingCartService: ShoppingCartService
    ) { }
}

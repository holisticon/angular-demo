import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { ShoppingCartService } from '../shopping-cart.service';
import { AddToShoppingCartAction, DeleteShoppingCartItemAction, LoadShoppingCartAction, ShoppingCartActionTypes, ShoppingCartLoadedAction, UpdateShoppingCartItemQuantityAction } from './shopping-cart.actions';
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
    addToShoppingCart$ = this.dataPersistence.pessimisticUpdate<AddToShoppingCartAction>(
        ShoppingCartActionTypes.AddToShoppingCart,
        {
            run: (action, state) => {
                return this.shoppingCartService
                    .addShoppingCartItem(action.payload)
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

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<ShoppingCartState>,
        private shoppingCartService: ShoppingCartService
    ) { }
}

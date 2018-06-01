import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { AddToShoppingCartService } from '../add-to-shopping-cart.service';
import { AddToShoppingCartAction, ShoppingCartCommonActionTypes, ShoppingCartLoadedAction } from './shopping-cart-common.actions';

@Injectable()
export class ShoppingCartCommonEffects {

    @Effect()
    addToShoppingCart$ = this.dataPersistence.pessimisticUpdate<AddToShoppingCartAction>(
        ShoppingCartCommonActionTypes.AddToShoppingCart,
        {
            run: (action, state) => {
                return this.addToShoppingCartService
                    .addProduct(action.payload)
                    .map(shoppingCart => new ShoppingCartLoadedAction(shoppingCart));
            },

            onError: (action, error) => {
                console.error('Error', error);
            }
        }
    );

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<void>,
        private addToShoppingCartService: AddToShoppingCartService
    ) {}
}

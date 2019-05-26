import { Injectable } from '@angular/core';
import { Dispatch, StoreService } from '@ngxp/store-service';
import { AdditionToShoppingCart } from '../shopping-cart.model';
import { AddToShoppingCartAction } from './shopping-cart-common.actions';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartCommonStore extends StoreService<void> {

    @Dispatch(AddToShoppingCartAction)
    addToShoppingCart!: (additionToShoppingCart: AdditionToShoppingCart) => void;

}

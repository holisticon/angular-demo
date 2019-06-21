import { Injectable } from '@angular/core';
import { StoreService } from '@ngxp/store-service';
import { AdditionToShoppingCart } from '../shopping-cart.model';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartCommonStore extends StoreService<void> {

    // @Dispatch(AddToShoppingCartAction)
    addToShoppingCart: (additionToShoppingCart: AdditionToShoppingCart) => void = () => {};

}

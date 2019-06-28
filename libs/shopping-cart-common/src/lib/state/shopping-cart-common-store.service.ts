import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, StoreService } from '@ngxp/store-service';
import { addToShoppingCartAction } from './shopping-cart-common.actions';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartCommonStore extends StoreService<void> {

    @Dispatch(addToShoppingCartAction)
    addToShoppingCart!: Dispatcher<typeof addToShoppingCartAction>;

}

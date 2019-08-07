import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, Observe, StoreService } from '@ngxp/store-service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../shopping-cart.model';
import { addToShoppingCartAction, itemAddedToShoppingCartAction } from './shopping-cart-common.actions';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartCommonStore extends StoreService<void> {

    @Dispatch(addToShoppingCartAction)
    addToShoppingCart!: Dispatcher<typeof addToShoppingCartAction>;

    @Observe([itemAddedToShoppingCartAction], (action: ReturnType<typeof itemAddedToShoppingCartAction>) => action.shoppingCart)
    itemAddedToShoppingCart$!: Observable<ShoppingCart>;

}

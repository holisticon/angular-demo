import { Injectable } from '@angular/core';
import { ShoppingCart } from '@ngxp/shopping-cart-common';
import { Dispatch, Dispatcher, Select, StoreService } from '@ngxp/store-service';
import { Observable } from 'rxjs';
import { deleteShoppingCartItemAction, loadShoppingCartAction, updateShoppingCartItemQuantityAction } from './shopping-cart.actions';
import { ShoppingCartPartialState } from './shopping-cart.reducer';
import { getShoppingCart } from './shopping-cart.selectors';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartStore extends StoreService<ShoppingCartPartialState> {

    @Select(getShoppingCart)
    getShoppingCart!: () => Observable<ShoppingCart>;

    @Dispatch(loadShoppingCartAction)
    loadShoppingCart!: Dispatcher<typeof loadShoppingCartAction>;

    @Dispatch(updateShoppingCartItemQuantityAction)
    updateShoppingCartItemQuantity!: Dispatcher<typeof updateShoppingCartItemQuantityAction>;

    @Dispatch(deleteShoppingCartItemAction)
    deleteShoppingCartItem!: Dispatcher<typeof deleteShoppingCartItemAction>;

}

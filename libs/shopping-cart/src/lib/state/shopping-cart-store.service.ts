import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, Select, Selector, StoreService } from '@ngxp/store-service';
import { deleteShoppingCartItemAction, loadShoppingCartAction, updateShoppingCartItemQuantityAction } from './shopping-cart.actions';
import { ShoppingCartAppState } from './shopping-cart.reducer';
import { selectShoppingCart } from './shopping-cart.selectors';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartStore extends StoreService<ShoppingCartAppState> {

    @Select(selectShoppingCart)
    getShoppingCart!: Selector<typeof selectShoppingCart>;

    @Dispatch(loadShoppingCartAction)
    loadShoppingCart!: Dispatcher<typeof loadShoppingCartAction>;

    @Dispatch(updateShoppingCartItemQuantityAction)
    updateShoppingCartItemQuantity!: Dispatcher<typeof updateShoppingCartItemQuantityAction>;

    @Dispatch(deleteShoppingCartItemAction)
    deleteShoppingCartItem!: Dispatcher<typeof deleteShoppingCartItemAction>;

}

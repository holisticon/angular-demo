import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, Observe, Select, Selector, StoreService } from '@ngxp/store-service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../domain/shopping-cart';
import { addToShoppingCartAction, deleteShoppingCartItemAction, itemAddedToShoppingCartAction, updateShoppingCartItemQuantityAction } from './shopping-cart.actions';
import { ShoppingCartAppState } from './shopping-cart.reducer';
import { selectShoppingCart } from './shopping-cart.selectors';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartStore extends StoreService<ShoppingCartAppState> {

    @Select(selectShoppingCart)
    getShoppingCart!: Selector<typeof selectShoppingCart>;

    @Dispatch(updateShoppingCartItemQuantityAction)
    updateShoppingCartItemQuantity!: Dispatcher<typeof updateShoppingCartItemQuantityAction>;

    @Dispatch(deleteShoppingCartItemAction)
    deleteShoppingCartItem!: Dispatcher<typeof deleteShoppingCartItemAction>;

    @Dispatch(addToShoppingCartAction)
    addToShoppingCart!: Dispatcher<typeof addToShoppingCartAction>;

    @Observe([itemAddedToShoppingCartAction], (action: ReturnType<typeof itemAddedToShoppingCartAction>) => action.shoppingCart)
    itemAddedToShoppingCart$!: Observable<ShoppingCart>;

}

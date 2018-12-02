import { Injectable } from '@angular/core';
import { ResourceWith } from '@ngxp/common';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '@ngxp/shopping-cart-common';
import { Dispatch, Select, StoreService } from '@ngxp/store-service';
import { Observable } from 'rxjs';
import { DeleteShoppingCartItemAction, LoadShoppingCartAction, UpdateShoppingCartItemQuantityAction } from './shopping-cart.actions';
import { ShoppingCartPartialState } from './shopping-cart.reducer';
import { getShoppingCart } from './shopping-cart.selectors';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartStore extends StoreService<ShoppingCartPartialState> {

    @Select(() => getShoppingCart)
    getShoppingCart: () => Observable<ShoppingCart>;

    @Dispatch(LoadShoppingCartAction)
    loadShoppingCart: () => void;

    @Dispatch(UpdateShoppingCartItemQuantityAction)
    updateShoppingCartItemQuantity: (quantityUpdate: ResourceWith<QuantityUpdate>) => void;

    @Dispatch(DeleteShoppingCartItemAction)
    deleteShoppingCartItem: (shoppingCartItem: ShoppingCartItem) => void;

}

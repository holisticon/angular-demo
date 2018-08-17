import { Injectable } from '@angular/core';
import { ShoppingCart, QuantityUpdate, ShoppingCartItem } from '@ngxp/shopping-cart-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppingCartAppState } from './shopping-cart.reducer';
import { getShoppingCart } from './shopping-cart.selectors';
import { Selector, StoreService, Action } from '@ngx-patterns/store-service';
import { UpdateShoppingCartItemQuantityAction, DeleteShoppingCartItemAction, LoadShoppingCartAction } from './shopping-cart.actions';
import { ResourceWith } from '@ngxp/common';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartStore extends StoreService<ShoppingCartAppState> {

    @Selector(getShoppingCart)
    getShoppingCart: () => Observable<ShoppingCart>;

    @Action(LoadShoppingCartAction)
    loadShoppingCart: () => void;

    @Action(UpdateShoppingCartItemQuantityAction)
    updateShoppingCartItemQuantity: (quantityUpdate: ResourceWith<QuantityUpdate>) => void;

    @Action(DeleteShoppingCartItemAction)
    deleteShoppingCartItem: (shoppingCartItem: ShoppingCartItem) => void;

}

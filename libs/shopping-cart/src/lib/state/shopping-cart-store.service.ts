import { Injectable } from '@angular/core';
import { StoreSelector } from '@luchsamapparat/common';
import { ShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppingCartAppState } from './shopping-cart.reducer';
import { getShoppingCart } from './shopping-cart.selectors';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartStore {

    constructor(
        private store: Store<ShoppingCartAppState>
    ) { }

    @StoreSelector(getShoppingCart)
    getShoppingCart: () => Observable<ShoppingCart>;

}

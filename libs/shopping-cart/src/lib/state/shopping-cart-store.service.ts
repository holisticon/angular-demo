import { Injectable } from '@angular/core';
import { ShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppingCartAppState } from './shopping-cart.reducer';
import { getShoppingCart } from './shopping-cart.selectors';
import { Selector, StoreService } from '@ngx-patterns/store-service';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartStore extends StoreService<ShoppingCartAppState> {

    @Selector(getShoppingCart)
    getShoppingCart: () => Observable<ShoppingCart>;

}

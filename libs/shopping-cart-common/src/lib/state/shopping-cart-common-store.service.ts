import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Selector, StoreService, Action } from '@ngx-patterns/store-service';
import { AddToShoppingCartAction } from './shopping-cart-common.actions';
import { AdditionToShoppingCart } from '../shopping-cart.model';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartCommonStore extends StoreService<void> {

    @Action(AddToShoppingCartAction)
    addToShoppingCart: (additionToShoppingCart: AdditionToShoppingCart) => void;

}

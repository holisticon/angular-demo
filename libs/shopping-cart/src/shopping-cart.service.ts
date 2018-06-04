import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getId } from '@luchsamapparat/common';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ShoppingCartService {

    constructor(
        private httpClient: HttpClient
    ) {}

    loadShoppingCart(): Observable<ShoppingCart> {
        return this.httpClient
            .get<ShoppingCart>(
                `http://localhost/shoppingCart`
            );
    }

    updateShoppingCartItemQuantity(shoppingCartItem: ShoppingCartItem, quantityUpdate: QuantityUpdate): Observable<ShoppingCart> {
        return this.httpClient
            .patch<ShoppingCart>(
                `http://localhost/shoppingCart/items/${getId(shoppingCartItem)}`,
                quantityUpdate
            );
    }

    deleteShoppingCartItem(shoppingCartItem: ShoppingCartItem): Observable<ShoppingCart> {
        return this.httpClient
            .delete<ShoppingCart>(
                `http://localhost/shoppingCart/items/${getId(shoppingCartItem)}`
            );
    }

}

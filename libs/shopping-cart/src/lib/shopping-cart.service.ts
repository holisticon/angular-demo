import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getId } from '@ngxp/common';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '@ngxp/shopping-cart-common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    constructor(
        private httpClient: HttpClient
    ) {}

    loadShoppingCart(): Observable<ShoppingCart> {
        return this.httpClient
            .get<ShoppingCart>(
                'https://example.hypercontract.org/shoppingCart'
            );
    }

    updateShoppingCartItemQuantity(shoppingCartItem: ShoppingCartItem, quantityUpdate: QuantityUpdate): Observable<ShoppingCart> {
        return this.httpClient
            .patch<ShoppingCart>(
                `https://example.hypercontract.org/shoppingCart/items/${getId(shoppingCartItem)}`,
                quantityUpdate
            );
    }

    deleteShoppingCartItem(shoppingCartItem: ShoppingCartItem): Observable<ShoppingCart> {
        return this.httpClient
            .delete<ShoppingCart>(
                `https://example.hypercontract.org/shoppingCart/items/${getId(shoppingCartItem)}`
            );
    }

}

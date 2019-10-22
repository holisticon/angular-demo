import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getId, Resource } from '@ngxp/resource';
import { QuantityUpdate, ShoppingCart, ShoppingCartItem } from '@ngxp/shopping-cart-common';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    constructor(
        private httpClient: HttpClient
    ) {}

    loadShoppingCart() {
        return this.httpClient
            .get<Resource<ShoppingCart>>(
                'http://localhost:80/shoppingCart'
            );
    }

    updateShoppingCartItemQuantity(shoppingCartItem: ShoppingCartItem, quantityUpdate: QuantityUpdate) {
        return this.httpClient
            .patch<Resource<ShoppingCart>>(
                `http://localhost:80/shoppingCart/items/${getId(shoppingCartItem)}`,
                quantityUpdate
            );
    }

    deleteShoppingCartItem(shoppingCartItem: ShoppingCartItem) {
        return this.httpClient
            .delete<Resource<ShoppingCart>>(
                `http://localhost:80/shoppingCart/items/${getId(shoppingCartItem)}`
            );
    }

}

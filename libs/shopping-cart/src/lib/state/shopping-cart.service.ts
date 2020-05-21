import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getUri, Resource } from '@ngxp/resource';
import { AdditionToShoppingCart, QuantityUpdate, ShoppingCart, ShoppingCartItem } from '../domain/shopping-cart';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    constructor(
        private httpClient: HttpClient
    ) { }

    loadShoppingCart() {
        return this.httpClient
            .get<Resource<ShoppingCart>>(
                'https://example.hypercontract.org/shoppingCart'
            );
    }

    updateShoppingCartItemQuantity(shoppingCartItem: ShoppingCartItem, quantityUpdate: QuantityUpdate) {
        return this.httpClient
            .patch<Resource<ShoppingCart>>(
                getUri(shoppingCartItem),
                quantityUpdate
            );
    }

    deleteShoppingCartItem(shoppingCartItem: ShoppingCartItem) {
        return this.httpClient
            .delete<Resource<ShoppingCart>>(
                getUri(shoppingCartItem)
            );
    }

    addToShoppingCart(additionToShoppingCart: AdditionToShoppingCart) {
        return this.httpClient
            .post<Resource<ShoppingCart>>(
                'https://example.hypercontract.org/shoppingCart/items',
                additionToShoppingCart
            );
    }
}

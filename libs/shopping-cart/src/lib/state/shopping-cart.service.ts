import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getUri } from '@holisticon/resource';
import { AdditionToShoppingCart, QuantityUpdate, ShoppingCart, ShoppingCartItem } from '../domain';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    constructor(
        private httpClient: HttpClient
    ) { }

    loadShoppingCart() {
        return this.httpClient
            .get<ShoppingCart>(
                'https://webapp-demos-api.azurewebsites.net/shoppingCart'
            );
    }

    updateShoppingCartItemQuantity(shoppingCartItem: ShoppingCartItem, quantityUpdate: QuantityUpdate) {
        return this.httpClient
            .patch<ShoppingCart>(
                getUri(shoppingCartItem),
                quantityUpdate
            );
    }

    deleteShoppingCartItem(shoppingCartItem: ShoppingCartItem) {
        return this.httpClient
            .delete<ShoppingCart>(
                getUri(shoppingCartItem)
            );
    }

    addToShoppingCart(additionToShoppingCart: AdditionToShoppingCart) {
        return this.httpClient
            .post<ShoppingCart>(
                'https://webapp-demos-api.azurewebsites.net/shoppingCart/items',
                additionToShoppingCart
            );
    }
}

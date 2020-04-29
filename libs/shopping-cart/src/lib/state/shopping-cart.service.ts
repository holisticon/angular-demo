import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getUri, Resource } from '@ngxp/resource';
import { isNull } from 'lodash-es';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
            .post(
                'https://example.hypercontract.org/shoppingCart/items',
                additionToShoppingCart,
                { responseType: 'text', observe: 'response' }
            )
            .pipe(
                switchMap(response => this.handleRedirect<Resource<ShoppingCart>>(response))
            );
    }

    // TODO: refactor together with identical implementation form OrdersCommonService
    private handleRedirect<T>(response: HttpResponse<any>) {
        const location = response.headers.get('Location');

        if (isNull(location)) {
            return EMPTY;
        }

        return this.httpClient.get<T>(location);
    }
}

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getId } from '@luchsamapparat/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';
import { AdditionToShoppingCart, QuantityUpdate, ShoppingCart, ShoppingCartItem } from './shopping-cart.model';

@Injectable()
export class ShoppingCartService {

    constructor(
        private httpClient: HttpClient
    ) { }

    loadShoppingCart(): Observable<ShoppingCart> {
        return this.httpClient
            .get<ShoppingCart>(`http://localhost/shoppingCart`);
    }

    addShoppingCartItem(additionToShoppingCart: AdditionToShoppingCart): Observable<ShoppingCart> {
        return this.httpClient
            .post(
                `http://localhost/shoppingCart/items`,
                additionToShoppingCart,
                { responseType: 'text', observe: 'response' }
            )
            .switchMap(response => this.handleRedirect<ShoppingCart>(response));
    }

    updateQuantity(shoppingCartItem: ShoppingCartItem, quantityUpdate: QuantityUpdate): Observable<ShoppingCart> {
        return this.httpClient
            .patch<ShoppingCart>(
                `http://localhost/shoppingCart/items/${getId(shoppingCartItem)}`,
                quantityUpdate
            );
    }

    private handleRedirect<T>(response: HttpResponse<any>) {
        return this.httpClient
            .get<T>(response.headers.get('Location'));
    }

}

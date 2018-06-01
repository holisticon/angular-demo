import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdditionToShoppingCart, ShoppingCart } from '@luchsamapparat/shopping-cart-common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AddToShoppingCartService {

    constructor(
        private httpClient: HttpClient
    ) { }

    addProduct(additionToShoppingCart: AdditionToShoppingCart): Observable<ShoppingCart> {
        return this.httpClient
            .post(
                `http://localhost/shoppingCart/items`,
                additionToShoppingCart,
                { responseType: 'text', observe: 'response' }
            )
            .switchMap(response => this.handleRedirect<ShoppingCart>(response));
    }

    private handleRedirect<T>(response: HttpResponse<any>) {
        return this.httpClient.get<T>(response.headers.get('Location'));
    }
}

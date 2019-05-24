import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdditionToShoppingCart, ShoppingCart } from '@ngxp/shopping-cart-common';
import { isNull } from 'lodash-es';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartCommonService {

    constructor(
        private httpClient: HttpClient
    ) { }

    addToShoppingCart(additionToShoppingCart: AdditionToShoppingCart): Observable<ShoppingCart> {
        return this.httpClient
            .post(
                'https://example.hypercontract.org/shoppingCart/items',
                additionToShoppingCart,
                { responseType: 'text', observe: 'response' }
            )
            .pipe(
                switchMap(response => this.handleRedirect<ShoppingCart>(response))
            );
    }

    private handleRedirect<T>(response: HttpResponse<any>) {
        const location = response.headers.get('Location');

        if (isNull(location)) {
            return EMPTY;
        }

        return this.httpClient.get<T>(location);
    }
}

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';
import { AdditionToShoppingCart, ShoppingCart } from './shopping-cart.model';

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

  private handleRedirect<T>(response: HttpResponse<any>) {
      return this.httpClient
        .get<T>(response.headers.get('Location'));
  }

}

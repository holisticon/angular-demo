import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from '@ngxp/common';
import { isNull } from 'lodash-es';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { toNewOrderRequest } from './new-order-request.mapper';
import { NewOrder, Order } from './order.model';

@Injectable({
    providedIn: 'root'
})
export class OrdersCommonService {

    constructor(
        private httpClient: HttpClient
    ) { }

    placeOrder(newOrder: NewOrder) {
        return this.httpClient
            .post(
                'https://example.hypercontract.org/orders',
                toNewOrderRequest(newOrder),
                { responseType: 'text', observe: 'response' }
            )
            .pipe(
                switchMap(response => this.handleRedirect<Resource<Order>>(response))
            );
    }

    // TODO: refactor together with identical implementation form ShoppingCartCommonService
    private handleRedirect<T>(response: HttpResponse<any>) {
        const location = response.headers.get('Location');

        if (isNull(location)) {
            return EMPTY;
        }

        return this.httpClient.get<T>(location);
    }
}

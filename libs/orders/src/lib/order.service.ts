import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from '@ngxp/resource';
import { isNull } from 'lodash-es';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { toNewOrderRequest } from './new-order-request.mapper';
import { NewOrder, Order, OrderHistory } from './order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private httpClient: HttpClient
    ) { }

    loadOrderHistory() {
        return this.httpClient
            .get<Resource<OrderHistory>>(
                'https://example.hypercontract.org/orders'
            );
    }

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

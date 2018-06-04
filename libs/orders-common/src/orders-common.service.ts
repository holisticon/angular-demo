import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { toNewOrderRequest } from './new-order-request.mapper';
import { NewOrder, Order } from './order.model';

@Injectable()
export class OrdersCommonService {

    constructor(
        private httpClient: HttpClient
    ) { }

    placeOrder(newOrder: NewOrder): Observable<Order> {
        return this.httpClient
            .post(
                `http://localhost/orders`,
                toNewOrderRequest(newOrder),
                { responseType: 'text', observe: 'response' }
            )
            .switchMap(response => this.handleRedirect<Order>(response));
    }

    private handleRedirect<T>(response: HttpResponse<any>) {
        return this.httpClient.get<T>(response.headers.get('Location'));
    }
}

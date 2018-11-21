import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

    placeOrder(newOrder: NewOrder): Observable<Order> {
        return this.httpClient
            .post(
                `https://example.hypercontract.org/orders`,
                toNewOrderRequest(newOrder),
                { responseType: 'text', observe: 'response' }
            )
            .pipe(
                switchMap(response => this.handleRedirect<Order>(response))
            );
    }

    private handleRedirect<T>(response: HttpResponse<any>) {
        return this.httpClient.get<T>(response.headers.get('Location'));
    }
}

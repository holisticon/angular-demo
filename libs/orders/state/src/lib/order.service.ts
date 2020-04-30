import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewOrder, Order, OrderHistory } from '@ngxp/orders/domain';
import { Resource } from '@ngxp/resource';
import { toNewOrderRequest } from './new-order-request.mapper';

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
            .post<Resource<Order>>(
                'https://example.hypercontract.org/orders',
                toNewOrderRequest(newOrder)
            )
    }
}

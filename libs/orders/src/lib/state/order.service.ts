import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from '@holisticon/resource';
import { NewOrder, Order, OrderHistory } from '../domain';
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
            .get<OrderHistory>(
                'https://webapp-demos-api.azurewebsites.net/orders'
            );
    }

    placeOrder(newOrder: NewOrder) {
        return this.httpClient
            .post<Resource<Order>>(
                'https://webapp-demos-api.azurewebsites.net/orders',
                toNewOrderRequest(newOrder)
            )
    }
}

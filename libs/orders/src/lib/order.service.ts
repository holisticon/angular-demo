import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from '@ngxp/common';
import { Order } from '@ngxp/orders-common';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private httpClient: HttpClient
    ) {}

    loadOrders() {
        return this.httpClient
            .get<Resource<Order>[]>(
                'https://example.hypercontract.org/orders'
            );
    }

}

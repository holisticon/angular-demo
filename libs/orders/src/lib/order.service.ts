import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderHistory } from '@ngxp/orders-common';
import { Resource } from '@ngxp/resource';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private httpClient: HttpClient
    ) {}

    loadOrderHistory() {
        return this.httpClient
            .get<Resource<OrderHistory>>(
                'https://example.hypercontract.org/orders'
            );
    }

}

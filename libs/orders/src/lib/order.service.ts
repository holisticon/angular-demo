import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '@ngxp/orders-common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private httpClient: HttpClient
    ) {}

    loadOrders(): Observable<Order[]> {
        return this.httpClient
            .get<Order[]>(
                `https://example.hypercontract.org/orders`
            );
    }

}

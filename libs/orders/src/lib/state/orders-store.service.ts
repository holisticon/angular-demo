import { Injectable } from '@angular/core';
import { StoreSelector } from '@luchsamapparat/common';
import { Order } from '@luchsamapparat/orders-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrdersAppState } from './orders.reducer';
import { getOrders } from './orders.selectors';

@Injectable({
    providedIn: 'root'
})
export class OrdersStore {

    constructor(
        private store: Store<OrdersAppState>
    ) { }

    @StoreSelector(getOrders)
    getOrders: () => Observable<Order[]>;

}

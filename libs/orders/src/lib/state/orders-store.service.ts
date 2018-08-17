import { Injectable } from '@angular/core';
import { Order } from '@ngxp/orders-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrdersAppState } from './orders.reducer';
import { getOrders } from './orders.selectors';
import { Selector, StoreService, Action } from '@ngx-patterns/store-service';
import { LoadOrdersAction } from './orders.actions';

@Injectable({
    providedIn: 'root'
})
export class OrdersStore extends StoreService<OrdersAppState> {

    @Selector(getOrders)
    getOrders: () => Observable<Order[]>;

    @Action(LoadOrdersAction)
    loadOrders: () => void;

}

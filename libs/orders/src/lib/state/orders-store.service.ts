import { Injectable } from '@angular/core';
import { Order } from '@ngxp/orders-common';
import { Dispatch, Dispatcher, Select, StoreService } from '@ngxp/store-service';
import { Observable } from 'rxjs';
import { loadOrdersAction } from './orders.actions';
import { OrdersPartialState } from './orders.reducer';
import { getOrders } from './orders.selectors';

@Injectable({
    providedIn: 'root'
})
export class OrdersStore extends StoreService<OrdersPartialState> {

    @Select(getOrders)
    getOrders!: () => Observable<Order[]>;

    @Dispatch(loadOrdersAction)
    loadOrders!: Dispatcher<typeof loadOrdersAction>;

}

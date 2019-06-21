import { Injectable } from '@angular/core';
import { Order } from '@ngxp/orders-common';
import { Select, StoreService } from '@ngxp/store-service';
import { EMPTY, Observable } from 'rxjs';
import { OrdersPartialState } from './orders.reducer';
import { getOrders } from './orders.selectors';

@Injectable({
    providedIn: 'root'
})
export class OrdersStore extends StoreService<OrdersPartialState> {

    @Select(() => getOrders)
    getOrders: () => Observable<Order[]> = () => EMPTY;

    // @Dispatch(LoadOrdersAction)
    loadOrders: () => void = () => {};

}

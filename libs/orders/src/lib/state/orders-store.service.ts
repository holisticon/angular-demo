import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, Select, Selector, StoreService } from '@ngxp/store-service';
import { loadOrdersAction } from './orders.actions';
import { OrdersAppState } from './orders.reducer';
import { selectOrders } from './orders.selectors';

@Injectable({
    providedIn: 'root'
})
export class OrdersStore extends StoreService<OrdersAppState> {

    @Select(selectOrders)
    getOrders!: Selector<typeof selectOrders>;

    @Dispatch(loadOrdersAction)
    loadOrders!: Dispatcher<typeof loadOrdersAction>;

}

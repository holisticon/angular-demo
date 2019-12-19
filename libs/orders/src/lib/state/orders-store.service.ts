import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, Select, Selector, StoreService } from '@ngxp/store-service';
import { loadOrderHistoryAction as loadOrderHistoryAction } from './orders.actions';
import { OrdersAppState } from './orders.reducer';
import { selectOrderHistory } from './orders.selectors';

@Injectable({
    providedIn: 'root'
})
export class OrdersStore extends StoreService<OrdersAppState> {

    @Select(selectOrderHistory)
    getOrderHistory!: Selector<typeof selectOrderHistory>;

    @Dispatch(loadOrderHistoryAction)
    loadOrderHistory!: Dispatcher<typeof loadOrderHistoryAction>;

}

import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, Observe, Select, Selector, StoreService } from '@ngxp/store-service';
import { Observable } from 'rxjs';
import { Order } from '../domain/order';
import { loadOrderHistoryAction, orderPlacedAction, placeOrderAction } from './orders.actions';
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

    @Dispatch(placeOrderAction)
    placeOrder!: Dispatcher<typeof placeOrderAction>;

    @Observe([orderPlacedAction], (action: ReturnType<typeof orderPlacedAction>) => action.order)
    orderPlaced$!: Observable<Order>;

}

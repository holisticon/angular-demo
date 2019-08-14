import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, Observe, StoreService } from '@ngxp/store-service';
import { Observable } from 'rxjs';
import { Order } from '../order.model';
import { orderPlacedAction, placeOrderAction } from './orders-common.actions';

@Injectable({
    providedIn: 'root'
})
export class OrdersCommonStore extends StoreService<void> {

    @Dispatch(placeOrderAction)
    placeOrder!: Dispatcher<typeof placeOrderAction>;

    @Observe([orderPlacedAction], (action: ReturnType<typeof orderPlacedAction>) => action.order)
    orderPlaced$!: Observable<Order>;

}

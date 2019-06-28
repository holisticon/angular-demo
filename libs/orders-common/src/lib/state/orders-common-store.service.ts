import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, StoreService } from '@ngxp/store-service';
import { placeOrderAction } from './orders-common.actions';

@Injectable({
    providedIn: 'root'
})
export class OrdersCommonStore extends StoreService<void> {

    @Dispatch(placeOrderAction)
    placeOrder!: Dispatcher<typeof placeOrderAction>;

}

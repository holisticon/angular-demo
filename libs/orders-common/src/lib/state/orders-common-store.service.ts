import { Injectable } from '@angular/core';
import { Dispatch, StoreService } from '@ngxp/store-service';
import { NewOrder } from '../order.model';
import { PlaceOrderAction } from './orders-common.actions';

@Injectable({
    providedIn: 'root'
})
export class OrdersCommonStore extends StoreService<void> {

    @Dispatch(PlaceOrderAction)
    placeOrder: (newOrder: NewOrder) => void;

}

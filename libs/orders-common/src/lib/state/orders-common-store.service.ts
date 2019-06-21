import { Injectable } from '@angular/core';
import { StoreService } from '@ngxp/store-service';
import { NewOrder } from '../order.model';

@Injectable({
    providedIn: 'root'
})
export class OrdersCommonStore extends StoreService<void> {

    // @Dispatch(PlaceOrderAction)
    placeOrder: (newOrder: NewOrder) => void = () => {};

}

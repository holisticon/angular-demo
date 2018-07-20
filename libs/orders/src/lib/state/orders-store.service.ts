import { Injectable } from '@angular/core';
import { Order } from '@luchsamapparat/orders-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrdersAppState } from './orders.reducer';
import { getOrders } from './orders.selectors';
import { Selector, StoreService } from '@ngx-patterns/store-service';

@Injectable({
    providedIn: 'root'
})
export class OrdersStore extends StoreService<OrdersAppState> {

    @Selector(getOrders)
    getOrders: () => Observable<Order[]>;

}

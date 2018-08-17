import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Selector, StoreService, Action } from '@ngx-patterns/store-service';
import { ResourceWith } from '@ngxp/common';
import { PlaceOrderAction } from './orders-common.actions';
import { NewOrder } from '../order.model';

@Injectable({
    providedIn: 'root'
})
export class OrdersCommonStore extends StoreService<void> {

    @Action(PlaceOrderAction)
    placeOrder: (newOrder: NewOrder) => void;

}

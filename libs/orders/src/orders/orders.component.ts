import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Order } from '@luchsamapparat/orders-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { OrdersAppState } from '../state/orders.reducer';
import { getOrders } from '../state/orders.selectors';

@Component({
    selector: 'cfha-orders',
    templateUrl: './orders.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {

    orders$: Observable<Order[]>;

    constructor(
        private store: Store<OrdersAppState>
    ) {
        this.orders$ = this.store.select(getOrders());
    }

}

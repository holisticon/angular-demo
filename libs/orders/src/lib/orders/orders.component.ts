import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Order } from '@ngxp/orders-common';
import { Observable } from 'rxjs';
import { OrdersStore } from '../state/orders-store.service';

@Component({
    selector: 'ngxp-orders',
    templateUrl: './orders.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {

    orders$: Observable<Order[]>;

    constructor(
        private ordersStore: OrdersStore
    ) {
        this.orders$ = this.ordersStore.getOrders();
    }

}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../order.model';
import { OrdersStore } from '../state/orders-store.service';

@Component({
    selector: 'ngxp-orders',
    templateUrl: './orders.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {

    orderHistory$: Observable<OrderHistory | null>;

    constructor(
        private ordersStore: OrdersStore
    ) {
        this.orderHistory$ = this.ordersStore.getOrderHistory();
    }

}

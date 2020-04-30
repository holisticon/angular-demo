import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../../domain/order';
import { OrdersStateModule } from '../../state/orders-state.module';
import { OrdersStore } from '../../state/orders-store.service';
import { OrderModule } from '../../ui/order/order.component';

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

@NgModule({
    declarations: [OrdersComponent],
    imports: [CommonModule, OrdersStateModule, OrderModule]
})
export class OrdersModule { }

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../../domain';
import { OrdersStateModule, OrdersStore } from '../../state';
import { OrderModule } from '../../ui';

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

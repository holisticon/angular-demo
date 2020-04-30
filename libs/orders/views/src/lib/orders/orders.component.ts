import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { OrderHistory } from '@ngxp/orders/domain';
import { OrdersStateModule, OrdersStore } from '@ngxp/orders/state';
import { OrderModule } from '@ngxp/orders/ui';
import { Observable } from 'rxjs';

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

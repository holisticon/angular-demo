import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { Order } from '@ngxp/orders/domain';
import { AddressModule, PaymentOptionModule } from '@ngxp/user-profile/ui';

@Component({
    selector: 'ngxp-order',
    templateUrl: './order.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {

    @Input()
    order!: Order;

}

@NgModule({
    declarations: [OrderComponent],
    exports: [OrderComponent],
    imports: [CommonModule, AddressModule, PaymentOptionModule]
})
export class OrderModule { }

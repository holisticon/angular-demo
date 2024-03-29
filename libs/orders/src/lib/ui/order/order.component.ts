import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { AddressModule, PaymentOptionModule } from "@holisticon/user-profile";
import { Order } from '../../domain';

@Component({
    selector: 'holisticon-order',
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

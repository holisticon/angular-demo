import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Order } from '../../domain/order';

@Component({
    selector: 'ngxp-order',
    templateUrl: './order.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {

    @Input()
    order!: Order;

}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Order } from '@luchsamapparat/orders-common';

@Component({
    selector: 'cfha-order',
    templateUrl: './order.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {

    @Input()
    order: Order;

}

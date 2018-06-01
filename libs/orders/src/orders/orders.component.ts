import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Order } from '@luchsamapparat/orders-common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
    selector: 'cfha-orders',
    templateUrl: './orders.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {

    orders: Observable<Order[]> = Observable.of([]);

}

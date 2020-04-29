import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { UserProfileModule } from '@ngxp/user-profile';
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

@NgModule({
    declarations: [OrderComponent],
    exports: [OrderComponent],
    imports: [CommonModule, UserProfileModule]
})
export class OrderModule { }

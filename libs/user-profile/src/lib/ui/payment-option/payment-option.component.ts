import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { PaymentOption } from '../../domain';

@Component({
    selector: 'holisticon-payment-option',
    templateUrl: './payment-option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentOptionComponent {

    @Input()
    paymentOption!: PaymentOption

}

@NgModule({
    declarations: [PaymentOptionComponent],
    exports: [PaymentOptionComponent]
})
export class PaymentOptionModule { }

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaymentOption } from '../user-profile.model';

@Component({
    selector: 'ngxp-payment-option',
    templateUrl: './payment-option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentOptionComponent {

    @Input()
    paymentOption!: PaymentOption

}

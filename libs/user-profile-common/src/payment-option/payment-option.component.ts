import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaymentOption } from '@luchsamapparat/user-profile-common';

@Component({
    selector: 'cfha-payment-option',
    templateUrl: './payment-option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentOptionComponent {

    @Input()
    paymentOption: PaymentOption

}

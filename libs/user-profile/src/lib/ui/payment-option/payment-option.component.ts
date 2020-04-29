import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { PaymentOption } from '../../domain/user-profile';

@Component({
    selector: 'ngxp-payment-option',
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

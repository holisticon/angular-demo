import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, NgModule } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PaymentOption } from '@ngxp/user-profile/domain';
import { PaymentOptionModule } from '@ngxp/user-profile/ui';
import { isNil, uniqueId } from 'lodash-es';

@Component({
    selector: 'ngxp-payment-option-options',
    templateUrl: './payment-option-options.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PaymentOptionOptionsComponent),
            multi: true
        }
    ]
})
export class PaymentOptionOptionsComponent implements ControlValueAccessor {

    @Input()
    set paymentOptions(paymentOptions: PaymentOption[]) {
        this.paymentOptionOptions = [...paymentOptions];
        this.selectedPaymentOption = paymentOptions[0];
    };

    selectedPaymentOption: PaymentOption | undefined = undefined;

    paymentOptionOptions: PaymentOption[] = [];

    uniqueId = uniqueId('payment-option-');

    private propagateChange = (paymentOption: PaymentOption) => undefined;

    onSelectedPaymentOptionChange(selectedPaymentOption: PaymentOption) {
        this.propagateChange(selectedPaymentOption);
    }

    writeValue(selectedPaymentOption: PaymentOption): void {
        if (isNil(selectedPaymentOption)) {
            return;
        }
        this.selectedPaymentOption = selectedPaymentOption;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void { }

}

@NgModule({
    declarations: [PaymentOptionOptionsComponent],
    exports: [PaymentOptionOptionsComponent],
    imports: [CommonModule, FormsModule, PaymentOptionModule]
})
export class PaymentOptionOptionsModule { }

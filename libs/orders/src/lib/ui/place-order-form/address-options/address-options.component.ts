import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, NgModule } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Address } from '@ngxp/user-profile/domain';
import { AddressModule } from '@ngxp/user-profile/ui';
import { isNil, uniqueId } from 'lodash-es';

@Component({
    selector: 'ngxp-address-options',
    templateUrl: './address-options.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AddressOptionsComponent),
            multi: true
        }
    ]
})
export class AddressOptionsComponent implements ControlValueAccessor {

    @Input()
    set addresses(addresses: Address[]) {
        this.addressOptions = [...addresses];
        this.selectedAddress = addresses[0];
    };

    selectedAddress: Address | undefined = undefined;

    addressOptions: Address[] = [];

    uniqueId = uniqueId('address-');

    private propagateChange = (address: Address) => undefined;

    onSelectedAddressChange(selectedAddress: Address) {
        this.propagateChange(selectedAddress);
    }

    writeValue(selectedAddress: Address): void {
        if (isNil(selectedAddress)) {
            return;
        }
        this.selectedAddress = selectedAddress;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void { }

}

@NgModule({
    declarations: [AddressOptionsComponent],
    exports: [AddressOptionsComponent],
    imports: [CommonModule, FormsModule, AddressModule]
})
export class AddressOptionsModule { }

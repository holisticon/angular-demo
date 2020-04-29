import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, PaymentOption } from '../../domain/user-profile';
import { UserProfileStore } from '../../state/user-profile-store.service';
import { AddressModule } from '../../ui/address/address.component';
import { PaymentOptionModule } from '../../ui/payment-option/payment-option.component';

@Component({
    selector: 'ngxp-user-profile',
    templateUrl: './user-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {

    addresses$: Observable<Address[]>;
    paymentOptions$: Observable<PaymentOption[]>;

    constructor(
        private userProfileStore: UserProfileStore
    ) {
        this.addresses$ = userProfileStore.getAddresses();
        this.paymentOptions$ = userProfileStore.getPaymentOptions();
    }

}

@NgModule({
    declarations: [UserProfileComponent],
    imports: [CommonModule, AddressModule, PaymentOptionModule]
})
export class UserProfileModule { }

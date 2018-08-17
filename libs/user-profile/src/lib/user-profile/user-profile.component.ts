import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Address, PaymentOption, UserProfileCommonStore } from '@ngxp/user-profile-common';
import { Observable } from 'rxjs';

@Component({
    selector: 'ngxp-user-profile',
    templateUrl: './user-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {

    addresses$: Observable<Address[]>;
    paymentOptions$: Observable<PaymentOption[]>;

    constructor(
        private userProfileStore: UserProfileCommonStore
    ) {
        this.addresses$ = userProfileStore.getAddresses();
        this.paymentOptions$ = userProfileStore.getPaymentOptions();
    }

}

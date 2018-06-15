import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Address, PaymentOption, UserProfileStore } from '@luchsamapparat/user-profile-common';
import { Observable } from 'rxjs';

@Component({
    selector: 'cfha-user-profile',
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

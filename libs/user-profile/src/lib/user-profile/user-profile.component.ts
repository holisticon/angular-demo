import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Address, PaymentOption, UserProfileAppState, getAddresses, getPaymentOptions } from '@luchsamapparat/user-profile-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'cfha-user-profile',
    templateUrl: './user-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {

    addresses: Observable<Address[]>;
    paymentOptions: Observable<PaymentOption[]>;

    constructor(
        private store: Store<UserProfileAppState>
    ) {
        this.addresses = this.store.select(getAddresses());
        this.paymentOptions = this.store.select(getPaymentOptions());
    }

}

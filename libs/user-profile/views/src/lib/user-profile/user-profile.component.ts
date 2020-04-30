import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Address, PaymentOption } from '@ngxp/user-profile/domain';
import { UserProfileStateModule, UserProfileStore } from '@ngxp/user-profile/state';
import { AddressModule, PaymentOptionModule } from '@ngxp/user-profile/ui';
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
        userProfileStore: UserProfileStore
    ) {
        this.addresses$ = userProfileStore.getAddresses();
        this.paymentOptions$ = userProfileStore.getPaymentOptions();
    }

}

@NgModule({
    declarations: [UserProfileComponent],
    imports: [CommonModule, UserProfileStateModule, AddressModule, PaymentOptionModule]
})
export class UserProfileModule { }

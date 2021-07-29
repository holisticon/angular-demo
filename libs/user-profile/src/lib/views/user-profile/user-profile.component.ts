import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, PaymentOption } from '../../domain';
import { UserProfileStateModule, UserProfileStore } from '../../state';
import { AddressModule, PaymentOptionModule } from '../../ui';

@Component({
    selector: 'holisticon-user-profile',
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

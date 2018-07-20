import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Address, PaymentOption, UserProfile } from '../user-profile.model';
import { UserProfileAppState } from './user-profile.reducer';
import { getAddresses, getPaymentOptions, getUserProfile } from './user-profile.selectors';
import { Selector, StoreService } from '@ngx-patterns/store-service';

@Injectable({
    providedIn: 'root'
})
export class UserProfileStore extends StoreService<UserProfileAppState> {

    @Selector(getUserProfile)
    getUserProfile: () => Observable<UserProfile>;

    @Selector(getAddresses)
    getAddresses: () => Observable<Address[]>;

    @Selector(getPaymentOptions)
    getPaymentOptions: () => Observable<PaymentOption[]>;

}

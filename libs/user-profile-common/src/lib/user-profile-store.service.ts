import { Injectable } from '@angular/core';
import { StoreSelector } from '@luchsamapparat/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserProfileAppState } from './state/user-profile.reducer';
import { getAddresses, getPaymentOptions, getUserProfile } from './state/user-profile.selectors';
import { Address, PaymentOption, UserProfile } from './user-profile.model';

@Injectable({
    providedIn: 'root'
})
export class UserProfileStore {

    constructor(
        private store: Store<UserProfileAppState>
    ) { }

    @StoreSelector(getUserProfile)
    getUserProfile: () => Observable<UserProfile>;

    @StoreSelector(getAddresses)
    getAddresses: () => Observable<Address[]>;

    @StoreSelector(getPaymentOptions)
    getPaymentOptions: () => Observable<PaymentOption[]>;

}

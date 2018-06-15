import { Injectable } from '@angular/core';
import { StoreSelector } from '@luchsamapparat/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Address, PaymentOption, UserProfile } from '../user-profile.model';
import { UserProfileAppState } from './user-profile.reducer';
import { getAddresses, getPaymentOptions, getUserProfile } from './user-profile.selectors';

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

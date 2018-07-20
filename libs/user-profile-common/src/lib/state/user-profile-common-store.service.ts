import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Address, PaymentOption, UserProfile } from '../user-profile.model';
import { UserProfileAppState } from './user-profile.reducer';
import { getAddresses, getPaymentOptions, getUserProfile } from './user-profile.selectors';
import { Selector, StoreService, Action } from '@ngx-patterns/store-service';
import { LoadUserProfileAction } from './user-profile.actions';

@Injectable({
    providedIn: 'root'
})
export class UserProfileCommonStore extends StoreService<UserProfileAppState> {

    @Selector(getUserProfile)
    getUserProfile: () => Observable<UserProfile>;

    @Selector(getAddresses)
    getAddresses: () => Observable<Address[]>;

    @Selector(getPaymentOptions)
    getPaymentOptions: () => Observable<PaymentOption[]>;

    @Action(LoadUserProfileAction)
    loadUserProfile: () => void;

}

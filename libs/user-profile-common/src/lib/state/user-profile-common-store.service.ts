import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, Select, StoreService } from '@ngxp/store-service';
import { Observable } from 'rxjs';
import { Address, PaymentOption, UserProfile } from '../user-profile.model';
import { loadUserProfileAction } from './user-profile.actions';
import { UserProfilePartialState } from './user-profile.reducer';
import { getAddresses, getPaymentOptions, getUserProfile } from './user-profile.selectors';

@Injectable({
    providedIn: 'root'
})
export class UserProfileCommonStore extends StoreService<UserProfilePartialState> {

    @Select(getUserProfile)
    getUserProfile!: () => Observable<UserProfile>;

    @Select(getAddresses)
    getAddresses!: () => Observable<Address[]>;

    @Select(getPaymentOptions)
    getPaymentOptions!: () => Observable<PaymentOption[]>;

    @Dispatch(loadUserProfileAction)
    loadUserProfile!: Dispatcher<typeof loadUserProfileAction>;

}

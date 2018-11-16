import { Injectable } from '@angular/core';
import { Dispatch, Select, StoreService } from '@ngxp/store-service';
import { Observable } from 'rxjs';
import { Address, PaymentOption, UserProfile } from '../user-profile.model';
import { LoadUserProfileAction } from './user-profile.actions';
import { UserProfileAppState } from './user-profile.reducer';
import { getAddresses, getPaymentOptions, getUserProfile } from './user-profile.selectors';

@Injectable({
    providedIn: 'root'
})
export class UserProfileCommonStore extends StoreService<UserProfileAppState> {

    @Select(getUserProfile)
    getUserProfile: () => Observable<UserProfile>;

    @Select(getAddresses)
    getAddresses: () => Observable<Address[]>;

    @Select(getPaymentOptions)
    getPaymentOptions: () => Observable<PaymentOption[]>;

    @Dispatch(LoadUserProfileAction)
    loadUserProfile: () => void;

}

import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, Select, Selector, StoreService } from '@ngxp/store-service';
import { loadUserProfileAction } from './user-profile.actions';
import { UserProfileAppState } from './user-profile.reducer';
import { selectAddresses, selectPaymentOptions, selectUserProfile } from './user-profile.selectors';

@Injectable({
    providedIn: 'root'
})
export class UserProfileStore extends StoreService<UserProfileAppState> {

    @Select(selectUserProfile)
    getUserProfile!: Selector<typeof selectUserProfile>;

    @Select(selectAddresses)
    getAddresses!: Selector<typeof selectAddresses>;

    @Select(selectPaymentOptions)
    getPaymentOptions!: Selector<typeof selectPaymentOptions>;

    @Dispatch(loadUserProfileAction)
    loadUserProfile!: Dispatcher<typeof loadUserProfileAction>;

}

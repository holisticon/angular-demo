import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { AddressComponent } from './address/address.component';
import { PaymentOptionComponent } from './payment-option/payment-option.component';
import { LoadUserProfileAction } from './state/user-profile.actions';
import { UserProfileEffects } from './state/user-profile.effects';
import { UserProfileState, initialState as userProfileInitialState, userProfileReducer } from './state/user-profile.reducer';
import { UserProfileService } from './user-profile.service';
import { UserProfileCommonStore } from './state/user-profile-common-store.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('userProfile', userProfileReducer, { initialState: userProfileInitialState }),
        EffectsModule.forFeature([UserProfileEffects])
    ],
    providers: [
        UserProfileEffects,
        UserProfileService
    ],
    declarations: [
        AddressComponent,
        PaymentOptionComponent
    ],
    exports: [
        AddressComponent,
        PaymentOptionComponent
    ]
})
export class UserProfileCommonModule {
    constructor(
        userProfileCommonStore: UserProfileCommonStore
    ) {
        userProfileCommonStore.loadUserProfile();
    }
}

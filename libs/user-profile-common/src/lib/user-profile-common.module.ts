import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddressComponent } from './address/address.component';
import { PaymentOptionComponent } from './payment-option/payment-option.component';
import { UserProfileCommonStore } from './state/user-profile-common-store.service';
import { UserProfileEffects } from './state/user-profile.effects';
import { initialState as userProfileInitialState, userProfileReducer, USER_PROFILE_FEATURE_KEY } from './state/user-profile.reducer';
import { UserProfileService } from './user-profile.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature(USER_PROFILE_FEATURE_KEY, userProfileReducer, { initialState: userProfileInitialState }),
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

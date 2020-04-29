import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserProfileStore } from './state/user-profile-store.service';
import { UserProfileEffects } from './state/user-profile.effects';
import { initialState as userProfileInitialState, userProfileReducer, USER_PROFILE_FEATURE_KEY } from './state/user-profile.reducer';
import { UserProfileService } from './state/user-profile.service';
import { AddressComponent } from './ui/address/address.component';
import { PaymentOptionComponent } from './ui/payment-option/payment-option.component';

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
        PaymentOptionComponent,
    ],
    exports: [
        AddressComponent,
        PaymentOptionComponent
    ]
})
export class UserProfileModule {
    constructor(
        userProfileStore: UserProfileStore
    ) {
        // TODO load via routing effect
        setTimeout(() => userProfileStore.loadUserProfile());
    }
}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserProfileStore } from './user-profile-store.service';
import { UserProfileEffects } from './user-profile.effects';
import { initialState, userProfileReducer, USER_PROFILE_FEATURE_KEY } from './user-profile.reducer';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature(USER_PROFILE_FEATURE_KEY, userProfileReducer, { initialState }),
        EffectsModule.forFeature([UserProfileEffects])
    ],
    providers: [
        UserProfileEffects
    ]
})
export class UserProfileStateModule {
    constructor(
        userProfileStore: UserProfileStore
    ) {
        userProfileStore.loadUserProfile();
    }
}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { LoadUserProfileAction } from './state/user-profile.actions';
import { UserProfileEffects } from './state/user-profile.effects';
import { UserProfileState, initialState as userProfileInitialState, userProfileReducer } from './state/user-profile.reducer';
import { UserProfileService } from './user-profile.service';

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
    declarations: []
})
export class UserProfileCommonModule {
    constructor(
        store: Store<UserProfileState>
    ) {
        store.dispatch(new LoadUserProfileAction());
    }
}

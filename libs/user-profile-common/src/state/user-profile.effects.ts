import { Injectable } from '@angular/core';
import { UserProfileService } from '@luchsamapparat/user-profile-common/src/user-profile.service';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { LoadUserProfileAction, UserProfileActionTypes, UserProfileLoadedAction } from './user-profile.actions';
import { UserProfileState } from './user-profile.reducer';

@Injectable()
export class UserProfileEffects {

    @Effect()
    loadUserProfile$ = this.dataPersistence.fetch<LoadUserProfileAction>(
        UserProfileActionTypes.LoadUserProfile,
        {
            run: (action, state) => {
                return this.userProfileService
                    .loadUserProfile()
                    .map(userProfile => new UserProfileLoadedAction(userProfile));
            },

            onError: (action, error) => {
                console.error('Error', error);
            }
        }
    );

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<UserProfileState>,
        private userProfileService: UserProfileService
    ) {}
}

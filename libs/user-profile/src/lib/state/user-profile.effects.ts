import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { loadUserProfileAction, userProfileLoadedAction } from './user-profile.actions';
import { UserProfileService } from './user-profile.service';

@Injectable()
export class UserProfileEffects {

    loadUserProfile$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadUserProfileAction),
            switchMap(() => this.userProfileService
                .loadUserProfile()
                .pipe(map(userProfile => userProfileLoadedAction({ userProfile }))))
        )
    )

    constructor(
        private actions$: Actions,
        private userProfileService: UserProfileService
    ) { }
}

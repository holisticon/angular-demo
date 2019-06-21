import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { UserProfileService } from '../user-profile.service';
import { loadUserProfileAction, userProfileLoadedAction } from './user-profile.actions';

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
    ) {}
}

import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { userProfile } from '@holisticon/user-profile/test';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { hot } from 'jest-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { loadUserProfileAction, userProfileLoadedAction } from './user-profile.actions';
import { UserProfileEffects } from './user-profile.effects';
import { UserProfileService } from './user-profile.service';

describe('UserProfileEffects', () => {
    let actions$: Observable<Action>;
    let effects$: UserProfileEffects;
    let userProfileService: UserProfileService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                UserProfileEffects,
                UserProfileService,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.inject(UserProfileEffects);
        userProfileService = TestBed.inject(UserProfileService);
    });

    describe('loadUserProfile', () => {
        it('dispatches a UserProfileLoadedAction with the user profile returned by the service', () => {
            jest.spyOn(userProfileService, 'loadUserProfile').mockReturnValue(observableOf(userProfile));

            actions$ = hot('-a-|', { a: loadUserProfileAction() });

            expect(effects$.loadUserProfile$).toBeObservable(
                hot('-a-|', { a: userProfileLoadedAction({ userProfile }) })
            );
        });
    });
});

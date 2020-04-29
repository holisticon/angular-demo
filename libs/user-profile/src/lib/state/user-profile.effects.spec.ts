import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { userProfile } from '@ngxp/user-profile/test';
import { hot } from 'jest-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { loadUserProfileAction, userProfileLoadedAction } from './user-profile.actions';
import { UserProfileEffects } from './user-profile.effects';
import { UserProfileService } from './user-profile.service';

describe('UserProfileEffects', () => {
    let actions$: Observable<any>;
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

        effects$ = TestBed.get(UserProfileEffects);
        userProfileService = TestBed.get(UserProfileService);
    });

    describe('loadUserProfile', () => {
        it('dispatches a UserProfileLoadedAction with the user profile returned by the service', () => {
            spyOn(userProfileService, 'loadUserProfile').and.returnValue(observableOf(userProfile));

            actions$ = hot('-a-|', { a: loadUserProfileAction() });

            expect(effects$.loadUserProfile$).toBeObservable(
                hot('-a-|', { a: userProfileLoadedAction({ userProfile }) })
            );
        });
    });
});

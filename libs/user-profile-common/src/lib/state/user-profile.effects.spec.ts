import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { userProfile } from '@ngxp/user-profile-common/test';
import { DataPersistence } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable, of as observableOf } from 'rxjs';
import { UserProfileService } from '../user-profile.service';
import { LoadUserProfileAction, UserProfileLoadedAction } from './user-profile.actions';
import { UserProfileEffects } from './user-profile.effects';

describe('UserProfileEffects', () => {
    let actions$: Observable<any>;
    let effects$: UserProfileEffects;
    let userProfileService: UserProfileService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                StoreModule.forRoot({})
            ],
            providers: [
                UserProfileEffects,
                UserProfileService,
                DataPersistence,
                provideMockActions(() => actions$)
            ]
        });

        effects$ = TestBed.get(UserProfileEffects);
        userProfileService = TestBed.get(UserProfileService);
    });

    describe('loadUserProfile', () => {
        it('dispatches a UserProfileLoadedAction with the user profile returned by the service', () => {
            spyOn(userProfileService, 'loadUserProfile').and.returnValue(observableOf(userProfile));

            actions$ = hot('-a-|', { a: new LoadUserProfileAction() });

            expect(effects$.loadUserProfile$).toBeObservable(
                hot('-a-|', { a: new UserProfileLoadedAction(userProfile) })
            );
        });
    });
});

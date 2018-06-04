import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { addId } from '@luchsamapparat/common';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from 'jest-marbles';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { UserProfile } from '../user-profile.model';
import { UserProfileService } from '../user-profile.service';
import { LoadUserProfileAction, UserProfileLoadedAction } from './user-profile.actions';
import { UserProfileEffects } from './user-profile.effects';

describe('UserProfileEffects', () => {
    let actions$: Observable<any>;
    let effects$: UserProfileEffects;
    let userProfileService: UserProfileService;

    const userProfile: UserProfile = addId({
        addresses: [],
        paymentOptions: []
    }, 'id');

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
            jest.spyOn(userProfileService, 'loadUserProfile').mockImplementation(() => Observable.of(userProfile));

            actions$ = hot('-a-|', { a: new LoadUserProfileAction() });

            expect(effects$.loadUserProfile$).toBeObservable(
                hot('-a-|', { a: new UserProfileLoadedAction(userProfile) })
            );
        });
    });
});
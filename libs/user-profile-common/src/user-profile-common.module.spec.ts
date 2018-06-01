import { TestBed, async } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { LoadUserProfileAction } from './state/user-profile.actions';
import { UserProfileState } from './state/user-profile.reducer';
import { UserProfileCommonModule } from './user-profile-common.module';

describe('UserProfileCommonModule', () => {
    let store: Store<UserProfileState>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({})
            ]
        });

        store = TestBed.get(Store);
    }));

    it('dispatches a LoadUserProfileAction on initialization', async(() => {
        const storeDispatchSpy = jest.spyOn(store, 'dispatch');

        const userProfileCommonModule = new UserProfileCommonModule(store);

        const dispatchedAction: LoadUserProfileAction = storeDispatchSpy.mock.calls[0][0];
        expect(dispatchedAction).toBeInstanceOf(LoadUserProfileAction);
    }));
})

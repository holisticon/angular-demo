import { TestBed, async } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { LoadUserProfileAction } from './state/user-profile.actions';
import { UserProfileState } from './state/user-profile.reducer';
import { UserProfileCommonModule } from './user-profile-common.module';
import { createStoreServiceMock } from '@ngx-patterns/store-service/testing';
import { UserProfileCommonStore } from './state/user-profile-common-store.service';

describe('UserProfileCommonModule', () => {
    it('dispatches a LoadUserProfileAction on initialization', async(() => {
        const userProfileCommonStore = createStoreServiceMock(UserProfileCommonStore);
        const loadUserProfileSpy = jest.spyOn(userProfileCommonStore, 'loadUserProfile');

        const ordersModule = new UserProfileCommonModule(userProfileCommonStore);

        expect(loadUserProfileSpy).toHaveBeenCalled();
    }));
})

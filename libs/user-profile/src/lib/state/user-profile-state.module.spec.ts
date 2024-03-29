import { fakeAsync, tick } from '@angular/core/testing';
import { createStoreServiceMock } from '@ngxp/store-service/testing';
import { UserProfileStateModule } from './user-profile-state.module';
import { UserProfileStore } from './user-profile-store.service';

describe('UserProfileStateModule', () => {
    it('dispatches a LoadUserProfileAction on initialization', fakeAsync(() => {
        const userProfileStore = createStoreServiceMock(UserProfileStore);
        const loadUserProfileSpy = jest.spyOn(userProfileStore, 'loadUserProfile');

        new UserProfileStateModule(userProfileStore);

        tick();

        expect(loadUserProfileSpy).toHaveBeenCalled();
    }));
})

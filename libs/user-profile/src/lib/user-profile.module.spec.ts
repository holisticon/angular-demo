import { fakeAsync, tick } from '@angular/core/testing';
import { createStoreServiceMock } from '@ngxp/store-service/testing';
import { UserProfileStore } from './state/user-profile-store.service';
import { UserProfileModule } from './user-profile.module';

describe('UserProfileModule', () => {
    it('dispatches a LoadUserProfileAction on initialization', fakeAsync(() => {
        const userProfileStore = createStoreServiceMock(UserProfileStore);
        const loadUserProfileSpy = spyOn(userProfileStore, 'loadUserProfile');

        // tslint:disable-next-line: no-unused-expression
        new UserProfileModule(userProfileStore);

        tick();

        expect(loadUserProfileSpy).toHaveBeenCalled();
    }));
})

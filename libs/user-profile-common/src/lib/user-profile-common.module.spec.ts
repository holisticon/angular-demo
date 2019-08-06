import { fakeAsync, tick } from '@angular/core/testing';
import { createStoreServiceMock } from '@ngxp/store-service/testing';
import { UserProfileCommonStore } from './state/user-profile-common-store.service';
import { UserProfileCommonModule } from './user-profile-common.module';

describe('UserProfileCommonModule', () => {
    it('dispatches a LoadUserProfileAction on initialization', fakeAsync(() => {
        const userProfileCommonStore = createStoreServiceMock(UserProfileCommonStore);
        const loadUserProfileSpy = spyOn(userProfileCommonStore, 'loadUserProfile');

        // tslint:disable-next-line: no-unused-expression
        new UserProfileCommonModule(userProfileCommonStore);

        tick();

        expect(loadUserProfileSpy).toHaveBeenCalled();
    }));
})

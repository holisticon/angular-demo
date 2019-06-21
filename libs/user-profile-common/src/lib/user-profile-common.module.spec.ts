import { async } from '@angular/core/testing';
import { createStoreServiceMock } from '@ngxp/store-service/testing';
import { UserProfileCommonStore } from './state/user-profile-common-store.service';
import { UserProfileCommonModule } from './user-profile-common.module';

describe('UserProfileCommonModule', () => {
    it('dispatches a LoadUserProfileAction on initialization', async(() => {
        const userProfileCommonStore = createStoreServiceMock(UserProfileCommonStore);
        const loadUserProfileSpy = spyOn(userProfileCommonStore, 'loadUserProfile');

        const ordersModule = new UserProfileCommonModule(userProfileCommonStore);

        expect(loadUserProfileSpy).toHaveBeenCalled();
    }));
})

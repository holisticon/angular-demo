import { UserProfileAppState } from './user-profile.reducer';
import { getUserProfile } from './user-profile.selectors';


describe('userProfileSelectors', () => {

    const state: UserProfileAppState = {
        userProfile: {
            userProfile: {
                addresses: [],
                paymentOptions: []
            }
        }
    };

    describe('getUserProfile', () => {
        it('returns the search results', () => {
            const expectedValue = state.userProfile.userProfile;

            expect(getUserProfile()(state)).toBe(expectedValue);
        });
    });

});

import { UserProfileAppState } from './user-profile.reducer';
import { getAddresses, getPaymentOptions, getUserProfile } from './user-profile.selectors';


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

    describe('getAddresses', () => {
        it('returns the addresses of the user profile', () => {
            const expectedValue = state.userProfile.userProfile.addresses;

            expect(getAddresses()(state)).toBe(expectedValue);
        });
    });

    describe('getPaymentOptions', () => {
        it('returns the payment options of the user profile', () => {
            const expectedValue = state.userProfile.userProfile.paymentOptions;

            expect(getPaymentOptions()(state)).toBe(expectedValue);
        });
    });

});

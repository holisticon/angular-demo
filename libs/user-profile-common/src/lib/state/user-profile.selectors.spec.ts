// tslint:disable: no-non-null-assertion

import { userProfile } from '@ngxp/user-profile-common/test';
import { UserProfilePartialState } from './user-profile.reducer';
import { getAddresses, getPaymentOptions, getUserProfile } from './user-profile.selectors';

describe('userProfileSelectors', () => {
    const state: UserProfilePartialState = {
        userProfile: {
            userProfile
        }
    };

    const stateWithoutUserProfile = {
        ...state,
        userProfile: {
            ...state.userProfile,
            userProfile: null
        }
    };

    describe('getUserProfile', () => {
        it('returns the search results', () => {
            const expectedValue = state.userProfile.userProfile;

            expect(getUserProfile(state)).toBe(expectedValue);
        });
    });

    describe('getAddresses', () => {
        it('returns the addresses of the user profile', () => {
            const expectedValue = state.userProfile.userProfile!.addresses;

            expect(getAddresses(state)).toBe(expectedValue);
        });

        it('returns the same empty array when the user profile has not been loaded yet', () => {
            const returnedValue = getAddresses(stateWithoutUserProfile);

            expect(returnedValue).toEqual([]);
            expect(getAddresses(stateWithoutUserProfile)).toBe(returnedValue);
        });
    });

    describe('getPaymentOptions', () => {
        it('returns the payment options of the user profile', () => {
            const expectedValue = state.userProfile.userProfile!.paymentOptions;

            expect(getPaymentOptions(state)).toBe(expectedValue);
        });

        it('returns the same empty array when the user profile has not been loaded yet', () => {
            const returnedValue = getPaymentOptions(stateWithoutUserProfile);

            expect(returnedValue).toEqual([]);
            expect(getPaymentOptions(stateWithoutUserProfile)).toBe(returnedValue);
        });
    });

});

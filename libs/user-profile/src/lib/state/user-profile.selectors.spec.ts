// tslint:disable: no-non-null-assertion

import { userProfile } from '@holisticon/user-profile/test';
import { UserProfileAppState } from './user-profile.reducer';
import { selectAddresses, selectPaymentOptions, selectUserProfile } from './user-profile.selectors';

describe('userProfileSelectors', () => {
    const state: UserProfileAppState = {
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

    describe('selectUserProfile', () => {
        it('returns the search results', () => {
            const expectedValue = state.userProfile.userProfile;

            expect(selectUserProfile(state)).toBe(expectedValue);
        });
    });

    describe('selectAddresses', () => {
        it('returns the addresses of the user profile', () => {
            const expectedValue = state.userProfile.userProfile!.addresses;

            expect(selectAddresses(state)).toBe(expectedValue);
        });

        it('returns the same empty array when the user profile has not been loaded yet', () => {
            const returnedValue = selectAddresses(stateWithoutUserProfile);

            expect(returnedValue).toEqual([]);
            expect(selectAddresses(stateWithoutUserProfile)).toBe(returnedValue);
        });
    });

    describe('selectPaymentOptions', () => {
        it('returns the payment options of the user profile', () => {
            const expectedValue = state.userProfile.userProfile!.paymentOptions;

            expect(selectPaymentOptions(state)).toBe(expectedValue);
        });

        it('returns the same empty array when the user profile has not been loaded yet', () => {
            const returnedValue = selectPaymentOptions(stateWithoutUserProfile);

            expect(returnedValue).toEqual([]);
            expect(selectPaymentOptions(stateWithoutUserProfile)).toBe(returnedValue);
        });
    });

});

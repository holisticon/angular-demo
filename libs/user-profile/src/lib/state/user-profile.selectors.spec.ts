// tslint:disable: no-non-null-assertion

import { userProfile } from '@ngxp/user-profile/test';
import { UserProfileAppState } from './user-profile.reducer';
import { selectAddresses, selectPaymentOptions } from './user-profile.selectors';

describe('userProfileSelectors', () => {
    const state: UserProfileAppState = {
        userProfile: {
            addresses: userProfile.addresses,
            paymentOptions: userProfile.paymentOptions
        }
    };

    describe('selectAddresses', () => {
        it('returns the addresses of the user profile', () => {
            const expectedValue = state.userProfile.addresses;

            expect(selectAddresses(state)).toBe(expectedValue);
        });
    });

    describe('selectPaymentOptions', () => {
        it('returns the payment options of the user profile', () => {
            const expectedValue = state.userProfile.paymentOptions;

            expect(selectPaymentOptions(state)).toBe(expectedValue);
        });
    });

});

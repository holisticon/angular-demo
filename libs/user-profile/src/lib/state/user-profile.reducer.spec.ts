import { Action } from '@ngrx/store';
import { addressBuilder, paymentOptionBuilder, userProfile } from '@ngxp/user-profile/test';
import { addressesUpdatedAction, paymentOptionsUpdatedAction, userProfileLoadedAction } from './user-profile.actions';
import { initialState, userProfileReducer } from './user-profile.reducer';

describe('userProfileReducer', () => {
    it('returns the same state if the action is not applicable', () => {
        const action: Action = { type: 'some-action' };
        const state = userProfileReducer(initialState, <any>action);
        expect(state).toBe(initialState);
    });

    describe('userProfileLoaded', () => {
        it('sets the user profile', () => {
            const action = userProfileLoadedAction({ userProfile });

            const updatedState = userProfileReducer(initialState, action);

            expect(updatedState.addresses).toBe(userProfile.addresses);
            expect(updatedState.paymentOptions).toBe(userProfile.paymentOptions);
        });
    });

    describe('addressesUpdatedAction', () => {
        it('replaces the addresses', () => {
            const addresses = addressBuilder().buildMany(5);
            const action = addressesUpdatedAction({ addresses });

            const updatedState = userProfileReducer(initialState, action);

            expect(updatedState.addresses).toBe(addresses);
        });
    });

    describe('paymentOptionsUpdatedAction', () => {
        it('replaces the payment options', () => {
            const paymentOptions = paymentOptionBuilder().buildMany(5);
            const action = paymentOptionsUpdatedAction({ paymentOptions });

            const updatedState = userProfileReducer(initialState, action);

            expect(updatedState.paymentOptions).toBe(paymentOptions);
        });
    });
});

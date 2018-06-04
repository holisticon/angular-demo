import { Action } from '@ngrx/store';
import { UserProfile } from '../user-profile.model';
import { UserProfileLoadedAction } from './user-profile.actions';
import { initialState, userProfileReducer } from './user-profile.reducer';

describe('userProfileReducer', () => {
    const userProfile: UserProfile = {
        addresses: [],
        paymentOptions: []
    };

    it('returns the same state if the action is not applicable', () => {
        const action: Action = { type: 'some-action' };
        const state = userProfileReducer(initialState, <any> action);
        expect(state).toBe(initialState);
    });

    describe('UserProfileLoaded', () => {
        it('sets the user profile', () => {
            const action = new UserProfileLoadedAction(userProfile);

            const updatedState = userProfileReducer(initialState, action);

            expect(updatedState.userProfile).toBe(userProfile);
        });
    });
});

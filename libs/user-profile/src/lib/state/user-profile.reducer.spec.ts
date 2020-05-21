import { Action } from '@ngrx/store';
import { userProfile } from '@ngxp/user-profile/test';
import { userProfileLoadedAction } from './user-profile.actions';
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

            expect(updatedState.userProfile).toBe(userProfile);
        });
    });
});

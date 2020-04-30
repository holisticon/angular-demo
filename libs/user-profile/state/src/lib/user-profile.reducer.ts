import { createReducer, on } from '@ngrx/store';
import { ReducerArgs } from '@ngxp/common';
import { UserProfile } from '@ngxp/user-profile/domain';
import { userProfileLoadedAction } from './user-profile.actions';

export const USER_PROFILE_FEATURE_KEY = 'userProfile';

export interface UserProfileState {
    userProfile: UserProfile | null;
}

export interface UserProfileAppState {
    readonly [USER_PROFILE_FEATURE_KEY]: UserProfileState;
}

export const initialState: UserProfileState = {
    userProfile: null
};

export const reducer = createReducer(initialState,
    on(userProfileLoadedAction, (state, { userProfile }) => ({
        ...state,
        userProfile
    }))
);

// neccessary for AOT support
// see https://ngrx.io/guide/store/reducers#creating-the-reducer-function
export function userProfileReducer(...args: ReducerArgs<UserProfileState>) { return reducer(...args); }

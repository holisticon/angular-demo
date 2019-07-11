import { createReducer, on } from '@ngrx/store';
import { UserProfile } from '../user-profile.model';
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

export const userProfileReducer = createReducer(initialState,
    on(userProfileLoadedAction, (state, { userProfile }) => ({
        ...state,
        userProfile
    }))
);

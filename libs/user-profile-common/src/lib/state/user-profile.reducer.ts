import { UserProfile } from '../user-profile.model';
import { UserProfileAction, UserProfileActionTypes } from './user-profile.actions';

export const USER_PROFILE_FEATURE_KEY = 'userProfile';

export interface UserProfileState {
    userProfile: UserProfile | null;
}

export interface UserProfilePartialState {
    readonly [USER_PROFILE_FEATURE_KEY]: UserProfileState;
}

export const initialState: UserProfileState = {
    userProfile: null
};

export function userProfileReducer(state = initialState, action: UserProfileAction): UserProfileState {
    switch (action.type) {

        case UserProfileActionTypes.UserProfileLoaded: {
            return {
                ...state,
                userProfile: action.payload
            };
        }

        default:
            return state;
    }
}

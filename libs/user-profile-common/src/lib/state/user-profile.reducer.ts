import { UserProfile } from '../user-profile.model';
import { UserProfileActionTypes, UserProfileActions } from './user-profile.actions';

export interface UserProfileState {
    userProfile: UserProfile | null;
}

export interface UserProfileAppState {
    readonly userProfile: UserProfileState;
}

export const initialState: UserProfileState = {
    userProfile: null
};

export function userProfileReducer(state = initialState, action: UserProfileActions): UserProfileState {
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

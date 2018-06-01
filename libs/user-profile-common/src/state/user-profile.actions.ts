import { UserProfile } from '@luchsamapparat/user-profile-common/src/user-profile.model';
import { Action } from '@ngrx/store';

export enum UserProfileActionTypes {
    LoadUserProfile = '[UserProfile] load user profile',
    UserProfileLoaded = '[UserProfile] user profile Loaded'
}

export class LoadUserProfileAction implements Action {
    readonly type = UserProfileActionTypes.LoadUserProfile;
}

export class UserProfileLoadedAction implements Action {
    readonly type = UserProfileActionTypes.UserProfileLoaded;

    constructor(
        public payload: UserProfile
    ) {}
}

export type UserProfileActions = LoadUserProfileAction | UserProfileLoadedAction;

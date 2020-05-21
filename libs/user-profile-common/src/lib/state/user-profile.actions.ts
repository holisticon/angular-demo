import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../user-profile.model';

export const loadUserProfileAction = createAction(
    '[UserProfile] load user profile'
);

export const userProfileLoadedAction = createAction(
    '[UserProfile] user profile Loaded',
    props<{ userProfile: UserProfile }>()
);
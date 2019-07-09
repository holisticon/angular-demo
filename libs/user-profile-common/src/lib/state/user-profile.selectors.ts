import { createFeatureSelector, createSelector } from '@ngrx/store';
import { isNull } from 'lodash-es';
import { UserProfileState, USER_PROFILE_FEATURE_KEY } from './user-profile.reducer';

const selectUserProfileState = createFeatureSelector<UserProfileState>(USER_PROFILE_FEATURE_KEY);

export const selectUserProfile = createSelector(
    selectUserProfileState,
    state => state.userProfile
);

export const selectAddresses = createSelector(
    selectUserProfile,
    userProfile => isNull(userProfile) ? [] : userProfile.addresses
);

export const selectPaymentOptions = createSelector(
    selectUserProfile,
    userProfile => isNull(userProfile) ? [] : userProfile.paymentOptions
);

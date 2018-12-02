import { createFeatureSelector, createSelector } from '@ngrx/store';
import { isNull } from "lodash-es";
import { UserProfileState, USER_PROFILE_FEATURE_KEY } from "./user-profile.reducer";

const getUserProfileState = createFeatureSelector<UserProfileState>(USER_PROFILE_FEATURE_KEY);

export const getUserProfile = createSelector(
    getUserProfileState,
    state => state.userProfile
);

export const getAddresses = createSelector(
    getUserProfile,
    userProfile => isNull(userProfile) ? [] : userProfile.addresses
);

export const getPaymentOptions = createSelector(
    getUserProfile,
    userProfile => isNull(userProfile) ? [] : userProfile.paymentOptions
);

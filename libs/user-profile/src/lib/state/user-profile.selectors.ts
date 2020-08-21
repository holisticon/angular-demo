import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProfileState, USER_PROFILE_FEATURE_KEY } from './user-profile.reducer';

const selectUserProfileState = createFeatureSelector<UserProfileState>(USER_PROFILE_FEATURE_KEY);

export const selectAddresses = createSelector(
    selectUserProfileState,
    state => state.addresses
);

export const selectPaymentOptions = createSelector(
    selectUserProfileState,
    state => state.paymentOptions
);

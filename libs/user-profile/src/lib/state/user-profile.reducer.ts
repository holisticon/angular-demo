import { createReducer, on } from '@ngrx/store';
import { ReducerArgs } from '@ngxp/common';
import { Address, PaymentOption } from '../domain';
import { userProfileLoadedAction } from './user-profile.actions';

export const USER_PROFILE_FEATURE_KEY = 'userProfile';

export interface UserProfileState {
    addresses: Address[];
    paymentOptions: PaymentOption[]
}

export interface UserProfileAppState {
    readonly [USER_PROFILE_FEATURE_KEY]: UserProfileState;
}

export const initialState: UserProfileState = {
    addresses: [],
    paymentOptions: []
};

export const reducer = createReducer(initialState,
    on(userProfileLoadedAction, (state, { userProfile }) => ({
        ...state,
        addresses: userProfile.addresses,
        paymentOptions: userProfile.paymentOptions,
    }))
);

// neccessary for AOT support
// see https://ngrx.io/guide/store/reducers#creating-the-reducer-function
export function userProfileReducer(...args: ReducerArgs<UserProfileState>) { return reducer(...args); }

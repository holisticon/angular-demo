import { isNull } from "lodash-es";
import { UserProfileAppState } from "./user-profile.reducer";

const emptyArray = [];

export function getUserProfile() {
    return ((state: UserProfileAppState) => state.userProfile.userProfile);
}

export function getAddresses() {
    return ((state: UserProfileAppState) => {
        const userProfile = getUserProfile()(state);
        return isNull(userProfile) ? emptyArray : userProfile.addresses;
    });
}

export function getPaymentOptions() {
    return ((state: UserProfileAppState) => {
        const userProfile = getUserProfile()(state);
        return isNull(userProfile) ? emptyArray : userProfile.paymentOptions;
    });
}

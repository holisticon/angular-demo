import { isNull } from "lodash-es";
import { UserProfileAppState } from "./user-profile.reducer";

export function getUserProfile() {
    return ((state: UserProfileAppState) => state.userProfile.userProfile);
}

export function getAddresses() {
    return ((state: UserProfileAppState) => {
        const userProfile = getUserProfile()(state);
        return isNull(userProfile) ? [] : userProfile.addresses;
    });
}

export function getPaymentOptions() {
    return ((state: UserProfileAppState) => {
        const userProfile = getUserProfile()(state);
        return isNull(userProfile) ? [] : userProfile.paymentOptions;
    });
}

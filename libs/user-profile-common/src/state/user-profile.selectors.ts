import { UserProfileAppState } from "./user-profile.reducer";

export function getUserProfile() {
    return ((state: UserProfileAppState) => state.userProfile.userProfile);
}

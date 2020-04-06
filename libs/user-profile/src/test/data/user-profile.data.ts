import { Blueprint } from '@ngxp/builder';
import { Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import { UserProfile } from '../../lib/user-profile.model';
import { addresses } from './address.data';
import { paymentOptions } from './payment-option.data';

const userProfileBlueprint: Blueprint<UserProfile> = {
    addresses: () => addresses,
    paymentOptions: () => paymentOptions
};
export const userProfileBuilder = createResourceBlueprintBuilder(userProfileBlueprint);

export const userProfile: Resource<UserProfile> = userProfileBuilder().freeze().build();

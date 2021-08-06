import { ResourcePayload } from '@holisticon/resource';
import { createResourceBlueprintBuilder } from '@holisticon/resource/test';
import { Blueprint } from '@ngxp/builder';
import { UserProfile } from '../../lib/domain/user-profile';
import { addresses } from './address.data';
import { paymentOptions } from './payment-option.data';

const userProfileBlueprint: Blueprint<ResourcePayload<UserProfile>> = {
    addresses: () => addresses,
    paymentOptions: () => paymentOptions
};
export const userProfileBuilder = createResourceBlueprintBuilder(userProfileBlueprint);

export const userProfile: UserProfile = userProfileBuilder().freeze().build();

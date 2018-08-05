import { Blueprint, createBlueprintBuilder } from '@ngx-patterns/builder';
import * as faker from 'faker';
import { UserProfile } from '@luchsamapparat/user-profile-common';
import { Resource } from '@luchsamapparat/common';
import { addresses } from './address.data';
import { paymentOptions } from './payment-option.data';
import { createResourceBlueprintBuilder } from '@luchsamapparat/common/test';

const userProfileBlueprint: Blueprint<UserProfile> = {
    addresses: () => addresses,
    paymentOptions: () => paymentOptions
};
export const userProfileBuilder = createResourceBlueprintBuilder(userProfileBlueprint);

export const userProfile: Resource<UserProfile> = userProfileBuilder().freeze().build();

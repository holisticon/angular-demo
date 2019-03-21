import { Blueprint, createBlueprintBuilder } from '@ngxp/builder';
import * as faker from 'faker';
import { UserProfile } from '@ngxp/user-profile-common';
import { Resource } from '@ngxp/common';
import { addresses } from './address.data';
import { paymentOptions } from './payment-option.data';
import { createResourceBlueprintBuilder } from '@ngxp/common/test';

const userProfileBlueprint: Blueprint<UserProfile> = {
    addresses: () => addresses,
    paymentOptions: () => paymentOptions
};
export const userProfileBuilder = createResourceBlueprintBuilder(userProfileBlueprint);

export const userProfile: Resource<UserProfile> = userProfileBuilder().freeze().build();

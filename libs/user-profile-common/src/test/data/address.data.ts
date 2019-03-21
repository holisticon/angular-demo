import { Blueprint, createBlueprintBuilder } from '@ngxp/builder';
import { Address } from '@ngxp/user-profile-common';
import * as faker from 'faker';
import { Resource } from '@ngxp/common';
import { createResourceBlueprintBuilder } from '@ngxp/common/test';

const addressBlueprint: Blueprint<Address> = {
    name: () => faker.name.findName(),
    street: () => faker.address.streetAddress(),
    zipCode: () => faker.address.zipCode(),
    city: () => faker.address.city(),
    country: () => faker.address.country()
};
export const addressBuilder = createResourceBlueprintBuilder(addressBlueprint);

export const address: Resource<Address> = addressBuilder().freeze().build();
export const addresses: Resource<Address>[] = addressBuilder().freeze().buildMany(5);

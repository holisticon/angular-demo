import { Blueprint } from '@ngxp/builder';
import { Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import { Address } from '@ngxp/user-profile-common';
import * as faker from 'faker';

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

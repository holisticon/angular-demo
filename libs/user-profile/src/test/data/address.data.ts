import { ResourcePayload } from '@holisticon/resource';
import { createResourceBlueprintBuilder } from '@holisticon/resource/test';
import { Blueprint } from '@ngxp/builder';
import { address as randomAddress, name } from 'faker';
import { Address } from '../../lib/domain/user-profile';

const addressBlueprint: Blueprint<ResourcePayload<Address>> = {
    name: () => name.findName(),
    street: () => randomAddress.streetAddress(),
    zipCode: () => randomAddress.zipCode(),
    city: () => randomAddress.city(),
    country: () => randomAddress.country()
};
export const addressBuilder = createResourceBlueprintBuilder(addressBlueprint);

export const address: Address = addressBuilder().freeze().build();
export const addresses: Address[] = addressBuilder().freeze().buildMany(5);

import { Blueprint } from '@ngxp/builder';
import { Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import { address as randomAddress, name } from 'faker';
import { Address } from '../../lib/domain/user-profile';

const addressBlueprint: Blueprint<Address> = {
    name: () => name.findName(),
    street: () => randomAddress.streetAddress(),
    zipCode: () => randomAddress.zipCode(),
    city: () => randomAddress.city(),
    country: () => randomAddress.country()
};
export const addressBuilder = createResourceBlueprintBuilder(addressBlueprint);

export const address: Resource<Address> = addressBuilder().freeze().build();
export const addresses: Resource<Address>[] = addressBuilder().freeze().buildMany(5);

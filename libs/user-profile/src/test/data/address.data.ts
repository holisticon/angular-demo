import { Blueprint, createBlueprintBuilder } from '@ngxp/builder';
import { Resource } from '@ngxp/resource';
import { createResourceBlueprintBuilder } from '@ngxp/resource/test';
import { address as randomAddress, name } from 'faker';
import { Address } from '../../lib/domain';
import { AddressUpdate, NewAddress } from '../../lib/domain/address';

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

const newAddressBuilder = createBlueprintBuilder(addressBlueprint);
export const newAddress: NewAddress = newAddressBuilder().freeze().build();

const addressUpdateBuilder = createBlueprintBuilder(addressBlueprint);
export const addressUpdate: AddressUpdate = addressUpdateBuilder().freeze().build();

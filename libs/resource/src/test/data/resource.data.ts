import { Blueprint } from '@ngxp/builder';
import { Resource } from '@ngxp/resource';
import * as faker from 'faker';
import { createResourceBlueprintBuilder } from '../resource-builder';

export interface SomeType {
    value: string;
}

const resourceBlueprint: Blueprint<SomeType> = {
    value: () => faker.lorem.word(),
};
export const resourceBuilder = createResourceBlueprintBuilder(resourceBlueprint);

export const resource: Resource<SomeType> = resourceBuilder().freeze().build();
export const resources: Resource<SomeType>[] = resourceBuilder().freeze().buildMany(20);

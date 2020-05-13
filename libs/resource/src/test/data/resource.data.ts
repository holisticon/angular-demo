import { Blueprint } from '@ngxp/builder';
import { Resource } from '@ngxp/resource';
import { internet, lorem, random } from 'faker';
import { ResourceUri } from '../../lib/resource.model';
import { createResourceBlueprintBuilder } from '../resource-builder';

export interface SomeType {
    value: string;
}

const resourceBlueprint: Blueprint<SomeType> = {
    value: () => lorem.word(),
};
export const resourceBuilder = createResourceBlueprintBuilder(resourceBlueprint);

export function buildResourceUri(): ResourceUri {
    return `${internet.url()}/${random.uuid()}`;
}

export const resourceUri: ResourceUri = buildResourceUri();
export const resource: Resource<SomeType> = resourceBuilder().freeze().build();
export const resources: Resource<SomeType>[] = resourceBuilder().freeze().buildMany(20);

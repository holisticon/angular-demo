import { Blueprint, BlueprintFactory, createBlueprintBuilder } from '@ngxp/builder';
import { Resource } from '@ngxp/resource';
import * as faker from 'faker';
import { isFunction } from 'lodash-es';

export function createResourceBlueprintBuilder<T>(blueprint: Blueprint<T> | BlueprintFactory<T>) {
    return createBlueprintBuilder(toResourceBlueprint(blueprint));
}

function toResourceBlueprint<T>(blueprint: Blueprint<T> | BlueprintFactory<T>): Blueprint<Resource<T>> | BlueprintFactory<Resource<T>> {
    const blueprintFn = isFunction(blueprint) ? blueprint : () => blueprint;

    return () => ({
        ...<any> blueprintFn(),
        _id: () => faker.internet.url()
    });
}

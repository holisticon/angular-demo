import { Resource } from '@holisticon/resource';
import { Blueprint, BlueprintFactory, createBlueprintBuilder } from '@ngxp/builder';
import { isFunction } from 'lodash-es';
import { buildResourceUri } from './data/resource.data';

export function createResourceBlueprintBuilder<T>(blueprint: Blueprint<T> | BlueprintFactory<T>) {
    return createBlueprintBuilder(toResourceBlueprint(blueprint));
}

function toResourceBlueprint<T>(blueprint: Blueprint<T> | BlueprintFactory<T>): Blueprint<Resource<T>> | BlueprintFactory<Resource<T>> {
    const blueprintFn = isFunction(blueprint) ? blueprint : () => blueprint;

    return () => ({
        ...<any>blueprintFn(),
        _id: () => buildResourceUri()
    });
}

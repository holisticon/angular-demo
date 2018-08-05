import { Blueprint, BlueprintFactory, BlueprintBuilder, createBlueprintBuilder } from "@ngx-patterns/builder";
import { isFunction } from "lodash-es";
import * as faker from 'faker';
import { Resource } from "@luchsamapparat/common";

export function createResourceBlueprintBuilder<T>(blueprint: Blueprint<T> | BlueprintFactory<T>) {
    return createBlueprintBuilder(toResourceBlueprint(blueprint));
}

function toResourceBlueprint<T>(blueprint: Blueprint<T> | BlueprintFactory<T>): Blueprint<Resource<T>> | BlueprintFactory<Resource<T>> {
    const blueprintFn = isFunction(blueprint) ? blueprint : () => blueprint;

    return () => ({
        ...<any> blueprintFn(),
        id: () => faker.internet.url()
    });
}

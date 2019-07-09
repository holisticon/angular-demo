import { Resource, ResourceId } from '@ngxp/common';

export function addId<T extends object>(obj: T, id: ResourceId): Resource<T> {
    return {
        _id: id,
        ...(<any> obj)
    };
}

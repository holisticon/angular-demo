import { Resource, ResourceId } from '@ngxp/resource';

export function addId<T extends object>(obj: T, id: ResourceId): Resource<T> {
    return {
        _id: id,
        ...(<any> obj)
    };
}

import { ResourceId, Resource } from "@luchsamapparat/common";

export function addId<T extends object>(obj: T, id: ResourceId['_id']): Resource<T> {
    return {
        _id: id,
        ...(<any> obj)
    };
}

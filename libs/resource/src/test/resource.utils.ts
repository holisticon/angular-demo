import { Resource, ResourceUri } from "../lib/resource";

export function addUri<T extends Record<string, unknown>>(obj: T, uri: ResourceUri): Resource<T> {
    return {
        _id: uri,
        ...obj
    };
}

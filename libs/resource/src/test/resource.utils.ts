import { Resource, ResourceUri } from '@holisticon/resource';

export function addUri<T extends object>(obj: T, uri: ResourceUri): Resource<T> {
    return {
        _id: uri,
        ...(<any> obj)
    };
}

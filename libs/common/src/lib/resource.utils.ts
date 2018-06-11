import { Resource, ResourceId } from './resource.model';

export function getId(resource: Resource<any>) {
    return resource['_id'];
}

export function addId<T extends object>(obj: T, id: ResourceId['_id']): Resource<T> {
    return {
        _id: id,
        ...(<any> obj)
    };
}

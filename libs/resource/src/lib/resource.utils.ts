import { zipObject } from 'lodash-es';
import { Resource, ResourceId } from './resource.model';

export function getId(resource: Resource<any>): ResourceId {
    return resource['_id'];
}

export function getIds(resources: Resource<any>[]) {
    return resources.map(resource => getId(resource));
}

export function toMap<T>(resources: Resource<T>[]) {
    return zipObject(
        resources.map(resource => getId(resource)),
        resources
    );
}

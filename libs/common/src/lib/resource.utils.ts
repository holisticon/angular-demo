import { zipObject } from 'lodash-es';
import { Resource } from './resource.model';

export function getId(resource: Resource<any>) {
    return resource['_id'];
}

export function toMap<T>(resources: Resource<T>[]) {
    return zipObject(
        resources.map(resource => getId(resource)),
        resources
    );
}

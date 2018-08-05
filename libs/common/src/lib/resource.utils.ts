import { Resource } from './resource.model';

export function getId(resource: Resource<any>) {
    return resource['_id'];
}

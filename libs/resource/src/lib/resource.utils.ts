import { isString, zipObject } from 'lodash-es';
import { Resource, ResourceUri } from './resource';

export function getUri(resource: Resource<any>): ResourceUri {
    return resource['_id'];
}

export function getUris(resources: Resource<any>[]) {
    return resources.map(resource => getUri(resource));
}

export function toMap<T>(resources: Resource<T>[]) {
    return zipObject(
        resources.map(resource => getUri(resource)),
        resources
    );
}

export function encodeResourceUriAsRouteParam(resourceUri: ResourceUri): string {
    if (!isString(resourceUri)) {
        return resourceUri;
    }

    return btoa(resourceUri);
}

export function decodeResourceUriFromRouteParam(encodedResourceUri: string): ResourceUri {
    return atob(encodedResourceUri);
}

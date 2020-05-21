import { resource, resources } from '@ngxp/resource/test';
import { getUri, getUris, toMap } from './resource.utils';

describe('resourceUtils', () => {

    describe('getUri', () => {
        it('returns the URI of the given resource', () => {
            expect(getUri(resource)).toBe(resource['_id']);
        });
    });

    describe('getUris', () => {
        it('returns the URIs of the given resources', () => {
            const uris = getUris(resources);

            expect(uris.length).toEqual(resources.length);

            resources.forEach((res, index) => {
                const uri = getUri(res);
                expect(uris[index]).toBe(uri);
            });
        });
    });

    describe('toMap', () => {
        it('converts the given array of resources to a map with the resource IDs as keys', () => {
            const resourceMap = toMap(resources);

            expect(Object.keys(resourceMap)).toEqual(resources.map(res => getUri(res)));
            expect(Object.values(resourceMap)).toEqual(resources);

            resources.forEach(res => {
                const uri = getUri(res);
                expect(resourceMap[uri]).toBe(res);
            });
        });
    });
});

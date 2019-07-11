import { resource, resources } from '@ngxp/resource/test';
import { getId, getIds, toMap } from './resource.utils';

describe('resourceUtils', () => {

    describe('getId', () => {
        it('returns the ID of the given resource', () => {
            expect(getId(resource)).toBe(resource['_id']);
        });
    });

    describe('getIds', () => {
        it('returns the IDs of the given resources', () => {
            const ids = getIds(resources);

            expect(ids.length).toEqual(resources.length);

            resources.forEach((resource, index) => {
                const id = getId(resource);
                expect(ids[index]).toBe(id);
            });
        });
    });

    describe('toMap', () => {
        it('converts the given array of resources to a map with the resource IDs as keys', () => {
            const resourceMap = toMap(resources);

            expect(Object.keys(resourceMap)).toEqual(resources.map(resource => getId(resource)));
            expect(Object.values(resourceMap)).toEqual(resources);

            resources.forEach(resource => {
                const id = getId(resource);
                expect(resourceMap[id]).toBe(resource);
            });
        });
    });
});
import { Resource } from './resource.model';
import { addId, getId } from './resource.utils';

describe('resourceUtils', () => {
    interface SomeType {
        value: string;
    }

    const object: SomeType = {
        value: 'some value'
    };

    const resource: Resource<SomeType> = {
        _id: 'id',
        ...object
    };

    describe('getId', () => {
        it('returns the ID of the given resource', () => {
            expect(getId(resource)).toBe(resource['_id']);
        });
    });

    describe('addId', () => {
        it('returns the given object as resource with the given ID', () => {
            expect(addId(object, resource._id)).toEqual(resource);
        });
    });

});

import { Resource } from '@holisticon/resource';
import { SomeType } from '@holisticon/resource/test';
import { addUri } from './resource.utils';

describe('resourceUtils', () => {
    const object: SomeType = {
        value: 'some value'
    };

    const resource: Resource<SomeType> = {
        _id: 'uri',
        ...object
    };

    describe('addUri', () => {
        it('returns the given object as resource with the given ID', () => {
            expect(addUri(object, resource._id)).toEqual(resource);
        });
    });
});

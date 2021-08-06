import { SomeType } from '@holisticon/resource/test';
import { Resource } from '../lib/resource';
import { addUri } from './resource.utils';

describe('resourceUtils', () => {
    const object = {
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

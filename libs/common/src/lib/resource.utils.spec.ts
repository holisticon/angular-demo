import { getId } from './resource.utils';
import { Resource } from '@ngxp/common';

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
});

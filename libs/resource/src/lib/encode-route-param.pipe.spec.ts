import { lorem } from 'faker';
import { EncodeRouteParam } from './encode-route-param.pipe';

describe('EncodeRouteParam', () => {
    const pipe = new EncodeRouteParam();
    const value = lorem.words();
    const encodedValue = btoa(value);

    it('returns the given value as base64-encoded value', () => {
        expect(pipe.transform(value)).toBe(encodedValue);
    });

    it('returns the given value if the value is not a string', () => {
        const obj = {};
        const arr: unknown[] = [];

        expect(pipe.transform(<unknown>null)).toBe(<unknown>null);
        expect(pipe.transform(<unknown>1)).toBe(<unknown>1);
        expect(pipe.transform(<unknown>undefined)).toBe(<unknown>undefined);
        expect(pipe.transform(<unknown>obj)).toBe(<unknown>obj);
        expect(pipe.transform(<unknown>arr)).toBe(<unknown>arr);
    });

});

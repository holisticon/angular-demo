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
        const arr: any[] = [];

        expect(pipe.transform(<any> null)).toBe(<any> null);
        expect(pipe.transform(<any> 1)).toBe(<any> 1);
        expect(pipe.transform(<any> undefined)).toBe(<any> undefined);
        expect(pipe.transform(<any> obj)).toBe(<any> obj);
        expect(pipe.transform(<any> arr)).toBe(<any> arr);
    });

});

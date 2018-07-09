import { PipeTransform } from '@angular/core';
import { FunctionPipe } from './function.pipe';

describe('FunctionPipe', () => {
    const toUpper = (str: string) => str.toUpperCase();

    it('wraps the given function in a class that implements PipeTransform', () => {
        class ToUpperPipe extends FunctionPipe implements PipeTransform {
            constructor() {
                super(toUpper);
            }
        }

        const toUpperPipe = new ToUpperPipe();

        expect(toUpperPipe.transform('foo')).toBe('FOO');
    });
});

import { PipeTransform } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionPipeFn = (...args: any[]) => unknown;

export abstract class FunctionPipe implements PipeTransform {

    constructor(
        private fn: FunctionPipeFn
    ) { }

    transform(...args: unknown[]) {
        return this.fn(...args);
    }
}

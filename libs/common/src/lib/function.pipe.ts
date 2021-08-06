import { PipeTransform } from '@angular/core';

export abstract class FunctionPipe implements PipeTransform {

    constructor(
        private fn: (...args: unknown[]) => unknown
    ) { }

    transform(...args: unknown[]) {
        return this.fn(...args);
    }
}

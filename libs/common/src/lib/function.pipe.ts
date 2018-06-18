import { PipeTransform } from '@angular/core';

export abstract class FunctionPipe implements PipeTransform {

    constructor(
        private fn: (...args) => any
    ) { }

    transform(...args) {
        return this.fn(...args);
    }
}

import { Pipe, PipeTransform } from '@angular/core';
import { FunctionPipe } from '@holisticon/common';
import { encodeResourceUriAsRouteParam } from './resource.utils';

@Pipe({
    name: 'encodeRouteParam'
})
export class EncodeRouteParam extends FunctionPipe implements PipeTransform {
    constructor() {
        super(encodeResourceUriAsRouteParam);
    }
}

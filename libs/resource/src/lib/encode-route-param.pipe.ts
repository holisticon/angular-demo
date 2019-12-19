// tslint:disable:use-pipe-transform-interface

import { Pipe } from '@angular/core';
import { FunctionPipe } from '@ngxp/common';
import { encodeResourceUriAsRouteParam } from './resource.utils';

@Pipe({
    name: 'encodeRouteParam'
})
export class EncodeRouteParam extends FunctionPipe {
    constructor() {
        super(encodeResourceUriAsRouteParam);
    }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EncodeRouteParam } from './encode-route-param.pipe';
import { ToResourceUriPipe } from './to-resource-uri.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        EncodeRouteParam,
        ToResourceUriPipe
    ],
    exports: [
        EncodeRouteParam,
        ToResourceUriPipe
    ]
})
export class ResourceModule { }

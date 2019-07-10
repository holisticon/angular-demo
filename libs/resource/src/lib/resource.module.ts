import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EncodeRouteParam } from './encode-route-param.pipe';
import { ToResourceIdPipe } from './to-resource-id.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        EncodeRouteParam,
        ToResourceIdPipe
    ],
    exports: [
        EncodeRouteParam,
        ToResourceIdPipe
    ]
})
export class ResourceModule { }

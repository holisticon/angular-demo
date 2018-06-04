import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrdersCommonService } from './orders-common.service';
import { OrdersCommonEffects } from './state/orders-common.effects';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        OrdersCommonEffects,
        OrdersCommonService
    ]
})
export class OrdersCommonModule {}

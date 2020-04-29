import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersModule } from '../..';
import { OrdersComponent, OrdersModule as OrdersComponentModule } from './orders/orders.component';

@NgModule({
    imports: [
        CommonModule,
        OrdersModule,
        OrdersComponentModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: OrdersComponent }
        ])
    ]
})
export class OrdersRoutingModule { }

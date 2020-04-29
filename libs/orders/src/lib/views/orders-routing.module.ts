import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersModule } from '../..';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
    imports: [
        CommonModule,
        OrdersModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: OrdersComponent }
        ])
    ],
    declarations: [
        OrdersComponent
    ]
})
export class OrdersRoutingModule { }

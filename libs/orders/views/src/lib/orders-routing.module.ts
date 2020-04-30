import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersComponent, OrdersModule } from './orders/orders.component';

@NgModule({
    imports: [
        CommonModule,
        OrdersModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: OrdersComponent }
        ])
    ]
})
export class OrdersRoutingModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { OrdersNavigationEffects } from './orders-navigation.effects';
import { OrdersViews } from './orders.views';
import { OrdersComponent, OrdersModule } from './orders/orders.component';

@NgModule({
    imports: [
        CommonModule,
        OrdersModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: OrdersComponent, data: { view: OrdersViews.Root } }
        ]),
        EffectsModule.forFeature([
            OrdersNavigationEffects
        ])
    ]
})
export class OrdersRoutingModule { }

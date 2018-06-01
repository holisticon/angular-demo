import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileCommonModule } from '@luchsamapparat/user-profile-common';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: OrdersComponent }
        ]),
        UserProfileCommonModule
    ],
    declarations: [
        OrdersComponent,
        OrderComponent
    ]
})
export class OrdersModule {}

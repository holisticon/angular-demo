import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserProfileCommonModule } from '@ngxp/user-profile-common';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersStore } from './state/orders-store.service';
import { OrdersEffects } from './state/orders.effects';
import { initialState as ordersInitialState, ordersReducer } from './state/orders.reducer';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: OrdersComponent }
        ]),
        UserProfileCommonModule,
        StoreModule.forFeature('orders', ordersReducer, { initialState: ordersInitialState }),
        EffectsModule.forFeature([OrdersEffects])
    ],
    declarations: [
        OrdersComponent,
        OrderComponent
    ],
    providers: [
        OrdersEffects
    ]
})
export class OrdersModule {
    constructor(
        ordersStore: OrdersStore
    ) {
        // TODO load via routing effect
        setTimeout(() => ordersStore.loadOrderHistory());
    }
}

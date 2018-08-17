import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileCommonModule } from '@ngxp/user-profile-common';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { LoadOrdersAction } from './state/orders.actions';
import { OrdersEffects } from './state/orders.effects';
import { initialState as ordersInitialState, ordersReducer, OrdersState } from './state/orders.reducer';
import { OrdersStore } from './state/orders-store.service';

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
        ordersStore.loadOrders();
    }
}

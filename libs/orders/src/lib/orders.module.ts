import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserProfileModule } from '@ngxp/user-profile';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { PlaceOrderFormComponent } from './place-order-form/place-order-form.component';
import { OrdersStore } from './state/orders-store.service';
import { OrdersEffects } from './state/orders.effects';
import { initialState as ordersInitialState, ordersReducer } from './state/orders.reducer';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: OrdersComponent }
        ]),
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('orders', ordersReducer, { initialState: ordersInitialState }),
        EffectsModule.forFeature([OrdersEffects]),
        UserProfileModule
    ],
    declarations: [
        OrdersComponent,
        OrderComponent,
        PlaceOrderFormComponent
    ],
    providers: [
        OrdersEffects
    ],
    exports: [
        PlaceOrderFormComponent
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

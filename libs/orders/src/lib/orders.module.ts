import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserProfileModule } from '@ngxp/user-profile';
import { OrdersStore } from './state/orders-store.service';
import { OrdersEffects } from './state/orders.effects';
import { initialState as ordersInitialState, ordersReducer } from './state/orders.reducer';
import { OrderComponent } from './ui/order/order.component';
import { PlaceOrderFormComponent } from './ui/place-order-form/place-order-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('orders', ordersReducer, { initialState: ordersInitialState }),
        EffectsModule.forFeature([OrdersEffects]),
        UserProfileModule
    ],
    declarations: [
        OrderComponent,
        PlaceOrderFormComponent
    ],
    providers: [
        OrdersEffects
    ],
    exports: [
        PlaceOrderFormComponent,

        // TODO remove
        OrderComponent
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

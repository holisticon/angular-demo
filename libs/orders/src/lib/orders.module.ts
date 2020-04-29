import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrdersStore } from './state/orders-store.service';
import { OrdersEffects } from './state/orders.effects';
import { initialState as ordersInitialState, ordersReducer } from './state/orders.reducer';

@NgModule({
    imports: [
        StoreModule.forFeature('orders', ordersReducer, { initialState: ordersInitialState }),
        EffectsModule.forFeature([OrdersEffects]),
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

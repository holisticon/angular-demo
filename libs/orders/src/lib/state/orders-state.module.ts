import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrdersEffects } from './orders.effects';
import { initialState, ordersReducer } from './orders.reducer';

@NgModule({
    imports: [
        StoreModule.forFeature('orders', ordersReducer, { initialState }),
        EffectsModule.forFeature([OrdersEffects]),
    ],
    providers: [
        OrdersEffects
    ]
})
export class OrdersStateModule { }

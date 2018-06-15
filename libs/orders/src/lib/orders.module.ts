import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileCommonModule } from '@luchsamapparat/user-profile-common';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { LoadOrdersAction } from './state/orders.actions';
import { OrdersEffects } from './state/orders.effects';
import { initialState as ordersInitialState, ordersReducer, OrdersState } from './state/orders.reducer';

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
        store: Store<OrdersState>
    ) {
        store.dispatch(new LoadOrdersAction());
    }
}

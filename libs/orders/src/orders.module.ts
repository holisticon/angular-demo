import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadOrdersAction } from '@luchsamapparat/orders/src/state/orders.actions';
import { UserProfileCommonModule } from '@luchsamapparat/user-profile-common';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { OrderService } from './order.service';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersEffects } from './state/orders.effects';
import { OrdersState, initialState as ordersInitialState, ordersReducer } from './state/orders.reducer';

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
        OrdersEffects,
        OrderService
    ]
})
export class OrdersModule {
    constructor(
        store: Store<OrdersState>
    ) {
        store.dispatch(new LoadOrdersAction());
    }
}

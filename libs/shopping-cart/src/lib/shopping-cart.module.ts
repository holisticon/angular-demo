import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrdersCommonModule } from '@ngxp/orders-common';
import { ShoppingCartCommonModule } from '@ngxp/shopping-cart-common';
import { UserProfileCommonModule } from '@ngxp/user-profile-common';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { ShoppingCartItemListComponent } from './shopping-cart-item-list/shopping-cart-item-list.component';
import { ShoppingCartItemComponent } from './shopping-cart-item-list/shopping-cart-item/shopping-cart-item.component';
import { UpdateQuantityFormComponent } from './shopping-cart-item-list/shopping-cart-item/update-quantity-form/update-quantity-form.component';
import { ShoppingCartIsEmptyPipe } from './shopping-cart/shopping-cart-is-empty.pipe';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoadShoppingCartAction } from './state/shopping-cart.actions';
import { ShoppingCartEffects } from './state/shopping-cart.effects';
import { initialState as shoppingCartInitialState, shoppingCartReducer, ShoppingCartState } from './state/shopping-cart.reducer';
import { ShoppingCartStore } from './state/shopping-cart-store.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: ShoppingCartComponent }
        ]),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer, { initialState: shoppingCartInitialState }),
        EffectsModule.forFeature([ShoppingCartEffects]),
        ShoppingCartCommonModule,
        OrdersCommonModule,
        UserProfileCommonModule
    ],
    declarations: [
        ShoppingCartComponent,
        ShoppingCartItemListComponent,
        UpdateQuantityFormComponent,
        ShoppingCartItemComponent,
        ShoppingCartIsEmptyPipe
    ],
    providers: [
        ShoppingCartEffects
    ]
})
export class ShoppingCartModule {
    constructor(
        shoppingCartStore: ShoppingCartStore
    ) {
        shoppingCartStore.loadShoppingCart();
    }
}

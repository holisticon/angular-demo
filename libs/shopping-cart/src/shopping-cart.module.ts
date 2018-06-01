import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingCartCommonModule } from '@luchsamapparat/shopping-cart-common';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { ShoppingCartItemListComponent } from './shopping-cart-item-list/shopping-cart-item-list.component';
import { ShoppingCartItemComponent } from './shopping-cart-item-list/shopping-cart-item/shopping-cart-item.component';
import { UpdateQuantityFormComponent } from './shopping-cart-item-list/shopping-cart-item/update-quantity-form/update-quantity-form.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoadShoppingCartAction } from './state/shopping-cart.actions';
import { ShoppingCartEffects } from './state/shopping-cart.effects';
import { ShoppingCartState, initialState as shoppingCartInitialState, shoppingCartReducer } from './state/shopping-cart.reducer';

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
        ShoppingCartCommonModule
    ],
    declarations: [
        ShoppingCartComponent,
        ShoppingCartItemListComponent,
        UpdateQuantityFormComponent,
        ShoppingCartItemComponent
    ],
    providers: [
        ShoppingCartEffects,
        ShoppingCartService
    ]
})
export class ShoppingCartModule {
    constructor(
        store: Store<ShoppingCartState>
    ) {
        store.dispatch(new LoadShoppingCartAction());
    }
}

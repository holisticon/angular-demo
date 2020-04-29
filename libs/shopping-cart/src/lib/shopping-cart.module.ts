import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrdersModule } from '@ngxp/orders';
import { UserProfileModule } from '@ngxp/user-profile';
import { ShoppingCartEffects } from './state/shopping-cart.effects';
import { initialState as shoppingCartInitialState, shoppingCartReducer, SHOPPING_CART_FEATURE_KEY } from './state/shopping-cart.reducer';
import { AddToShoppingCartFormComponent } from './ui/add-to-shopping-cart-form/add-to-shopping-cart-form.component';
import { ShoppingCartItemListComponent } from './ui/shopping-cart-item-list/shopping-cart-item-list.component';
import { ShoppingCartItemComponent } from './ui/shopping-cart-item-list/shopping-cart-item/shopping-cart-item.component';
import { UpdateQuantityFormComponent } from './ui/shopping-cart-item-list/shopping-cart-item/update-quantity-form/update-quantity-form.component';
import { ShoppingCartNavigationEffects } from './views/shopping-cart-navigation.effects';
import { ShoppingCartViews } from './views/shopping-cart.views';
import { ShoppingCartIsEmptyPipe } from './views/shopping-cart/shopping-cart-is-empty.pipe';
import { ShoppingCartComponent } from './views/shopping-cart/shopping-cart.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: ShoppingCartComponent, data: { view: ShoppingCartViews.Root } }
        ]),
        StoreModule.forFeature(SHOPPING_CART_FEATURE_KEY, shoppingCartReducer, { initialState: shoppingCartInitialState }),
        EffectsModule.forFeature([
            ShoppingCartEffects,
            ShoppingCartNavigationEffects
        ]),
        OrdersModule,
        UserProfileModule
    ],
    declarations: [
        AddToShoppingCartFormComponent,
        ShoppingCartComponent,
        ShoppingCartItemListComponent,
        UpdateQuantityFormComponent,
        ShoppingCartItemComponent,
        ShoppingCartIsEmptyPipe
    ],
    exports: [
        AddToShoppingCartFormComponent
    ]
})
export class ShoppingCartModule { }

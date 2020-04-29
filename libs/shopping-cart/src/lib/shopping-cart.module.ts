import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrdersModule } from '@ngxp/orders';
import { ResourceModule } from '@ngxp/resource';
import { UserProfileModule } from '@ngxp/user-profile';
import { ShoppingCartEffects } from './state/shopping-cart.effects';
import { initialState as shoppingCartInitialState, shoppingCartReducer, SHOPPING_CART_FEATURE_KEY } from './state/shopping-cart.reducer';
import { AddToShoppingCartFormComponent } from './ui/add-to-shopping-cart-form/add-to-shopping-cart-form.component';
import { ShoppingCartItemListComponent } from './ui/shopping-cart-item-list/shopping-cart-item-list.component';
import { ShoppingCartItemComponent } from './ui/shopping-cart-item-list/shopping-cart-item/shopping-cart-item.component';
import { UpdateQuantityFormComponent } from './ui/shopping-cart-item-list/shopping-cart-item/update-quantity-form/update-quantity-form.component';
import { ShoppingCartIsEmptyPipe } from './views/shopping-cart/shopping-cart-is-empty.pipe';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ResourceModule,
        RouterModule,
        StoreModule.forFeature(SHOPPING_CART_FEATURE_KEY, shoppingCartReducer, { initialState: shoppingCartInitialState }),
        EffectsModule.forFeature([
            ShoppingCartEffects
        ]),
        OrdersModule,
        UserProfileModule
    ],
    declarations: [
        AddToShoppingCartFormComponent,
        ShoppingCartItemListComponent,
        UpdateQuantityFormComponent,
        ShoppingCartItemComponent,
        ShoppingCartIsEmptyPipe
    ],
    exports: [
        AddToShoppingCartFormComponent,

        // TODO remove
        ShoppingCartItemListComponent,
        UpdateQuantityFormComponent,
        ShoppingCartItemComponent,
        ShoppingCartIsEmptyPipe
    ]
})
export class ShoppingCartModule { }

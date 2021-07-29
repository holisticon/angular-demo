import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OrdersStateModule } from '@holisticon/orders/state';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ShoppingCartEffects } from './shopping-cart.effects';
import { initialState, shoppingCartReducer, SHOPPING_CART_FEATURE_KEY } from './shopping-cart.reducer';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature(SHOPPING_CART_FEATURE_KEY, shoppingCartReducer, { initialState: initialState }),
        EffectsModule.forFeature([
            ShoppingCartEffects
        ]),
        OrdersStateModule
    ]
})
export class ShoppingCartStateModule { }

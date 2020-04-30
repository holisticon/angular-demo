import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ShoppingCartEffects } from './state/shopping-cart.effects';
import { initialState as shoppingCartInitialState, shoppingCartReducer, SHOPPING_CART_FEATURE_KEY } from './state/shopping-cart.reducer';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature(SHOPPING_CART_FEATURE_KEY, shoppingCartReducer, { initialState: shoppingCartInitialState }),
        EffectsModule.forFeature([
            ShoppingCartEffects
        ])
    ]
})
export class ShoppingCartModule { }

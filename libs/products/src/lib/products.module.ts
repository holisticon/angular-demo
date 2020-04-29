import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductsEffects } from './state/products.effects';
import { initialState as productsInitialState, productsReducer, PRODUCTS_FEATURE_KEY } from './state/products.reducer';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature(PRODUCTS_FEATURE_KEY, productsReducer, { initialState: productsInitialState }),
        EffectsModule.forFeature([
            ProductsEffects
        ])
    ]
})
export class ProductsModule { }

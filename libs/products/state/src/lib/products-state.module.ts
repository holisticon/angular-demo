import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductsEffects } from './products.effects';
import { initialState, productsReducer, PRODUCTS_FEATURE_KEY } from './products.reducer';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature(PRODUCTS_FEATURE_KEY, productsReducer, { initialState }),
        EffectsModule.forFeature([
            ProductsEffects
        ])
    ]
})
export class ProductsStateModule { }

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ResourceModule } from '@ngxp/resource';
import { ShoppingCartModule } from '@ngxp/shopping-cart';
import { ProductsEffects } from './state/products.effects';
import { initialState as productsInitialState, productsReducer, PRODUCTS_FEATURE_KEY } from './state/products.reducer';
import { ProductImageComponent } from './ui/product-image/product-image.component';
import { ProductListEntryComponent } from './ui/product-list/product-list-entry/product-list-entry.component';
import { ProductListComponent } from './ui/product-list/product-list.component';
import { ProductPriceComponent } from './ui/product-price/product-price.component';
import { ProductSearchFormComponent } from './ui/product-search-form/product-search-form.component';
import { ProductComponent } from './ui/product/product.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature(PRODUCTS_FEATURE_KEY, productsReducer, { initialState: productsInitialState }),
        EffectsModule.forFeature([
            ProductsEffects
        ]),
        RouterModule,
        ResourceModule,
        ShoppingCartModule
    ],
    declarations: [
        ProductListComponent,
        ProductListEntryComponent,
        ProductImageComponent,
        ProductPriceComponent,
        ProductComponent,
        ProductSearchFormComponent
    ],
    exports: [
        ProductSearchFormComponent,

        // TODO remove
        ProductListComponent,
        ProductListEntryComponent,
        ProductImageComponent,
        ProductPriceComponent,
        ProductComponent
    ]
})
export class ProductsModule { }

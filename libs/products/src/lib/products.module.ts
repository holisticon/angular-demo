import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ResourceModule } from '@ngxp/resource';
import { ShoppingCartCommonModule } from '@ngxp/shopping-cart-common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductImageComponent } from './product-image/product-image.component';
import { ProductListEntryComponent } from './product-list/product-list-entry/product-list-entry.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductPriceComponent } from './product-price/product-price.component';
import { ProductComponent } from './product/product.component';
import { ProductsNavigationEffects } from './products-navigation.effects';
import { ProductsComponent } from './products.component';
import { ProductsViews } from './products.views';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ProductsEffects } from './state/products.effects';
import { initialState as productsInitialState, productsReducer, PRODUCTS_FEATURE_KEY } from './state/products.reducer';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild([
            {
                path: '', component: ProductsComponent, data: { view: ProductsViews.Root }, children: [
                    { path: '', pathMatch: 'full', component: SearchResultsComponent, data: { view: ProductsViews.SearchResults } },
                    { path: ':productId', component: ProductDetailsComponent, data: { view: ProductsViews.ProductDetails } }
                ]
            },
        ]),
        StoreModule.forFeature(PRODUCTS_FEATURE_KEY, productsReducer, { initialState: productsInitialState }),
        EffectsModule.forFeature([
            ProductsEffects,
            ProductsNavigationEffects
        ]),
        ResourceModule,
        ShoppingCartCommonModule
    ],
    declarations: [
        SearchResultsComponent,
        ProductListComponent,
        ProductListEntryComponent,
        ProductDetailsComponent,
        ProductsComponent,
        ProductImageComponent,
        ProductPriceComponent,
        ProductComponent
    ],
    providers: [
        ProductsEffects,
        ProductsNavigationEffects
    ]
})
export class ProductsModule { }

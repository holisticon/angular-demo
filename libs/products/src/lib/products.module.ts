import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ResourceModule } from '@ngxp/resource';
import { ShoppingCartCommonModule } from '@ngxp/shopping-cart-common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListEntryComponent } from './product-list/product-list-entry/product-list-entry.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsNavigationEffects } from './products-navigation.effects';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ProductsEffects } from './state/products.effects';
import { initialState as productsInitialState, productsReducer, PRODUCTS_FEATURE_KEY } from './state/products.reducer';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: SearchResultsComponent },
            { path: ':productId', component: ProductDetailsComponent }
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
        ProductDetailsComponent
    ],
    providers: [
        ProductsEffects,
        ProductsNavigationEffects
    ]
})
export class ProductsModule {}

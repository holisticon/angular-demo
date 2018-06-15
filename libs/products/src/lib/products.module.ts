import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingCartCommonModule } from '@luchsamapparat/shopping-cart-common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductListEntryComponent } from './product-list/product-list-entry/product-list-entry.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsNavigationEffects } from './products-navigation.effects';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ProductsEffects } from './state/products.effects';
import { initialState as productsInitialState, productsReducer } from './state/products.reducer';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: SearchResultsComponent }
        ]),
        StoreModule.forFeature('products', productsReducer, { initialState: productsInitialState }),
        EffectsModule.forFeature([
            ProductsEffects,
            ProductsNavigationEffects
        ]),
        ShoppingCartCommonModule
    ],
    declarations: [
        SearchResultsComponent,
        ProductListComponent,
        ProductListEntryComponent
    ],
    providers: [
        ProductsEffects,
        ProductsNavigationEffects
    ]
})
export class ProductsModule {}

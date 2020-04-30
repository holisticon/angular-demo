import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ProductDetailsComponent, ProductDetailsModule } from './product-details/product-details.component';
import { ProductsNavigationEffects } from './products-navigation.effects';
import { ProductsComponent, ProductsModule } from './products.component';
import { ProductsViews } from './products.views';
import { SearchResultsComponent, SearchResultsModule } from './search-results/search-results.component';

@NgModule({
    imports: [
        CommonModule,
        ProductsModule,
        SearchResultsModule,
        ProductDetailsModule,
        RouterModule.forChild([
            {
                path: '', component: ProductsComponent, data: { view: ProductsViews.Root }, children: [
                    { path: '', pathMatch: 'full', component: SearchResultsComponent, data: { view: ProductsViews.SearchResults } },
                    { path: ':product', component: ProductDetailsComponent, data: { view: ProductsViews.ProductDetails } }
                ]
            },
        ]),
        EffectsModule.forFeature([
            ProductsNavigationEffects
        ])
    ]
})
export class ProductsRoutingModule { }

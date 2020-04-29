import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ProductsModule } from '../..';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsNavigationEffects } from './products-navigation.effects';
import { ProductsComponent } from './products.component';
import { ProductsViews } from './products.views';
import { SearchResultsComponent } from './search-results/search-results.component';

@NgModule({
    imports: [
        CommonModule,
        ProductsModule,
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
    ],
    declarations: [
        ProductsComponent,
        SearchResultsComponent,
        ProductDetailsComponent
    ]
})
export class ProductsRoutingModule { }

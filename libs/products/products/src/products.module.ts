import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductService } from './product.service';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ProductsEffects } from './state/products.effects';
import { initialState as productsInitialState, productsReducer } from './state/products.reducer';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: SearchResultsComponent }
        ]),
        StoreModule.forFeature('products', productsReducer, { initialState: productsInitialState }),
        EffectsModule.forFeature([ProductsEffects])
    ],
    declarations: [
        SearchResultsComponent,
        ProductListComponent
    ],
    providers: [
        ProductsEffects,
        ProductService
    ]
})
export class ProductsModule {}

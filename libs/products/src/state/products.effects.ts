import { Injectable } from '@angular/core';
import { LoadSearchResultsAction, ProductsActionTypes, SearchResultsLoadedAction } from '@luchsamapparat/products-common';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { ProductService } from '../product.service';
import { ProductsAppState } from './products.reducer';

@Injectable()
export class ProductsEffects {

    @Effect()
    loadSearchResults$ = this.dataPersistence.fetch(
        ProductsActionTypes.LoadSearchResults,
        {
            run: (action: LoadSearchResultsAction, state: ProductsAppState) => {
                return this.productService
                    .searchProducts(action.payload)
                    .map(products => new SearchResultsLoadedAction(products));
            },

            onError: (action: LoadSearchResultsAction, error) => {
                console.error('Error', error);
            }
        }
    );

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<ProductsAppState>,
        private productService: ProductService
    ) {}
}

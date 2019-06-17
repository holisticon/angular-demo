import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { LoadSearchResultsAction, ProductsActionTypes, SearchResultsLoadedAction } from '@ngxp/products-common';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { ProductsPartialState } from './products.reducer';

@Injectable()
export class ProductsEffects {

    @Effect()
    loadSearchResults$ = this.dataPersistence.fetch(
        ProductsActionTypes.LoadSearchResults,
        {
            run: (action: LoadSearchResultsAction, state: ProductsPartialState) => {
                return this.productService
                    .searchProducts(action.payload)
                    .pipe(
                        map(products => new SearchResultsLoadedAction(products))
                    );
            },

            onError: (action: LoadSearchResultsAction, error) => {
                console.error('Error', error);
            }
        }
    );

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<ProductsPartialState>,
        private productService: ProductService
    ) {}
}

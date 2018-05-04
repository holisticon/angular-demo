import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { LoadSearchResultsAction, ProductsActionTypes, SearchResultsLoadedAction } from '@luchsamapparat/products/products-common';
import { ProductService } from '@luchsamapparat/products/products/src/product.service';
import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { DataPersistence } from '@nrwl/nx';
import { defaultTo } from 'lodash-es';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { ProductsAppState } from './products.reducer';

@Injectable()
export class ProductsEffects {

    @Effect()
    loadSearchResults$ = this.dataPersistence.fetch(
        ProductsActionTypes.LoadSearchResults,
        {
            run: (action: LoadSearchResultsAction, state: ProductsAppState) => {
                return this.productService.searchProducts(action.payload)
                    .map(products => new SearchResultsLoadedAction(products));
            },

            onError: (action: LoadSearchResultsAction, error) => {
                console.error('Error', error);
            }
        }
    );

    @Effect()
    loadSearchResultsOnNavigate$ = this.actions$
        .ofType(ROUTER_NAVIGATION)
        .map((action: RouterNavigationAction<RouterStateUrl>) => action.payload)
        .map(routerNavigationPayload => routerNavigationPayload.routerState)
        .filter(routerState => routerState.url.startsWith('/products'))
        .map(routerState => routerState.queryParams.query)
        .map(query => defaultTo(query, null))
        .map(query => new LoadSearchResultsAction(query));

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<ProductsAppState>,
        private productService: ProductService
    ) {}
}

interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
}

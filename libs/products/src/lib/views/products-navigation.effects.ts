import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { decodeResourceUriFromRouteParam } from '@ngxp/resource';
import { extractQueryParam, extractRouteParam, filterNavigationTo } from '@ngxp/routing';
import { isEmpty, isUndefined } from 'lodash-es';
import { filter, map, switchMap } from 'rxjs/operators';
import { loadProductAction, loadSearchResultsAction, ProductsStore } from '../state';
import { ProductsViews } from './products.views';

@Injectable()
export class ProductsNavigationEffects {

    loadSearchResultsOnNavigate$ = createEffect(
        () => this.actions$.pipe(
            filterNavigationTo(ProductsViews.SearchResults),
            extractQueryParam('query', null),
            map(query => loadSearchResultsAction({ queryString: query }))
        ));

    loadProductOnNavigate$ = createEffect(
        () => this.actions$.pipe(
            filterNavigationTo(ProductsViews.ProductDetails),
            extractRouteParam('product'),
            filter(product => !isEmpty(product)),
            map(encodedProductUri => decodeResourceUriFromRouteParam(encodedProductUri as string)),
            switchMap(productUri => this.productsStore.getProduct({ productUri }).pipe(
                filter(product => isUndefined(product)),
                map(() => loadProductAction({ id: productUri }))
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private productsStore: ProductsStore
    ) { }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { extractQueryParam, filterNavigationTo } from '@ngxp/routing';
import { map } from 'rxjs/operators';
import { ProductsViews } from './products.views';
import { loadSearchResultsAction } from './state/products.actions';

@Injectable()
export class ProductsNavigationEffects {

    loadSearchResultsOnNavigate$ = createEffect(
        () => this.actions$.pipe(
            filterNavigationTo(ProductsViews.SearchResults),
            extractQueryParam('query', null),
            map(query => loadSearchResultsAction({ query }))
        ));

    constructor(
        private actions$: Actions,
    ) { }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { loadSearchResultsAction } from '@ngxp/products/state';
import { extractQueryParam, filterNavigationTo } from '@ngxp/routing';
import { map } from 'rxjs/operators';
import { ProductsViews } from './products.views';

@Injectable()
export class ProductsNavigationEffects {

    loadSearchResultsOnNavigate$ = createEffect(
        () => this.actions$.pipe(
            filterNavigationTo(ProductsViews.SearchResults),
            extractQueryParam('query', null),
            map(query => loadSearchResultsAction({ queryString: query }))
        ));

    constructor(
        private actions$: Actions,
    ) { }
}

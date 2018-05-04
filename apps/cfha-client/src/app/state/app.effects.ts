import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsActionTypes, SearchProductsAction } from '@luchsamapparat/products/products-common';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/map';

@Injectable()
export class AppEffects {

    @Effect({ dispatch: false })
    navigateToProductSearchResults$ = this.actions$
        .ofType(ProductsActionTypes.SearchProducts)
        .map((action: SearchProductsAction) => action.payload)
        .map(query => {
            this.router.navigate(
                ['products'],
                { queryParams: { query } }
            )
        });

    constructor(
        private actions$: Actions,
        private router: Router
    ) {}
}

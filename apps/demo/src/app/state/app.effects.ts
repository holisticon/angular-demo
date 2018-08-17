import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsActionTypes, SearchProductsAction } from '@ngxp/products-common';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

@Injectable()
export class AppEffects {

    @Effect({ dispatch: false })
    navigateToProductSearchResults$ = this.actions$.pipe(
        ofType(ProductsActionTypes.SearchProducts),
        map((action: SearchProductsAction) => action.payload),
        map(query => {
            this.router.navigate(
                ['products'],
                { queryParams: { query } }
            )
        })
    );

    constructor(
        private actions$: Actions,
        private router: Router
    ) {}
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { searchProductsAction } from '@ngxp/products-common';
import { map } from 'rxjs/operators';

@Injectable()
export class AppEffects {

    navigateToProductSearchResults$ = createEffect(
        () => this.actions$.pipe(
            ofType(searchProductsAction),
            map(({ query }) => {
                this.router.navigate(
                    ['products'],
                    { queryParams: { query } }
                )
            })
        ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private router: Router
    ) {}
}

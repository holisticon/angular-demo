import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect } from '@ngrx/effects';
import { ProductsCommonStore } from '@ngxp/products-common';
import { map } from 'rxjs/operators';

@Injectable()
export class AppEffects {

    navigateToProductSearchResults$ = createEffect(
        () => this.productsCommonStore.searchProducts$.pipe(
            map(query => {
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
        private router: Router,
        private productsCommonStore: ProductsCommonStore
    ) {}
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect } from '@ngrx/effects';
import { ProductsStore } from '@ngxp/products/state';
import { map } from 'rxjs/operators';

@Injectable()
export class AppEffects {

    navigateToProductSearchResults$ = createEffect(
        () => this.productsStore.searchProducts$.pipe(
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
        private router: Router,
        private productsStore: ProductsStore
    ) { }
}

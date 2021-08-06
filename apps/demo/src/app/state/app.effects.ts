import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsStore } from '@holisticon/products';
import { createEffect } from '@ngrx/effects';
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

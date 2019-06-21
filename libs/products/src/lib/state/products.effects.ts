import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadSearchResultsAction, searchResultsLoadedAction } from '@ngxp/products-common';
import { map, switchMap } from 'rxjs/operators';
import { ProductService } from '../product.service';

@Injectable()
export class ProductsEffects {

    loadSearchResults$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadSearchResultsAction),
            switchMap(({ query }) => this.productService
                .searchProducts(query)
                .pipe(
                    map(searchResults => searchResultsLoadedAction({ searchResults }))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) {}
}

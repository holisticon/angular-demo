import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ProductService } from './product.service';
import { loadSearchResultsAction, searchResultsLoadedAction } from './products.actions';

@Injectable()
export class ProductsEffects {

    loadSearchResults$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadSearchResultsAction),
            switchMap(({ queryString }) => this.productService
                .searchProducts(queryString)
                .pipe(
                    map(searchResults => searchResultsLoadedAction({ searchResults }))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}

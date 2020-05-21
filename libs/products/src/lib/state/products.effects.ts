import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ProductService } from './product.service';
import { loadProductAction, loadSearchResultsAction, productLoadedAction, searchResultsLoadedAction } from './products.actions';

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

    loadProduct$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadProductAction),
            switchMap(({ id }) => this.productService
                .loadProduct(id)
                .pipe(
                    map(product => productLoadedAction({ product }))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}

import { Injectable } from '@angular/core';
import { StoreSelector } from '@luchsamapparat/common';
import { Product } from '@luchsamapparat/products-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ProductsAppState } from './products.reducer';
import { getSearchResults } from './products.selectors';

@Injectable({
    providedIn: 'root'
})
export class ProductsStore {

    constructor(
        private store: Store<ProductsAppState>
    ) { }

    @StoreSelector(getSearchResults)
    getSearchResults: () => Observable<Product[]>;

}

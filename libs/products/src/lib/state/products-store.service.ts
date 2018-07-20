import { Injectable } from '@angular/core';
import { Product } from '@luchsamapparat/products-common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductsAppState } from './products.reducer';
import { getSearchResults } from './products.selectors';
import { Selector, StoreService } from '@ngx-patterns/store-service';

@Injectable({
    providedIn: 'root'
})
export class ProductsStore extends StoreService<ProductsAppState> {

    @Selector(getSearchResults)
    getSearchResults: () => Observable<Product[]>;

}

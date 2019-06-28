import { Injectable } from '@angular/core';
import { Product } from '@ngxp/products-common';
import { Select, StoreService } from '@ngxp/store-service';
import { Observable } from 'rxjs';
import { ProductsPartialState } from './products.reducer';
import { getSearchResults } from './products.selectors';

@Injectable({
    providedIn: 'root'
})
export class ProductsStore extends StoreService<ProductsPartialState> {

    @Select(getSearchResults)
    getSearchResults!: () => Observable<Product[]>;

}

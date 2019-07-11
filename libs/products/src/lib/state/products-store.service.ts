import { Injectable } from '@angular/core';
import { Select, Selector, StoreService } from '@ngxp/store-service';
import { ProductsAppState } from './products.reducer';
import { selectProduct, selectSearchResults } from './products.selectors';

@Injectable({
    providedIn: 'root'
})
export class ProductsStore extends StoreService<ProductsAppState> {

    @Select(selectSearchResults)
    getSearchResults!: Selector<typeof selectSearchResults>;

    @Select(selectProduct)
    getProduct!: Selector<typeof selectProduct>;

}

import { Injectable } from '@angular/core';
import { Select, Selector, StoreService } from '@ngxp/store-service';
import { ProductsPartialState } from './products.reducer';
import { selectSearchResults } from './products.selectors';

@Injectable({
    providedIn: 'root'
})
export class ProductsStore extends StoreService<ProductsPartialState> {

    @Select(selectSearchResults)
    getSearchResults!: Selector<typeof selectSearchResults>;

}

import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, Observe, Select, Selector, StoreService } from '@ngxp/store-service';
import { Observable } from 'rxjs';
import { loadProductAction, searchProductsAction } from './products.actions';
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

    @Dispatch(loadProductAction)
    loadProduct!: Dispatcher<typeof loadProductAction>;

    @Dispatch(searchProductsAction)
    searchProducts!: Dispatcher<typeof searchProductsAction>;

    @Observe([searchProductsAction], (action: ReturnType<typeof searchProductsAction>) => action.queryString)
    searchProducts$!: Observable<string | null>

}

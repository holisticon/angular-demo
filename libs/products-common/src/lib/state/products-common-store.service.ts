import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, StoreService } from '@ngxp/store-service';
import { searchProductsAction } from './products.actions';

@Injectable({
    providedIn: 'root'
})
export class ProductsCommonStore extends StoreService<void> {

    @Dispatch(searchProductsAction)
    searchProducts!: Dispatcher<typeof searchProductsAction>;

}

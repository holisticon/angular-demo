import { Injectable } from '@angular/core';
import { Dispatch, StoreService } from '@ngxp/store-service';
import { SearchProductsAction } from './products.actions';

@Injectable({
    providedIn: 'root'
})
export class ProductsCommonStore extends StoreService<void> {

    @Dispatch(SearchProductsAction)
    searchProducts!: (query: string) => void;

}

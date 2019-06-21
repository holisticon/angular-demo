import { Injectable } from '@angular/core';
import { StoreService } from '@ngxp/store-service';

@Injectable({
    providedIn: 'root'
})
export class ProductsCommonStore extends StoreService<void> {

    // @Dispatch(SearchProductsAction)
    searchProducts: (query: string) => void = () => {};

}

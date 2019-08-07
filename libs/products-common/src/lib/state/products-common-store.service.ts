import { Injectable } from '@angular/core';
import { Dispatch, Dispatcher, Observe, StoreService } from '@ngxp/store-service';
import { Observable } from 'rxjs';
import { searchProductsAction } from './products.actions';

@Injectable({
    providedIn: 'root'
})
export class ProductsCommonStore extends StoreService<void> {

    @Dispatch(searchProductsAction)
    searchProducts!: Dispatcher<typeof searchProductsAction>;

    @Observe([searchProductsAction], (action: ReturnType<typeof searchProductsAction>) => action.query)
    searchProducts$!: Observable<string | null>

}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Selector, StoreService, Action } from '@ngx-patterns/store-service';
import { ResourceWith } from '@luchsamapparat/common';
import { SearchProductsAction } from './products.actions';

@Injectable({
    providedIn: 'root'
})
export class ProductsCommonStore extends StoreService<void> {

    @Action(SearchProductsAction)
    searchProducts: (query: string) => void;

}

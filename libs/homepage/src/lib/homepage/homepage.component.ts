import { Component } from '@angular/core';
import { SearchProductsAction, ProductsCommonStore } from '@luchsamapparat/products-common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cfha-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent {

    constructor(
        private productsCommonStore: ProductsCommonStore
    ) {}

    onProductSearch(query: string) {
        this.productsCommonStore.searchProducts(query);
    }

}

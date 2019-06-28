import { Component } from '@angular/core';
import { ProductsCommonStore } from '@ngxp/products-common';

@Component({
  selector: 'ngxp-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent {

    constructor(
        private productsCommonStore: ProductsCommonStore
    ) {}

    onProductSearch(query: string) {
        this.productsCommonStore.searchProducts({ query });
    }

}

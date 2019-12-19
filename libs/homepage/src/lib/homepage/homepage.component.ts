import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsCommonStore } from '@ngxp/products-common';

@Component({
  selector: 'ngxp-homepage',
  templateUrl: './homepage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent {

    constructor(
        private productsCommonStore: ProductsCommonStore
    ) {}

    onProductSearch(queryString: string) {
        this.productsCommonStore.searchProducts({ queryString });
    }

}

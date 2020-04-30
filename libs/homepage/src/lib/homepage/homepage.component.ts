import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsStore } from '@ngxp/products/state';

@Component({
    selector: 'ngxp-homepage',
    templateUrl: './homepage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent {

    constructor(
        private productsStore: ProductsStore
    ) { }

    onProductSearch(queryString: string) {
        this.productsStore.searchProducts({ queryString });
    }

}

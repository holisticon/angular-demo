import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsStore } from '@holisticon/products/state';

@Component({
    selector: 'holisticon-homepage',
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

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { decodeResourceUriFromRouteParam } from '@ngxp/resource';
import { Observable } from 'rxjs';
import { Product } from '../../domain/product';
import { ProductsStore } from '../../state/products-store.service';

@Component({
    selector: 'ngxp-product-details',
    templateUrl: './product-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent {

    product$: Observable<Product>;

    constructor(
        private productsStore: ProductsStore,
        private activatedRoute: ActivatedRoute
    ) {
        this.product$ = this.productsStore.getProduct({
            productUri: decodeResourceUriFromRouteParam(this.activatedRoute.snapshot.params.product)
        });
    }
}

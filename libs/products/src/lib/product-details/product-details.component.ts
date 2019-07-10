import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@ngxp/products-common';
import { decodeResourceIdFromRouteParam } from '@ngxp/resource';
import { Observable } from 'rxjs';
import { ProductsStore } from '../state/products-store.service';

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
            productId: decodeResourceIdFromRouteParam(this.activatedRoute.snapshot.params.productId)
        })
    }

}

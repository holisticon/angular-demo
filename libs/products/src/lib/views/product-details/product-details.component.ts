import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { decodeResourceUriFromRouteParam } from '@ngxp/resource';
import { Observable } from 'rxjs';
import { Product } from '../../domain/product';
import { ProductsStore } from '../../state/products-store.service';
import { ProductModule } from '../../ui/product/product.component';

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

@NgModule({
    declarations: [ProductDetailsComponent],
    imports: [CommonModule, ProductModule]
})
export class ProductDetailsModule { }

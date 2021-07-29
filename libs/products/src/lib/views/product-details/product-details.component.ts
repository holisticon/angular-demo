import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { decodeResourceUriFromRouteParam } from '@holisticon/resource';
import { Observable } from 'rxjs';
import { Product } from '../../domain';
import { ProductsStateModule, ProductsStore } from '../../state';
import { ProductModule } from '../../ui';

@Component({
    selector: 'holisticon-product-details',
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
    imports: [CommonModule, ProductsStateModule, ProductModule]
})
export class ProductDetailsModule { }

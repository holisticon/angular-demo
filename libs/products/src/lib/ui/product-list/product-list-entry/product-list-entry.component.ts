import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../../domain/product';

@Component({
    selector: 'ngxp-product-list-entry',
    templateUrl: './product-list-entry.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListEntryComponent {

    @Input()
    product!: Product;

}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../product.model';

@Component({
    selector: 'ngxp-product-image',
    templateUrl: './product-image.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductImageComponent {

    @Input()
    product!: Product | null;

}

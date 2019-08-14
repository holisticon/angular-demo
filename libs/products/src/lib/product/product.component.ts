import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '@ngxp/products-common';

@Component({
  selector: 'ngxp-product',
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {

    @Input()
    product!: Product | null;

}

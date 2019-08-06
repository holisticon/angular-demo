import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '@ngxp/products-common';

@Component({
  selector: 'ngxp-product-list',
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {

    @Input()
    products: Product[] = [];

}

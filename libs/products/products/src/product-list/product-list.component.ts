import { Component, Input } from '@angular/core';
import { Product } from '@luchsamapparat/products/products-common';

@Component({
  selector: 'cfha-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {

    @Input()
    products: Product[] = [];

}

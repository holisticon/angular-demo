import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { ShoppingCartModule } from '../../../../../shopping-cart/src';
import { Product } from '../../domain/product';
import { ProductImageModule } from '../product-image/product-image.component';
import { ProductPriceModule } from '../product-price/product-price.component';

@Component({
    selector: 'ngxp-product',
    templateUrl: './product.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {

    @Input()
    product!: Product | null;

}

@NgModule({
    declarations: [ProductComponent],
    exports: [ProductComponent],
    imports: [CommonModule, ProductImageModule, ProductPriceModule, ShoppingCartModule]
})
export class ProductModule { }

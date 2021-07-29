import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { ResourceModule } from '@holisticon/resource';
import { AddToShoppingCartFormModule } from '@holisticon/shopping-cart/ui';
import { Product } from '../../domain';
import { ProductImageModule } from '../product-image/product-image.component';
import { ProductPriceModule } from '../product-price/product-price.component';

@Component({
    selector: 'holisticon-product',
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
    imports: [CommonModule, ResourceModule, AddToShoppingCartFormModule, ProductImageModule, ProductPriceModule]
})
export class ProductModule { }

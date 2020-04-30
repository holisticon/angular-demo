import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '@ngxp/products/domain';
import { ResourceModule } from '@ngxp/resource';
import { AddToShoppingCartFormModule } from '@ngxp/shopping-cart/ui';
import { ProductImageModule } from '../../product-image/product-image.component';
import { ProductPriceModule } from '../../product-price/product-price.component';

@Component({
    selector: 'ngxp-product-list-entry',
    templateUrl: './product-list-entry.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListEntryComponent {

    @Input()
    product!: Product;

}

@NgModule({
    declarations: [ProductListEntryComponent],
    exports: [ProductListEntryComponent],
    imports: [CommonModule, RouterModule, ResourceModule, AddToShoppingCartFormModule, ProductImageModule, ProductPriceModule]
})
export class ProductListEntryModule { }

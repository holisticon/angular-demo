import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResourceModule } from '@holisticon/resource';
import { AddToShoppingCartFormModule } from '@holisticon/shopping-cart/ui';
import { Product } from '../../../domain';
import { ProductImageModule } from '../../product-image/product-image.component';
import { ProductPriceModule } from '../../product-price/product-price.component';

@Component({
    selector: 'holisticon-product-list-entry',
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

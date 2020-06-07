import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { Product } from '../../domain';

@Component({
    selector: 'ngxp-product-price',
    templateUrl: './product-price.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPriceComponent {

    @Input()
    product!: Product | null;

}

@NgModule({
    declarations: [ProductPriceComponent],
    exports: [ProductPriceComponent],
    imports: [CommonModule]
})
export class ProductPriceModule { }

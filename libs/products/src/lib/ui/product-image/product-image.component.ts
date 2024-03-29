import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { Product } from '../../domain';

@Component({
    selector: 'holisticon-product-image',
    templateUrl: './product-image.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductImageComponent {

    @Input()
    product!: Product | null;

}

@NgModule({
    declarations: [ProductImageComponent],
    exports: [ProductImageComponent],
    imports: [CommonModule]
})
export class ProductImageModule { }

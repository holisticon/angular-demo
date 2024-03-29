import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { Product } from '../../domain';
import { ProductListEntryModule } from './product-list-entry/product-list-entry.component';

@Component({
    selector: 'holisticon-product-list',
    templateUrl: './product-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {

    @Input()
    products: Product[] = [];

}

@NgModule({
    declarations: [ProductListComponent],
    exports: [ProductListComponent],
    imports: [CommonModule, ProductListEntryModule]
})
export class ProductListModule { }

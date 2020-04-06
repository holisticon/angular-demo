import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'ngxp-products',
    template: '<router-outlet></router-outlet>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent { }

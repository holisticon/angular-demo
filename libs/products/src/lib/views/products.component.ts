import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'ngxp-products',
    template: '<router-outlet></router-outlet>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent { }

@NgModule({
    declarations: [ProductsComponent],
    imports: [RouterModule]
})
export class ProductsModule { }

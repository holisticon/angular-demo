import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingCartCommonModule } from '@luchsamapparat/shopping-cart-common';
import { ShoppingCartItemListComponent } from './shopping-cart-item-list/shopping-cart-item-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: ShoppingCartComponent }
        ]),
        ShoppingCartCommonModule
    ],
    declarations: [
        ShoppingCartComponent,
        ShoppingCartItemListComponent
    ]
})
export class ShoppingCartModule {}

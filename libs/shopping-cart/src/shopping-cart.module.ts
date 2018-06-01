import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingCartCommonModule } from '@luchsamapparat/shopping-cart-common';
import { ShoppingCartItemListComponent } from './shopping-cart-item-list/shopping-cart-item-list.component';
import { ShoppingCartItemComponent } from './shopping-cart-item-list/shopping-cart-item/shopping-cart-item.component';
import { UpdateQuantityFormComponent } from './shopping-cart-item-list/shopping-cart-item/update-quantity-form/update-quantity-form.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: ShoppingCartComponent }
        ]),
        ShoppingCartCommonModule
    ],
    declarations: [
        ShoppingCartComponent,
        ShoppingCartItemListComponent,
        UpdateQuantityFormComponent,
        ShoppingCartItemComponent
    ]
})
export class ShoppingCartModule {}

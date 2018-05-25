import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ShoppingCart } from '@luchsamapparat/shopping-cart-common';

@Component({
    selector: 'cfha-shopping-cart-item-list',
    templateUrl: './shopping-cart-item-list.component.html',
    styleUrls: ['./shopping-cart-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartItemListComponent {

    @Input()
    shoppingCart: ShoppingCart;

}

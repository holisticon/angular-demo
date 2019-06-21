import { createAction, props } from '@ngrx/store';
import { ResourceWith } from '@ngxp/common';
import { QuantityUpdate, ShoppingCartItem } from '@ngxp/shopping-cart-common';

export const loadShoppingCartAction = createAction(
    '[Shopping Cart] load shopping cart');

export const updateShoppingCartItemQuantityAction = createAction(
    '[Shopping Cart] update shopping cart item quantity',
    props<{ quantityUpdate: ResourceWith<QuantityUpdate> }>()
);

export const deleteShoppingCartItemAction = createAction(
    '[Shopping Cart] delete shopping cart item',
    props<{ shoppingCartItem: ShoppingCartItem }>()
);

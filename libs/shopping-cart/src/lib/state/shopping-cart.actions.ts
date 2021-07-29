import { ResourceWith } from '@holisticon/resource';
import { createAction, props } from '@ngrx/store';
import { AdditionToShoppingCart, QuantityUpdate, ShoppingCart, ShoppingCartItem } from '../domain';

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

export const shoppingCartUpdatedAction = createAction(
    '[Shopping Cart] shopping cart updated',
    props<{ shoppingCart: ShoppingCart }>()
);

export const addToShoppingCartAction = createAction(
    '[Shopping Cart] add to shopping cart',
    props<{ additionToShoppingCart: AdditionToShoppingCart }>()
);

export const itemAddedToShoppingCartAction = createAction(
    '[Shopping Cart] item added to shopping cart',
    props<{ shoppingCart: ShoppingCart }>()
);

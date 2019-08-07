import { createAction, props } from '@ngrx/store';
import { AdditionToShoppingCart, ShoppingCart } from '../shopping-cart.model';

export const addToShoppingCartAction = createAction(
    '[Shopping Cart] add to shopping cart',
    props<{ additionToShoppingCart: AdditionToShoppingCart }>()
);

export const itemAddedToShoppingCartAction = createAction(
    '[Shopping Cart] item added to shopping cart',
    props<{ shoppingCart: ShoppingCart }>()
);

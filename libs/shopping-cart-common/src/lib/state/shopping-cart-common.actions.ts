import { createAction, props } from '@ngrx/store';
import { AdditionToShoppingCart, ShoppingCart } from '../shopping-cart.model';

export const addToShoppingCartAction = createAction(
    '[Shopping Cart] add to shopping cart',
    props<{ additionToShoppingCart: AdditionToShoppingCart }>()
);

export const shoppingCartLoadedAction = createAction(
    '[Shopping Cart] shopping cart loaded',
    props<{ shoppingCart: ShoppingCart }>()
);

import { Action } from '@ngrx/store';
import { AdditionToShoppingCart, ShoppingCart } from '../shopping-cart.model';

export enum ShoppingCartActionTypes {
    AddToShoppingCart = '[Shopping Cart] add to shopping cart',
    LoadShoppingCart = '[Shopping Cart] load shopping cart',
    ShoppingCartLoaded = '[Shopping Cart] shopping cart loaded'
}

export class AddToShoppingCartAction implements Action {
    readonly type = ShoppingCartActionTypes.AddToShoppingCart;

    constructor(
        public payload: AdditionToShoppingCart
    ) {}
}

export class LoadShoppingCartAction implements Action {
    readonly type = ShoppingCartActionTypes.LoadShoppingCart;
}

export class ShoppingCartLoadedAction implements Action {
    readonly type = ShoppingCartActionTypes.ShoppingCartLoaded;

    constructor(
        public payload: ShoppingCart
    ) {}
}

export type ShoppingCartActions = AddToShoppingCartAction | LoadShoppingCartAction | ShoppingCartLoadedAction;

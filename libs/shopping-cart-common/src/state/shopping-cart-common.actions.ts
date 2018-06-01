import { Action } from '@ngrx/store';
import { AdditionToShoppingCart, ShoppingCart } from '../shopping-cart.model';

export enum ShoppingCartCommonActionTypes {
    AddToShoppingCart = '[Shopping Cart] add to shopping cart',
    ShoppingCartLoaded = '[Shopping Cart] shopping cart loaded'
}

export class AddToShoppingCartAction implements Action {
    readonly type = ShoppingCartCommonActionTypes.AddToShoppingCart;

    constructor(
        public payload: AdditionToShoppingCart
    ) { }
}

export class ShoppingCartLoadedAction implements Action {
    readonly type = ShoppingCartCommonActionTypes.ShoppingCartLoaded;

    constructor(
        public payload: ShoppingCart
    ) { }
}

export type ShoppingCartCommonActions =
    | AddToShoppingCartAction
    | ShoppingCartLoadedAction;

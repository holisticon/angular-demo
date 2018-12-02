import { Action } from '@ngrx/store';
import { ResourceWith } from '@ngxp/common';
import { QuantityUpdate, ShoppingCartItem } from '@ngxp/shopping-cart-common';

export enum ShoppingCartActionTypes {
    LoadShoppingCart = '[Shopping Cart] load shopping cart',
    UpdateShoppingCartItemQuantity = '[Shopping Cart] update shopping cart item quantity',
    DeleteShoppingCartItem = '[Shopping Cart] delete shopping cart item'
}

export class LoadShoppingCartAction implements Action {
    readonly type = ShoppingCartActionTypes.LoadShoppingCart;
}

export class UpdateShoppingCartItemQuantityAction implements Action {
    readonly type = ShoppingCartActionTypes.UpdateShoppingCartItemQuantity;

    constructor(
        public payload: ResourceWith<QuantityUpdate>
    ) { }
}

export class DeleteShoppingCartItemAction implements Action {
    readonly type = ShoppingCartActionTypes.DeleteShoppingCartItem;

    constructor(
        public payload: ShoppingCartItem
    ) { }
}

export type ShoppingCartAction =
    | LoadShoppingCartAction
    | UpdateShoppingCartItemQuantityAction
    | DeleteShoppingCartItemAction;

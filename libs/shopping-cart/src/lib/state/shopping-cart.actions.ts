import { ResourceWith } from '@luchsamapparat/common';
import { QuantityUpdate, ShoppingCartItem } from '@luchsamapparat/shopping-cart-common';
import { Action } from '@ngrx/store';

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

export type ShoppingCartActions =
    | LoadShoppingCartAction
    | UpdateShoppingCartItemQuantityAction
    | DeleteShoppingCartItemAction;

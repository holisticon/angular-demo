import { LineItem } from "@luchsamapparat/common";

export interface ShoppingCart {
    totalPrice: number;
    items: ShoppingCartItem[];
}

// tslint:disable-next-line:no-empty-interface
export interface ShoppingCartItem extends LineItem {}

export interface AdditionToShoppingCart {
    product: string;
    quantity: number;
}

export interface QuantityUpdate {
    quantity: number;
}

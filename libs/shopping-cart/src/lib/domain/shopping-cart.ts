import { Resource } from "@holisticon/resource";

export type ShoppingCart = Resource<{
    totalPrice: number;
    items: ShoppingCartItem[];
}>

export type ShoppingCartItem = Resource<{
    productName: string;
    productDescription: string;
    price: number;
    quantity: number;
    product: string;
}>

export interface AdditionToShoppingCart {
    product: string;
    quantity: number;
}

export interface QuantityUpdate {
    quantity: number;
}

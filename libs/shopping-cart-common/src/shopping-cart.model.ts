export interface ShoppingCart {
    totalPrice: number;
    items: ShoppingCartItem[];
}

export interface ShoppingCartItem extends LineItem {}

export interface AdditionToShoppingCart {
    product: string;
    quantity: number;
}

export interface QuantityUpdate {
    quantity: number;
}

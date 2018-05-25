export interface ShoppingCart {
    items: ShoppingCartItem[];
}

export interface ShoppingCartItem {
    name: string;
    description: string;
    price: number;
    quantity: number;
    product: string;
}

export interface AdditionToShoppingCart {
    product: string;
    quantity: number;
}

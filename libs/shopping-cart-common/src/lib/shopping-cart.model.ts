export interface ShoppingCart {
    totalPrice: number;
    items: ShoppingCartItem[];
}

// tslint:disable-next-line:no-empty-interface
export interface ShoppingCartItem {
    productName: string;
    productDescription: string;
    price: number;
    quantity: number;
    product: string;
}

export interface AdditionToShoppingCart {
    product: string;
    quantity: number;
}

export interface QuantityUpdate {
    quantity: number;
}

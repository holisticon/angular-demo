import { ShoppingCartAppState } from './shopping-cart.reducer';

export function getShoppingCart() {
    return (state: ShoppingCartAppState) => state.shoppingCart.shoppingCart;
}

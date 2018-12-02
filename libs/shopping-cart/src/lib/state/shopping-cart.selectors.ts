import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShoppingCartState, SHOPPING_CART_FEATURE_KEY } from './shopping-cart.reducer';

const getShoppingCartState = createFeatureSelector<ShoppingCartState>(SHOPPING_CART_FEATURE_KEY);

export const getShoppingCart = createSelector(
    getShoppingCartState,
    state => state.shoppingCart
);

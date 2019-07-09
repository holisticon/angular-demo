import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShoppingCartState, SHOPPING_CART_FEATURE_KEY } from './shopping-cart.reducer';

const selectShoppingCartState = createFeatureSelector<ShoppingCartState>(SHOPPING_CART_FEATURE_KEY);

export const selectShoppingCart = createSelector(
    selectShoppingCartState,
    state => state.shoppingCart
);

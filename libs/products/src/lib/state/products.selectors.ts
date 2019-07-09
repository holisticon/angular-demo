import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState, PRODUCTS_FEATURE_KEY } from '../state/products.reducer';

const selectProductsState = createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY);

export const selectSearchResults = createSelector(
    selectProductsState,
    state => state.searchResults
);

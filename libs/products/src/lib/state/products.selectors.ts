import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState, PRODUCTS_FEATURE_KEY } from '../state/products.reducer';

const getProductsState = createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY);

export const getSearchResults = createSelector(
    getProductsState,
    state => state.searchResults
);

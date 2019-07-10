import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '@ngxp/products-common';
import { ResourceMap } from '@ngxp/resource';
import { ProductsPartialState, ProductsState, PRODUCTS_FEATURE_KEY } from '../state/products.reducer';

const selectProductsState = createFeatureSelector<ProductsPartialState, ProductsState>(PRODUCTS_FEATURE_KEY);

const selectProducts = createSelector(
    selectProductsState,
    state => state.products
);

export const selectSearchResults = createSelector(
    selectProductsState,
    selectProducts,
    (state, products) => state.searchResults.map(productId => products[productId])
);

export const selectProduct = createSelector(
    selectProducts,
    (products: ResourceMap<Product>, props: { productId: string }) => products[props.productId]
);

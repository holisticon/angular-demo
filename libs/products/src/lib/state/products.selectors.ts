import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product, SearchResults } from '@ngxp/products-common';
import { ResourceMap } from '@ngxp/resource';
import { isNull } from 'lodash-es';
import { ProductsAppState, ProductsState, PRODUCTS_FEATURE_KEY } from '../state/products.reducer';

const selectProductsState = createFeatureSelector<ProductsAppState, ProductsState>(PRODUCTS_FEATURE_KEY);

const selectProducts = createSelector(
    selectProductsState,
    state => state.products
);

export const selectSearchResults = createSelector(
    selectProductsState,
    selectProducts,
    ({ searchResults }, products): SearchResults | null => {
        if (isNull(searchResults)) {
            return null;
        }

        return {
            ...searchResults,
            products: searchResults.products
                .map(productUri => products[productUri])
        };
    }
);

export const selectProduct = createSelector(
    selectProducts,
    (products: ResourceMap<Product>, props: { productUri: string }) => products[props.productUri]
);

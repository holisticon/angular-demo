import { createReducer, on } from '@ngrx/store';
import { loadSearchResultsAction, Product, searchResultsLoadedAction } from '@ngxp/products-common';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState {
    query: string | null;
    searchResults: Product[];
}

export interface ProductsPartialState {
    readonly [PRODUCTS_FEATURE_KEY]: ProductsState;
}

export const initialState: ProductsState = {
    query: null,
    searchResults: []
};

export const productsReducer = createReducer(initialState,
    on(loadSearchResultsAction, (state, { query }) => ({
        ...state,
        query,
        searchResults: []
    })),
    on(searchResultsLoadedAction, (state, { searchResults }) => ({
        ...state,
        searchResults
    }))
);

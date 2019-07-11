import { createReducer, on } from '@ngrx/store';
import { loadSearchResultsAction, Product, searchResultsLoadedAction } from '@ngxp/products-common';
import { getIds, ResourceId, ResourceMap, toMap } from '@ngxp/resource';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState {
    query: string | null;
    searchResults: ResourceId[];
    products: ResourceMap<Product>;
}

export interface ProductsAppState {
    readonly [PRODUCTS_FEATURE_KEY]: ProductsState;
}

export const initialState: ProductsState = {
    query: null,
    searchResults: [],
    products: {}
};

export const productsReducer = createReducer(initialState,
    on(loadSearchResultsAction, (state, { query }) => ({
        ...state,
        query,
        searchResults: []
    })),
    on(searchResultsLoadedAction, (state, { searchResults }) => ({
        ...state,
        searchResults: getIds(searchResults),
        products: {
            ...state.products,
            ...toMap(searchResults)
        }
    }))
);

import { createReducer, on } from '@ngrx/store';
import { ReducerArgs } from '@ngxp/common';
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

const reducer = createReducer(initialState,
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

// neccessary for AOT support
// see https://ngrx.io/guide/store/reducers#creating-the-reducer-function
export function productsReducer(...args: ReducerArgs<ProductsState>) { return reducer(...args); }

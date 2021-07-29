import { ReducerArgs } from '@holisticon/common';
import { getUris, ResourceMap, ResourceUri, toMap } from '@holisticon/resource';
import { createReducer, on } from '@ngrx/store';
import { Product } from '../domain';
import { loadSearchResultsAction, productLoadedAction, searchResultsLoadedAction } from './products.actions';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState {
    query: string | null;
    searchResults: {
        products: ResourceUri[];
        totalResults: number;
    } | null;
    products: ResourceMap<Product>;
}

export interface ProductsAppState {
    readonly [PRODUCTS_FEATURE_KEY]: ProductsState;
}

export const initialState: ProductsState = {
    query: null,
    searchResults: null,
    products: {}
};

const reducer = createReducer(initialState,
    on(loadSearchResultsAction, (state, { queryString: query }) => ({
        ...state,
        query,
        searchResults: null
    })),
    on(searchResultsLoadedAction, (state, { searchResults }) => ({
        ...state,
        searchResults: {
            ...searchResults,
            products: getUris(searchResults.products)
        },
        products: {
            ...state.products,
            ...toMap(searchResults.products)
        }
    })),
    on(productLoadedAction, (state, { product }) => ({
        ...state,
        products: {
            ...state.products,
            ...toMap([product])
        }
    }))
);

// neccessary for AOT support
// see https://ngrx.io/guide/store/reducers#creating-the-reducer-function
export function productsReducer(...args: ReducerArgs<ProductsState>) { return reducer(...args); }

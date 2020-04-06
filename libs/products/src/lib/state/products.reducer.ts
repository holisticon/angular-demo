import { createReducer, on } from '@ngrx/store';
import { ReducerArgs } from '@ngxp/common';
import { getUris, ResourceMap, ResourceUri, toMap } from '@ngxp/resource';
import { Product } from '../product.model';
import { loadSearchResultsAction, searchResultsLoadedAction } from './products.actions';

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
    }))
);

// neccessary for AOT support
// see https://ngrx.io/guide/store/reducers#creating-the-reducer-function
export function productsReducer(...args: ReducerArgs<ProductsState>) { return reducer(...args); }

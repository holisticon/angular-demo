import { Product, ProductsAction, ProductsActionTypes } from '@ngxp/products-common';

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

export function productsReducer(state = initialState, action: ProductsAction): ProductsState {
    switch (action.type) {

        case ProductsActionTypes.LoadSearchResults: {
            return {
                ...state,
                query: action.payload,
                searchResults: []
            };
        }

        case ProductsActionTypes.SearchResultsLoaded: {
            return {
                ...state,
                searchResults: action.payload
            };
        }

        default:
            return state;
    }
}

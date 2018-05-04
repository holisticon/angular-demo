import { Product, ProductsActionTypes, ProductsActions } from '@luchsamapparat/products/products-common';

/**
 * Interface for the 'Products' data used in
 *  - ProductsState, and
 *  - productsReducer
 */
export interface ProductsState {
    query: string | null;
    searchResults: Product[];
}

/**
 * Interface to the part of the Store containing ProductsState
 * and other information related to ProductsData.
 */
export interface ProductsAppState {
    readonly products: ProductsState;
}

export const initialState: ProductsState = {
    query: null,
    searchResults: []
};

export function productsReducer(
    state = initialState,
    action: ProductsActions
): ProductsState {
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

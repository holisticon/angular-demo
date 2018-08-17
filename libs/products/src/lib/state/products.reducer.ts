import { Product, ProductsActionTypes, ProductsActions } from '@ngxp/products-common';

export interface ProductsState {
    query: string | null;
    searchResults: Product[];
}

export interface ProductsAppState {
    readonly products: ProductsState;
}

export const initialState: ProductsState = {
    query: null,
    searchResults: []
};

export function productsReducer(state = initialState, action: ProductsActions): ProductsState {
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

import { Action } from '@ngrx/store';
import { loadSearchResultsAction, searchResultsLoadedAction } from '@ngxp/products-common';
import { products } from '@ngxp/products-common/test';
import { initialState, productsReducer, ProductsState } from './products.reducer';

describe('productsReducer', () => {
    const query = 'query';
    const searchResults = products;

    it('returns the same state if the action is not applicable', () => {
        const action: Action = { type: 'some-action' };
        const state = productsReducer(initialState, <any> action);
        expect(state).toBe(initialState);
    });

    describe('LoadSearchResults', () => {
        it('sets the query and resets search results', () => {
            const state: ProductsState = {
                query,
                searchResults
            };
            const updatedQuery = 'new query';
            const action = loadSearchResultsAction({ query: updatedQuery });

            const updatedState = productsReducer(state, action);

            expect(updatedState.query).toBe(updatedQuery);
            expect(updatedState.searchResults).toEqual([]);
        });
    });

    describe('SearchResultsLoaded', () => {
        it('sets the query and resets search results', () => {
            const action = searchResultsLoadedAction({ searchResults });

            const updatedState = productsReducer(initialState, action);

            expect(updatedState.searchResults).toBe(searchResults);
        });
    });

});

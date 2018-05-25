import { Resource, addId } from '@luchsamapparat/common';
import { LoadSearchResultsAction, Product, SearchResultsLoadedAction } from '@luchsamapparat/products-common';
import { Action } from '@ngrx/store';
import { ProductsState, initialState, productsReducer } from './products.reducer';

describe('productsReducer', () => {
    const query = 'query';
    const searchResults: Resource<Product>[] = [
        addId({
            description: '',
            image: '',
            name: '',
            price: 0
        }, 'id')
    ];

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
            const action = new LoadSearchResultsAction(updatedQuery);

            const updatedState = productsReducer(state, action);

            expect(updatedState.query).toBe(updatedQuery);
            expect(updatedState.searchResults).toEqual([]);
        });
    });

    describe('SearchResultsLoaded', () => {
        it('sets the query and resets search results', () => {
            const action = new SearchResultsLoadedAction(searchResults);

            const updatedState = productsReducer(initialState, action);

            expect(updatedState.searchResults).toBe(searchResults);
        });
    });

});

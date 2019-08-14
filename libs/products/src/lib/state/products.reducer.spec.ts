import { Action } from '@ngrx/store';
import { product, products, searchResults } from '@ngxp/products-common/test';
import { getId, getIds, toMap } from '@ngxp/resource';
import { loadSearchResultsAction, searchResultsLoadedAction } from './products.actions';
import { initialState, productsReducer, ProductsState } from './products.reducer';

describe('productsReducer', () => {
    const query = 'query';
    const searchResultIds = getIds(searchResults);

    it('returns the same state if the action is not applicable', () => {
        const action: Action = { type: 'some-action' };
        const state = productsReducer(initialState, <any> action);
        expect(state).toBe(initialState);
    });

    describe('LoadSearchResults', () => {
        it('sets the query, resets search results and leaves the products untouched', () => {
            const state: ProductsState = {
                query,
                searchResults: searchResultIds,
                products: toMap(products)
            };
            const updatedQuery = 'new query';
            const action = loadSearchResultsAction({ query: updatedQuery });

            const updatedState = productsReducer(state, action);

            expect(updatedState.query).toBe(updatedQuery);
            expect(updatedState.searchResults).toEqual([]);
            expect(updatedState.products).toBe(state.products);
        });
    });

    describe('SearchResultsLoaded', () => {
        it('sets search results and adds them to the products map', () => {
            const preloadedProducts = [product];
            const state: ProductsState = {
                ...initialState,
                products: toMap(preloadedProducts)
            };

            const action = searchResultsLoadedAction({ searchResults });

            const updatedState = productsReducer(state, action);

            expect(updatedState.searchResults).toEqual(searchResultIds);
            expect(updatedState.products[getId(product)]).toBe(product);
            expect(Object.values(updatedState.products).length).toBe(searchResults.length + preloadedProducts.length);

            [...preloadedProducts, ...searchResults]
                .forEach(expectedProduct => {
                    const productId = getId(expectedProduct);
                    expect(updatedState.products[productId]).toBe(expectedProduct);
                });
        });
    });

});

import { Action } from '@ngrx/store';
import { product, products, searchResults } from '@ngxp/products-common/test';
import { getId, getIds, toMap } from '@ngxp/resource';
import { loadSearchResultsAction, searchResultsLoadedAction } from './products.actions';
import { initialState, productsReducer, ProductsState } from './products.reducer';

describe('productsReducer', () => {
    const query = 'query';
    const searchResultIds = getIds(searchResults.products);

    it('returns the same state if the action is not applicable', () => {
        const action: Action = { type: 'some-action' };
        const state = productsReducer(initialState, <any> action);
        expect(state).toBe(initialState);
    });

    describe('loadSearchResults', () => {
        it('sets the query, resets search results and leaves the products untouched', () => {
            const state: ProductsState = {
                query,
                searchResults: {
                    products: searchResultIds,
                    totalResults: searchResultIds.length
                },
                products: toMap(products)
            };
            const updatedQuery = 'new query';
            const action = loadSearchResultsAction({ queryString: updatedQuery });

            const updatedState = productsReducer(state, action);

            expect(updatedState.query).toBe(updatedQuery);
            expect(updatedState.searchResults).toBe(null);
            expect(updatedState.products).toBe(state.products);
        });
    });

    describe('searchResultsLoaded', () => {
        it('sets search results and adds them to the products map', () => {
            const preloadedProducts = [product];
            const state: ProductsState = {
                ...initialState,
                products: toMap(preloadedProducts)
            };

            const action = searchResultsLoadedAction({ searchResults });

            const updatedState = productsReducer(state, action);

            // tslint:disable-next-line: no-non-null-assertion
            expect(updatedState.searchResults!.products).toEqual(searchResultIds);
            // tslint:disable-next-line: no-non-null-assertion
            expect(updatedState.searchResults!.totalResults).toEqual(searchResultIds.length);
            expect(updatedState.products[getId(product)]).toBe(product);
            expect(Object.values(updatedState.products).length).toBe(searchResults.products.length + preloadedProducts.length);

            [...preloadedProducts, ...searchResults.products]
                .forEach(expectedProduct => {
                    const productId = getId(expectedProduct);
                    expect(updatedState.products[productId]).toBe(expectedProduct);
                });
        });
    });

});

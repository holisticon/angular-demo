import { product, productBuilder, products, searchResults } from '@holisticon/products/test';
import { getUri, getUris, toMap } from '@holisticon/resource';
import { Action } from '@ngrx/store';
import { loadSearchResultsAction, productLoadedAction, searchResultsLoadedAction } from './products.actions';
import { initialState, productsReducer, ProductsState } from './products.reducer';

describe('productsReducer', () => {
    const query = 'query';
    const searchResultUris = getUris(searchResults.products);

    it('returns the same state if the action is not applicable', () => {
        const action: Action = { type: 'some-action' };
        const state = productsReducer(initialState, action);
        expect(state).toBe(initialState);
    });

    describe('loadSearchResults', () => {
        it('sets the query, resets search results and leaves the products untouched', () => {
            const state: ProductsState = {
                query,
                searchResults: {
                    products: searchResultUris,
                    totalResults: searchResultUris.length
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

            expect(updatedState.searchResults?.products).toEqual(searchResultUris);
            expect(updatedState.searchResults?.totalResults).toEqual(searchResultUris.length);
            expect(updatedState.products[getUri(product)]).toBe(product);
            expect(Object.values(updatedState.products).length).toBe(searchResults.products.length + preloadedProducts.length);

            [...preloadedProducts, ...searchResults.products]
                .forEach(expectedProduct => {
                    const productUri = getUri(expectedProduct);
                    expect(updatedState.products[productUri]).toBe(expectedProduct);
                });
        });
    });

    describe('productLoaded', () => {
        it('adds the product to the products map', () => {
            const preloadedProducts = productBuilder().freeze().buildMany(2);
            const state: ProductsState = {
                ...initialState,
                products: toMap(preloadedProducts)
            };

            const action = productLoadedAction({ product });

            const updatedState = productsReducer(state, action);

            expect(updatedState.products[getUri(product)]).toBe(product);
            expect(Object.values(updatedState.products).length).toBe(preloadedProducts.length + 1);

            [...preloadedProducts, product]
                .forEach(expectedProduct => {
                    const productUri = getUri(expectedProduct);
                    expect(updatedState.products[productUri]).toBe(expectedProduct);
                });
        });
    });

});

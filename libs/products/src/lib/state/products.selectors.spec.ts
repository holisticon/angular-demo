import { products, searchResults } from '@ngxp/products/test';
import { getUri, getUris, toMap } from '@ngxp/resource';
import { ProductsAppState } from './products.reducer';
import { selectProduct, selectSearchResults } from './products.selectors';

describe('productsSelectors', () => {

    const state: ProductsAppState = {
        products: {
            query: 'query',
            searchResults: {
                products: getUris(searchResults.products),
                totalResults: searchResults.products.length
            },
            products: toMap(products)
        }
    };

    describe('selectSearchResults', () => {
        it('returns the search results', () => {
            const expectedValue = searchResults;

            expect(selectSearchResults(state)).toEqual(expectedValue);
        });

        it('returns null if there are no search results', () => {
            const stateWithoutSearchResults: ProductsAppState = {
                ...state,
                products: {
                    ...state.products,
                    searchResults: null
                }
            };


            expect(selectSearchResults(stateWithoutSearchResults)).toBeNull();
        });
    });

    describe('selectProduct', () => {
        it('returns the product with the given ID', () => {
            const product = products[0];
            const productUri = getUri(product);
            const expectedValue = product;

            expect(selectProduct(state, { productUri: productUri })).toEqual(expectedValue);
        });
    });

});

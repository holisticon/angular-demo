import { products } from '@ngxp/products-common/test';
import { ProductsPartialState } from './products.reducer';
import { selectSearchResults } from './products.selectors';

describe('productsSelectors', () => {

    const state: ProductsPartialState = {
        products: {
            query: 'query',
            searchResults: products
        }
    };

    describe('selectSearchResults', () => {
        it('returns the search results', () => {
            const expectedValue = state.products.searchResults;

            expect(selectSearchResults(state)).toBe(expectedValue);
        });
    });

});

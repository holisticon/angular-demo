import { ProductsAppState } from "./products.reducer";
import { getSearchResults } from "./products.selectors";

describe('productsSelectors', () => {

    const state: ProductsAppState = {
        products: {
            query: 'query',
            searchResults: []
        }
    };

    describe('getSearchResults', () => {
        it('returns the search results', () => {
            const expectedValue = state.products.searchResults;

            expect(getSearchResults()(state)).toBe(expectedValue);
        });
    });

});

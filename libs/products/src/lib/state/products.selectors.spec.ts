import { products } from "@ngxp/products-common/test";
import { ProductsPartialState } from "./products.reducer";
import { getSearchResults } from "./products.selectors";

describe('productsSelectors', () => {

    const state: ProductsPartialState = {
        products: {
            query: 'query',
            searchResults: products
        }
    };

    describe('getSearchResults', () => {
        it('returns the search results', () => {
            const expectedValue = state.products.searchResults;

            expect(getSearchResults(state)).toBe(expectedValue);
        });
    });

});

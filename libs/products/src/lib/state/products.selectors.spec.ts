import { ProductsAppState } from "./products.reducer";
import { getSearchResults } from "./products.selectors";
import { products } from "@ngxp/products-common/test";

describe('productsSelectors', () => {

    const state: ProductsAppState = {
        products: {
            query: 'query',
            searchResults: products
        }
    };

    describe('getSearchResults', () => {
        it('returns the search results', () => {
            const expectedValue = state.products.searchResults;

            expect(getSearchResults()(state)).toBe(expectedValue);
        });
    });

});

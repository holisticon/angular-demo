import { products, searchResults } from '@ngxp/products-common/test';
import { getId, getIds, toMap } from '@ngxp/resource';
import { ProductsAppState } from './products.reducer';
import { selectProduct, selectSearchResults } from './products.selectors';

describe('productsSelectors', () => {

    const state: ProductsAppState = {
        products: {
            query: 'query',
            searchResults: getIds(searchResults),
            products: toMap(products)
        }
    };

    describe('selectSearchResults', () => {
        it('returns the search results', () => {
            const expectedValue = searchResults;

            expect(selectSearchResults(state)).toEqual(expectedValue);
        });
    });

    describe('selectProduct', () => {
        it('returns the product with the given ID', () => {
            const product = products[0];
            const productId = getId(product);
            const expectedValue = product;

            expect(selectProduct(state, { productId })).toEqual(expectedValue);
        });
    });

});

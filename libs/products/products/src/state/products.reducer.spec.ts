import { SearchResultsLoadedAction } from '@luchsamapparat/products/products-common';
import { initialState, productsReducer } from './products.reducer';

describe('productsReducer', () => {
    it('should work', () => {
        const action: SearchResultsLoadedAction = new SearchResultsLoadedAction([]);
        const actual = productsReducer(initialState, action);
        expect(actual).toEqual({});
    });
});

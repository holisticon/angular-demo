import { ProductsAppState } from "@luchsamapparat/products/products/src/state/products.reducer";

export function getSearchResults() {
    return ((state: ProductsAppState) => state.products.searchResults);
}

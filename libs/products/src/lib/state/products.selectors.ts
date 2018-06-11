import { ProductsAppState } from "../state/products.reducer";

export function getSearchResults() {
    return ((state: ProductsAppState) => state.products.searchResults);
}

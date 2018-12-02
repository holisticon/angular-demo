import { Action } from '@ngrx/store';
import { Product } from '../product.model';

export enum ProductsActionTypes {
    SearchProducts= '[Products] search products',
    LoadSearchResults = '[Products] load search results',
    SearchResultsLoaded = '[Products] search results loaded'
}

export class SearchProductsAction implements Action {
    readonly type = ProductsActionTypes.SearchProducts;

    constructor(
        public payload: string | null
    ) {}
}

export class LoadSearchResultsAction implements Action {
    readonly type = ProductsActionTypes.LoadSearchResults;

    constructor(
        public payload: string | null
    ) {}
}

export class SearchResultsLoadedAction implements Action {
    readonly type = ProductsActionTypes.SearchResultsLoaded;

    constructor(
        public payload: Product[]
    ) {}
}

export type ProductsAction =
    | SearchProductsAction
    | LoadSearchResultsAction
    | SearchResultsLoadedAction;

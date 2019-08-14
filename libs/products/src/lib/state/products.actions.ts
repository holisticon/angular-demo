import { createAction, props } from '@ngrx/store';
import { Product } from '@ngxp/products-common';
import { Resource } from '@ngxp/resource';

export const loadSearchResultsAction = createAction(
    '[Products] load search results',
    props<{ query: string | null }>()
);

export const searchResultsLoadedAction = createAction(
    '[Products] search results loaded',
    props<{ searchResults: Resource<Product>[] }>()
);

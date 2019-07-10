import { createAction, props } from '@ngrx/store';
import { Resource } from '@ngxp/resource';
import { Product } from '../product.model';

export const searchProductsAction = createAction(
    '[Products] search products',
    props<{ query: string | null }>()
);

export const loadSearchResultsAction = createAction(
    '[Products] load search results',
    props<{ query: string | null }>()
);

export const searchResultsLoadedAction = createAction(
    '[Products] search results loaded',
    props<{ searchResults: Resource<Product>[] }>()
);

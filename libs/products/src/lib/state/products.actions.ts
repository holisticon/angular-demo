import { createAction, props } from '@ngrx/store';
import { Resource, ResourceUri } from '@ngxp/resource';
import { Product, SearchResults } from '../domain/product';

export const searchProductsAction = createAction(
    '[Products] search products',
    props<{ queryString: string | null }>()
);

export const loadSearchResultsAction = createAction(
    '[Products] load search results',
    props<{ queryString: string | null }>()
);

export const searchResultsLoadedAction = createAction(
    '[Products] search results loaded',
    props<{ searchResults: SearchResults }>()
);

export const loadProductAction = createAction(
    '[Products] load product',
    props<{ id: ResourceUri }>()
);

export const productLoadedAction = createAction(
    '[Products] product loaded',
    props<{ product: Resource<Product> }>()
);

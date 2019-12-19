import { createAction, props } from '@ngrx/store';
import { SearchResults } from '@ngxp/products-common';

export const loadSearchResultsAction = createAction(
    '[Products] load search results',
    props<{ queryString: string | null }>()
);

export const searchResultsLoadedAction = createAction(
    '[Products] search results loaded',
    props<{ searchResults: SearchResults }>()
);

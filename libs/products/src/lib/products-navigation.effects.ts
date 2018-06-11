import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { LoadSearchResultsAction } from '@luchsamapparat/products-common';
import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { defaultTo } from 'lodash-es';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsNavigationEffects {

    @Effect()
    loadSearchResultsOnNavigate$ = this.actions$
        .ofType(ROUTER_NAVIGATION)
        .map((action: RouterNavigationAction<RouterStateUrl>) => action.payload)
        .map(routerNavigationPayload => routerNavigationPayload.routerState)
        .filter(routerState => routerState.url.startsWith('/products'))
        .map(routerState => routerState.queryParams.query)
        .map(query => defaultTo(query, null))
        .map(query => new LoadSearchResultsAction(query));

    constructor(
        private actions$: Actions
    ) {}
}

// TODO: remove duplication
interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
}

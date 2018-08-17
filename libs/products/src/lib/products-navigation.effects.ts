
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { LoadSearchResultsAction } from '@ngxp/products-common';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { defaultTo } from 'lodash-es';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class ProductsNavigationEffects {

    @Effect()
    loadSearchResultsOnNavigate$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        map((action: RouterNavigationAction<RouterStateUrl>) => action.payload),
        map(routerNavigationPayload => routerNavigationPayload.routerState),
        filter(routerState => routerState.url.startsWith('/products')),
        map(routerState => routerState.queryParams.query),
        map(query => defaultTo(query, null)),
        map(query => new LoadSearchResultsAction(query))
    );

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

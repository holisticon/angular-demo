
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { loadSearchResultsAction } from '@ngxp/products-common';
import { defaultTo } from 'lodash-es';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class ProductsNavigationEffects {

    loadSearchResultsOnNavigate$ = createEffect(
        () => this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        map((action: RouterNavigationAction) => action.payload),
        map(routerNavigationPayload => routerNavigationPayload.routerState),
        filter(routerState => routerState.url.startsWith('/products')),
        map(routerState => routerState.root.queryParams.query),
        map((query: string) => defaultTo(query, null)),
        map(query => loadSearchResultsAction({ query }))
    ));

    constructor(
        private actions$: Actions
    ) {}
}

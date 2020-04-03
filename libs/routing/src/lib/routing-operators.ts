import { ofType } from '@ngrx/effects';
import { RouterNavigationAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Action } from '@ngrx/store';
import { defaultTo } from 'lodash-es';
import { OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from './router-state.model';
import { getViews } from './router-state.utils';

type NavigationAction = RouterNavigationAction<RouterStateSnapshot>;

export function filterNavigationTo(view: string): OperatorFunction<Action, NavigationAction> {
    return input$ => input$.pipe(
        ofType(ROUTER_NAVIGATED),
        filter((action: NavigationAction) => {
            const activatedViews = getViews(getRouterState(action));
            return activatedViews.includes(view);
        })
    );
}
export function extractQueryParam<T>(paramName: string, defaultValue?: T): OperatorFunction<NavigationAction, string | T> {
    return input$ => input$.pipe(
        map((action: NavigationAction) => defaultTo(
            getRouterState(action).queryParams[paramName],
            defaultValue
        ))
    );
}

function getRouterState(action: NavigationAction): ActivatedRouteSnapshot {
    return action.payload.routerState.root;
}

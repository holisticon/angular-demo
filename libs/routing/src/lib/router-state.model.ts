import { MinimalActivatedRouteSnapshot, MinimalRouterStateSnapshot, RouterReducerState } from '@ngrx/router-store';

export type RouterStateSnapshot = MinimalRouterStateSnapshot;
export type ActivatedRouteSnapshot = MinimalActivatedRouteSnapshot;

export interface RouterAppState {
    router: RouterReducerState<RouterStateSnapshot>;
};

export type RouterState = RouterReducerState<RouterStateSnapshot>;

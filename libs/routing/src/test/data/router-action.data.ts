import { RouterNavigatedAction, RouterNavigationPayload, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Blueprint, BlueprintBuilder, createBlueprintBuilder } from '@ngxp/builder';
import { RouterStateSnapshot } from '@ngxp/routing';
import { random } from 'faker';
import { isUndefined } from 'lodash-es';
import { getUrl } from './activated-route-snapshot-data-utils';
import { routerStateSnapshot } from './router-state-snapshot.data';

type NavigatedAction = RouterNavigatedAction<RouterStateSnapshot>;

function toNavigationPayload(routerState: RouterStateSnapshot): RouterNavigationPayload<RouterStateSnapshot> {
    return {
        event: <any>{
            id: random.number({ min: 1, max: 5, precision: 1 }),
            url: getUrl(routerState.root)
        },
        routerState
    };
}

const routerNavigatedActionBlueprint: Blueprint<NavigatedAction> = {
    type: () => ROUTER_NAVIGATED,
    payload: () => toNavigationPayload(routerStateSnapshot)
};
export function routerNavigatedActionBuilder(routerState?: RouterStateSnapshot): BlueprintBuilder<NavigatedAction> {
    return createBlueprintBuilder(routerNavigatedActionBlueprint)(
        isUndefined(routerState) ? {} : { payload: toNavigationPayload(routerState) }
    );
}

export const routerNavigationAction = routerNavigatedActionBuilder().build();

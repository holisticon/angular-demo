import { RouterNavigationAction, RouterNavigationPayload, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Blueprint, BlueprintBuilder, createBlueprintBuilder } from '@ngxp/builder';
import { RouterStateSnapshot } from '@ngxp/routing';
import * as faker from 'faker';
import { isUndefined } from 'lodash-es';
import { getUrl } from './activated-route-snapshot-data-utils';
import { routerStateSnapshot } from './router-state-snapshot.data';

type NavigationAction = RouterNavigationAction<RouterStateSnapshot>;

function toNavigationPayload(routerState: RouterStateSnapshot): RouterNavigationPayload<RouterStateSnapshot> {
    return {
        event: <any>{
            id: faker.random.number({ min: 1, max: 5, precision: 1 }),
            url: getUrl(routerState.root)
        },
        routerState
    };
}

const routerNavigationActionBlueprint: Blueprint<NavigationAction> = {
    type: () => ROUTER_NAVIGATION,
    payload: () => toNavigationPayload(routerStateSnapshot)
};
export function routerNavigationActionBuilder(routerState?: RouterStateSnapshot): BlueprintBuilder<NavigationAction> {
    return createBlueprintBuilder(routerNavigationActionBlueprint)(
        isUndefined(routerState) ? {} : { payload: toNavigationPayload(routerState) }
    );
}

export const routerNavigationAction = routerNavigationActionBuilder().build();

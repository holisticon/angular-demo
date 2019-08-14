import { Blueprint, BlueprintBuilder, createBlueprintBuilder } from '@ngxp/builder';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@ngxp/routing';
import { isUndefined } from 'lodash-es';
import { getUrl } from './activated-route-snapshot-data-utils';
import { activatedRouteSnapshot, activatedRouteUrl } from './activated-route-snapshot.data';

const routerStateSnapshotBlueprint: Blueprint<RouterStateSnapshot> = {
    root: () => activatedRouteSnapshot,
    url: () => activatedRouteUrl
};
export function routerStateSnapshotBuilder(root?: ActivatedRouteSnapshot): BlueprintBuilder<RouterStateSnapshot> {
    return createBlueprintBuilder(routerStateSnapshotBlueprint)(
        isUndefined(root) ? {} : { root, url: getUrl(root) }
    );
};

export const routerStateSnapshot = routerStateSnapshotBuilder().freeze().build();

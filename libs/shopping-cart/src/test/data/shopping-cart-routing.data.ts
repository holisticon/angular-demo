import { RouterNavigationAction } from '@ngrx/router-store';
import { RouterStateSnapshot } from '@ngxp/routing';
import { activatedRouteSnapshotBuilder, routerNavigationActionBuilder, routerStateSnapshotBuilder } from '@ngxp/routing/test';
import { ShoppingCartViews } from '../../lib/shopping-cart.views';

function createShoppingCartRouteSnapshot() {
    return activatedRouteSnapshotBuilder('', {
        children: [
            activatedRouteSnapshotBuilder('shopping-cart', {
                data: { view: ShoppingCartViews.Root }
            }).build()
        ]
    }).build();
}

export function buildShoppingCartNavigationAction(): RouterNavigationAction<RouterStateSnapshot> {
    return routerNavigationActionBuilder(
        routerStateSnapshotBuilder(
            createShoppingCartRouteSnapshot()
        ).freeze().build()
    ).freeze().build();
};

export const shoppingCartNavigationAction = buildShoppingCartNavigationAction();

import { RouterNavigatedAction } from '@ngrx/router-store';
import { RouterStateSnapshot } from '@ngxp/routing';
import { activatedRouteSnapshotBuilder, routerNavigatedActionBuilder, routerStateSnapshotBuilder } from '@ngxp/routing/test';
import { ShoppingCartViews } from '../../lib/views/shopping-cart.views';

function createShoppingCartRouteSnapshot() {
    return activatedRouteSnapshotBuilder('', {
        children: [
            activatedRouteSnapshotBuilder('shopping-cart', {
                data: { view: ShoppingCartViews.Root }
            }).build()
        ]
    }).build();
}

export function buildShoppingCartNavigationAction(): RouterNavigatedAction<RouterStateSnapshot> {
    return routerNavigatedActionBuilder(
        routerStateSnapshotBuilder(
            createShoppingCartRouteSnapshot()
        ).freeze().build()
    ).freeze().build();
};

export const shoppingCartNavigationAction = buildShoppingCartNavigationAction();

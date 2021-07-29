import { RouterStateSnapshot } from '@holisticon/routing';
import { activatedRouteSnapshotBuilder, routerNavigatedActionBuilder, routerStateSnapshotBuilder } from '@holisticon/routing/test';
import { RouterNavigatedAction } from '@ngrx/router-store';
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

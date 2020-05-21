import { RouterNavigatedAction } from '@ngrx/router-store';
import { RouterStateSnapshot } from '@ngxp/routing';
import { activatedRouteSnapshotBuilder, routerNavigatedActionBuilder, routerStateSnapshotBuilder } from '@ngxp/routing/test';
import { OrdersViews } from '../../lib/views/orders.views';

function createOrdersRouteSnapshot() {
    return activatedRouteSnapshotBuilder('', {
        children: [
            activatedRouteSnapshotBuilder('orders', {
                data: { view: OrdersViews.Root }
            }).build()
        ]
    }).build();
}

export function buildOrdersNavigationAction(): RouterNavigatedAction<RouterStateSnapshot> {
    return routerNavigatedActionBuilder(
        routerStateSnapshotBuilder(
            createOrdersRouteSnapshot()
        ).freeze().build()
    ).freeze().build();
};

export const ordersNavigationAction = buildOrdersNavigationAction();

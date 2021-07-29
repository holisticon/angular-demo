import { RouterStateSnapshot } from '@holisticon/routing';
import { activatedRouteSnapshotBuilder, routerNavigatedActionBuilder, routerStateSnapshotBuilder } from '@holisticon/routing/test';
import { RouterNavigatedAction } from '@ngrx/router-store';
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

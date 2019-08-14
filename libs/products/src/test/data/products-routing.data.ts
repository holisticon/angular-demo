import { RouterNavigationAction } from '@ngrx/router-store';
import { RouterStateSnapshot } from '@ngxp/routing';
import { activatedRouteSnapshotBuilder, routerNavigationActionBuilder, routerStateSnapshotBuilder } from '@ngxp/routing/test';
import { ProductsViews } from '../../lib/products.views';

export const searchResultsQueryParams = { query: 'cheese' };

function createSearchResultsRouteSnapshot(queryParams = {}) {
    return activatedRouteSnapshotBuilder('', {
        queryParams,
        children: [
            activatedRouteSnapshotBuilder('products', {
                data: { view: ProductsViews.Root },
                children: [
                    activatedRouteSnapshotBuilder('', {
                        children: [
                            activatedRouteSnapshotBuilder('', {
                                data: { view: ProductsViews.SearchResults }
                            }).build()
                        ]
                    }).build()
                ]
            }).build()
        ]
    }).build();
}

export function buildSearchResultsNavigationAction(queryParams = {}): RouterNavigationAction<RouterStateSnapshot> {
    return routerNavigationActionBuilder(
        routerStateSnapshotBuilder(
            createSearchResultsRouteSnapshot(queryParams)
        ).freeze().build()
    ).freeze().build();
};

export const searchResultsNavigationAction = buildSearchResultsNavigationAction(searchResultsQueryParams);

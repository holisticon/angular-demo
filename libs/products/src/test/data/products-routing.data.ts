import { RouterNavigatedAction } from '@ngrx/router-store';
import { encodeResourceUriAsRouteParam, getUri } from '@ngxp/resource';
import { RouterStateSnapshot } from '@ngxp/routing';
import { activatedRouteSnapshotBuilder, routerNavigatedActionBuilder, routerStateSnapshotBuilder } from '@ngxp/routing/test';
import { ProductsViews } from '../../lib/views/products.views';
import { product } from './product.data';

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

export function buildSearchResultsNavigationAction(queryParams = {}): RouterNavigatedAction<RouterStateSnapshot> {
    return routerNavigatedActionBuilder(
        routerStateSnapshotBuilder(
            createSearchResultsRouteSnapshot(queryParams)
        ).freeze().build()
    ).freeze().build();
};

export const searchResultsNavigationAction = buildSearchResultsNavigationAction(searchResultsQueryParams);

export const productDetailsParams = { product: encodeResourceUriAsRouteParam(getUri(product)) };

function createProductDetailsRouteSnapshot(params: {}) {
    return activatedRouteSnapshotBuilder('', {
        children: [
            activatedRouteSnapshotBuilder('products', {
                data: { view: ProductsViews.Root },
                children: [
                    activatedRouteSnapshotBuilder('', {
                        children: [
                            activatedRouteSnapshotBuilder('', {
                                data: { view: ProductsViews.ProductDetails },
                                params
                            }).build()
                        ]
                    }).build()
                ]
            }).build()
        ]
    }).build();
}

export function buildProductDetailsNavigationAction(params = {}): RouterNavigatedAction<RouterStateSnapshot> {
    return routerNavigatedActionBuilder(
        routerStateSnapshotBuilder(
            createProductDetailsRouteSnapshot(params)
        ).freeze().build()
    ).freeze().build();
};

export const productDetailsNavigationAction = buildProductDetailsNavigationAction(productDetailsParams);

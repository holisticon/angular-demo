import { encodeResourceUriAsRouteParam, getUri } from '@holisticon/resource';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@holisticon/routing';
import { activatedRouteSnapshotBuilder, routerNavigatedActionBuilder, routerStateSnapshotBuilder } from '@holisticon/routing/test';
import { RouterNavigatedAction } from '@ngrx/router-store';
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

function createProductDetailsRouteSnapshot(params: Partial<ActivatedRouteSnapshot>) {
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

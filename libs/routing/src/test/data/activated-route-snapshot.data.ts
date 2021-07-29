import { ActivatedRouteSnapshot } from '@holisticon/routing';
import { Blueprint, BlueprintBuilder, createBlueprintBuilder } from '@ngxp/builder';
import { lorem } from 'faker';
import { defaultTo } from 'lodash-es';
import { applyChildren, applyQueryParamsOnChildren, applyUrlAndRouteConfig, getUrl } from './activated-route-snapshot-data-utils';
import { Views } from './views.data';

const paths = {
    appRoot: '',
    library: 'library',
    libraryRoot: '',
    page: ''
}

export const queryParamName = 'someQueryParam';
export const queryParams = { [queryParamName]: 'someQueryValue' };

const activatedRouteSnapshotBlueprint: Blueprint<ActivatedRouteSnapshot> = {
    data: () => ({}),
    params: () => ({}),
    outlet: () => 'primary',
    fragment: () => '',
    children: () => [],
    firstChild: () => undefined,
    queryParams: () => ({}),
    routeConfig: () => null,
    url: () => []
};
export function activatedRouteSnapshotBuilder(
    path: string | null,
    values: Partial<ActivatedRouteSnapshot> = {},
): BlueprintBuilder<ActivatedRouteSnapshot> {

    return createBlueprintBuilder(activatedRouteSnapshotBlueprint)
        (values)
        .transform(routeSnapshot => applyChildren(routeSnapshot, defaultTo(routeSnapshot.children, [])))
        .transform(routeSnapshot => applyUrlAndRouteConfig(routeSnapshot, path))
        .transform(routeSnapshot => applyQueryParamsOnChildren(routeSnapshot));
}

export const pageRouteParamName = 'page';
export const pageRouteParams = { [pageRouteParamName]: lorem.word() };
export const pageRouteSnapshot = activatedRouteSnapshotBuilder(paths.page, {
    data: { view: Views.FeaturePage },
    params: pageRouteParams
}).build();

export const libraryRootRouteSnapshot = activatedRouteSnapshotBuilder(paths.libraryRoot, {
    children: [pageRouteSnapshot]
}).build();

export const libraryRouteParamName = 'library';
export const libraryRouteParams = { [libraryRouteParamName]: lorem.word() };
export const libraryRouteSnapshot = activatedRouteSnapshotBuilder(paths.library, {
    data: { view: Views.FeatureRoot },
    params: libraryRouteParams,
    children: [libraryRootRouteSnapshot]
}).build();

export const activatedRouteSnapshot = activatedRouteSnapshotBuilder(paths.appRoot, {
    queryParams,
    children: [libraryRouteSnapshot]
}).build();

export const activatedRouteUrl = getUrl(activatedRouteSnapshot);
export const routeParams = {
    ...libraryRouteParams,
    ...pageRouteParams
}

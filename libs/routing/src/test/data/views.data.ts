import { getAllValues } from '@ngxp/common/test';

export enum Views {
    FeatureRoot = 'featureRoot',
    FeaturePage = 'featurePage'
}

export const activatedViews = getAllValues(Views);

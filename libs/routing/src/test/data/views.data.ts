import { getAllValues } from '@holisticon/common/test';

export enum Views {
    FeatureRoot = 'featureRoot',
    FeaturePage = 'featurePage'
}

export const activatedViews = getAllValues(Views);
